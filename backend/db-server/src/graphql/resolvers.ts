import { prisma } from "../../src/index";
export const resolvers = {
	Query: {
		users: (_: any, __: any, contextValue: any) => {
			console.log("cv: ", contextValue);
			return prisma.user.findMany();
		},
		chats: () => {
			return prisma.chat.findMany();
		},
	},
	Mutation: {
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

		createUser: async (
			_: any,
			args: { email: string; firstName: string; lastName: string }
		) => {
			const { email, firstName, lastName } = args;
			try {
				let user = await prisma.user.create({
					data: {
						email,
						firstName,
						lastName,
					},
				});
				return user;
			} catch (err) {
				console.log(err);
			}
		},
		sendMessage: async (
			_: any,
			args: { receiverID: string; content: string }
		) => {
			const { receiverID, content } = args;

			// check if user is contact
			// check if chat between users exsists, if yes then send
			try {
				prisma.chat.findFirst({
					where: {
						participants: {},
					},
				});
				console.log(receiverID, content);
			} catch (err) {
				console.log(err);
			}
			// if no chat then create chat and send

			// try {
			// 	let user = await prisma.user.create({
			// 		data: {
			// 			email,
			// 			firstName,
			// 			lastName,
			// 		},
			// 	});
			// 	return user;
			// } catch (err) {
			// 	console.log(err);
			// }
		},
		msgReceived: (msgID: string) => {
			let now = Date.now();
			try {
				prisma.message.update({
					where: {
						id: msgID,
					},
					data: {
						receivedAt: now.toString(),
					},
				});
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
	},
};
