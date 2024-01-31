import { prisma } from "../..";
import { IAuthUser, INonAuthUser } from "./AuthTypes";

export const verifySession = (session: any) => {
	if (session && session.userId) {
		let currentUser: IAuthUser = {
			id: session.userId,
			email: session.email,
			auth: true,
			permissions: session.permissions,
		};
		return currentUser;
	} else {
		let currentUser: INonAuthUser = { auth: false };
		return currentUser;
	}
};

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
