export const User = `#graphql
    type User @auth(requires: USER) {
    id: ID
    email: String
    firstName: String
    lastName: String
    chats: [Chat]
    permissions: [Permissions]
    }

extend type Query {
    users: [User]  @auth(requires: ADMIN)
    }

extend type Mutation {
    createUser(email: String, firstName: String, lastName: String): User @auth(requires: ADMIN)
    }
`;
