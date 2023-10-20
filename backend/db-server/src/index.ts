import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();

export const prisma = new PrismaClient({
	log: [{ level: "query", emit: "event" }],
});

prisma.$on("query", (e) => {
	console.log(e);
});

const bootstrapServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	await server.start();
	const PORT = process.env.PORT || 4000;

	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(
		"/graphql",
		expressMiddleware(server, {
			context: async ({ req, res }) => ({
				req,
				res,
			}),
		})
	);

	app.listen(PORT, () => {
		process.env.NODE_ENV === "development" &&
			console.log("http://localhost:" + PORT + "/graphql");
	});
};

bootstrapServer();
