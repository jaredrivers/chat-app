import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import { resolvers, typeDefs } from "./graphql";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

export const prisma = new PrismaClient();

const typeDefs = `#graphql
type User {
    id: String
    email: String
    firstName: String
    lastName: String
    role: Role
}

type Query {
    users: [User]
}
enum Role {
    USER
    ADMIN
}
`;

const resolvers = {
	Query: {
		users: () => {
			return prisma.user.findMany();
		},
	},
};

const bootstrapServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	await server.start();

	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use("/graphql", expressMiddleware(server));

	app.get("/", (req, res) => {
		res.send("Hello World");
	});

	app.listen(PORT, () => {
		console.log("Express server running on http://localhost:" + PORT);
		console.log("http://localhost:" + PORT + "/graphql");
	});
};

bootstrapServer();
