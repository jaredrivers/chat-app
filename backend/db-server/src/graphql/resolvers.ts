import { prisma } from "../../src/index";

export const resolvers = {
	Query: {
		users: () => {
			return prisma.user.findMany();
		},
	},
};
