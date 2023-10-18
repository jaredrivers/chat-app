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
		// send msg to open chatroom, send to local storage, send to DB, check if received then mark accordingly
		//if not received figure out how to add to queue
		sendMessage: async (
			_: any,
			args: { receiverID: string; content: string }
		) => {
			const { receiverID, content } = args;
			console.log(args);

			let senderID = "700a9675-eb85-4f6c-bd27-6425d9805925";

			// check if chat between users exsists
			try {
				let chat = await prisma.chat.findFirst({
					where: {
						participants: {
							every: {
								id: {
									in: [senderID],
								},
							},
						},
					},
					include: {
						participants: {},
					},
				});

				console.log("CHAT: ", chat);
				// if no chat then create chat and send
				if (!chat) {
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
					console.log("NO CHAT");
				}
			} catch (err) {
				console.log(err);
			}
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
