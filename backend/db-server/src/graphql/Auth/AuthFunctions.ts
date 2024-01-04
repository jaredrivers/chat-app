import { sign, verify } from "jsonwebtoken";
import { prisma } from "../..";

const jwtSecret = "this is my secret";

export const getToken = (headers: any) => {
	if (headers.authorization && headers.authorization !== "") {
		const token = headers.authorization.split(" ")[1];
		try {
			const data = verify(token, jwtSecret);
			return data;
		} catch (error) {
			return null;
		}
		// return data;
	} else {
		return null;
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

export const issueToken = (userId: any, email: any) => {
	const token = sign(
		{
			userId,
			email,
		},
		jwtSecret,
		{
			expiresIn: "1h",
			notBefore: 0,
			algorithm: "HS256",
		}
	);
	return token;
};
