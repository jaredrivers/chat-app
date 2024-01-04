import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { PrismaClient } from "@prisma/client";
import { getToken } from "./graphql/Auth/AuthFunctions";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { authDirectiveTransformer } from "./graphql/Directives/AuthDirective";

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
		"/graphql",
		expressMiddleware(server, {
			context: async ({ req }) => {
				const { headers } = req;
				let currentUser = getToken(headers);
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
