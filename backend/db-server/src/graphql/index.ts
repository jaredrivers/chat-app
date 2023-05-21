import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const typeDefs = `
    type User {
        id: String!
        email: String
        firstName: String
        lastName: String
    }
    type Query {
        user(id: String!): User
        users: [User]
    }
    input UserInput {
        email: String!
        firstName: String
        lastName: String
    }
    type Mutation {
        createUser(input: UserInput!): User
    }
`;

const Users = [
	{
		id: 1,
		firstName: "Jared",
		lastName: "River",
		email: "jared.river@gmail.com",
	},
];

export const resolvers = {
	Query: {
		users: async () => {
			await prisma.user.findMany();
		},
	},
	Mutation: {},
};
