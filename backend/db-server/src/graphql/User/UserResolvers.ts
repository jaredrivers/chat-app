import { prisma } from "../..";

const resolvers = {
	Query: {
		users: (_: any, __: any, contextValue: any) => {
			let userList = prisma.user.findMany();
			return userList;
		},
	},
	Mutation: {
		createUser: async (_: any, { args }: any) => {
			const { email, firstName, lastName, password } = args;
			try {
				let user = await prisma.user.create({
					data: {
						email,
						firstName,
						lastName,
						password,
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
