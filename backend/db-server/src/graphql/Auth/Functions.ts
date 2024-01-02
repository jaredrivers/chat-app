import { prisma } from "../..";

export const userExists = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	if (!user) {
		return null;
	} else {
		return user;
	}
};
