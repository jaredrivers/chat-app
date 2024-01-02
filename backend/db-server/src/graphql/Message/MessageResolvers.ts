import { prisma } from "../..";

const resolvers = {
	Query: {},
	Mutation: {
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

export default resolvers;
