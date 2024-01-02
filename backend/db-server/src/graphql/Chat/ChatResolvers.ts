import { prisma } from "../..";

const resolvers = {
	Query: {
		chats: () => {
			return prisma.chat.findMany();
		},
	},
	Mutation: {
		//find user, create chat room, backup chat to db on chat close or after every message
		createChat: async (
			_: any,
			args: { senderID: string; receiverID: string }
		) => {
			const { senderID, receiverID } = args;

			const users = await prisma.user.findMany({
				where: {
					OR: [{ id: senderID }, { id: receiverID }],
				},
			});

			try {
				let chat = await prisma.chat.create({
					data: {
						messages: {
							create: [],
						},
						participants: {
							connect: [{ id: senderID }, { id: receiverID }],
						},
					},
				});
				return chat;
			} catch (err) {
				console.log(err);
			}
		},
	},
};

export default resolvers;
