export const typeDefs = `#graphql

type User {
    id: ID
    email: String
    firstName: String
    lastName: String
    chats: [Chat]
    role: Role
}

type Chat {
    id: ID
    name: String
    messages: [Message]
    participants: [User]
}

type Message {
    id: ID
    sentBy: ID
    sentAt: Date
    receivedAt: Date
    content: String
    userId: String
    chat: Chat
}
type Query {
    users: [User]
    chats: [Chat]
    messages(chatID: ID): [Message]
}

type Mutation {
    createUser(email: String, firstName: String, lastName: String): User
    createChat(senderID: ID, receiverID: ID): Chat
    sendMessage(receiverID: ID, content: String): Message
    msgReceived: Boolean
}

scalar Date

enum Role {
    USER
    ADMIN
}
`;
