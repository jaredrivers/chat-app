import { prisma } from "../..";

const resolvers = {
	Query: {
		users: (_: any, __: any, contextValue: any) => {
			console.log("cv: ", contextValue);
			console.log("headers: ", contextValue.headers.authorization);
			let userList = prisma.user.findMany();
			return userList;
		},
	},
	Mutation: {
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
	},
};

export default resolvers;
