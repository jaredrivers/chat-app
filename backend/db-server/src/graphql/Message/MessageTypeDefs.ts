export const Message = `#graphql
    type Message {
    id: ID
    sentBy: ID
    sentAt: Date
    receivedAt: Date
    content: String
    userId: String
    chat: Chat
}

extend type Query {
    messages(chatID: ID): [Message]
}

extend type Mutation {
    sendMessage(receiverID: ID,  content: String): Message
    msgReceived: Boolean
}
`;
