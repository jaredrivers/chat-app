import { prisma } from "../../index";

export const User = `#graphql
    type User {
    id: ID
    email: String
    firstName: String
    lastName: String
    chats: [Chat]
    role: Role
    }

extend type Query {
    users: [User]  @auth(requires: ADMIN)
    }

extend type Mutation {
    createUser(email: String, firstName: String, lastName: String): User
    }
`;
