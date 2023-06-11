import { prisma } from "../../src/index";

export const resolvers = {
	Query: {
		users: () => {
			return prisma.user.findMany();
		},
	},
	Mutation: {
		createChat: (senderID: string, receiverID: string) => {
			let now = Date.now();

			return prisma.chat.create({
				data: {
					participants: {
						connect: [{ id: senderID }, { id: receiverID }],
					},
				},
			});
		},
		createUser: (lastName: string, firstName: string) => {
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
			// 	return err;
			// }
		},

		// addMessage: () => {},
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
