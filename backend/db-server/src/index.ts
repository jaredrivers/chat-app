import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./graphql/Auth/AuthFunctions";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { authDirectiveTransformer } from "./graphql/Directives/AuthDirective";
import { IAuthUser, INonAuthUser } from "./graphql/Auth/AuthTypes";
import session from "express-session";
import redis from "redis";
import RedisStore from "connect-redis";

dotenv.config();
const app = express();

export const prisma = new PrismaClient({
	log: [{ level: "query", emit: "event" }],
});

prisma.$on("query", (e) => {
	// console.log(e);
});
let schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

schema = authDirectiveTransformer(schema, "auth");

let redisClient = redis.createClient();
redisClient.connect().catch(console.error);

const bootstrapServer = async () => {
	const server = new ApolloServer({
		schema,
		introspection: process.env.NODE_ENV !== "production",
	});

	await server.start();
	const PORT = process.env.PORT || 4000;

	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(
		session({
			store: new RedisStore({ client: redisClient }),
			secret: "session-secret",
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: false,
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 3,
			},
		})
	);

	app.use(
		"/graphql",
		expressMiddleware(server, {
			context: async ({ req }) => {
				const { headers } = req;
				let currentUser: IAuthUser | INonAuthUser = { auth: false };

				if (headers.authorization && headers.authorization !== "") {
					const token = headers.authorization.split(" ")[1];
					let res = verifyToken(token);
					if (res instanceof Error === false) {
						currentUser = res;
					}
				}

				return { currentUser, headers };
			},
		})
	);

	app.listen(PORT, () => {
		process.env.NODE_ENV === "development" &&
			console.log("http://localhost:" + PORT + "/graphql");
	});
};

bootstrapServer();
