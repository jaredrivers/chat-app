export const Chat = `#graphql
    type Chat {
        id: ID
        name: String
        messages: [Message]
        participants: [User]
    }

	extend type Query {
		chats: [Chat]
	}

	extend type Mutation {
    	createChat(senderID: ID, receiverID: ID): Chat
}
`;
