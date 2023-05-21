export const typeDefs = `#graphql
type User {
    id: String
    email: String
    firstName: String
    lastName: String
    chats: [Chat]
    role: Role
}

type Query {
    users: [User]
}
`;

// type Chat {
//     id: String
//     name: String
//     messages: [Message]
//     participants: [User]
//     }

// type Message {
//     id: String
//     sentBy: String
//     sentAt: Date
//     receivedAt: Date
//     content: String
//     userId: String
//     chat: Chat
// }

// scalar Date

// enum Role {
//     USER
//     ADMIN
// }
// `;
