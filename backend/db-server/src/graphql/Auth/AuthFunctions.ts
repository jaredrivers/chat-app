import { sign, verify } from "jsonwebtoken";
import { prisma } from "../..";
import { IAuthUser } from "./AuthTypes";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const jwtSecret = "this is my secret";

export const verifyToken = (token: string): IAuthUser | Error => {
	try {
		const data = verify(token, jwtSecret) as any;

		let verified = {
			id: data.id,
			email: data.email,
			auth: true,
			permissions: data.permissions,
			token,
		} as IAuthUser;

		return verified;
	} catch (error: any) {
		if (error instanceof jwt.JsonWebTokenError) {
			if (error.name == jwt.TokenExpiredError.name) {
				//issue refresh token
			}
		}
		return new GraphQLError(error.message);
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

export const issueToken = async (user: User) => {
	const token = sign(
		{
			id: user.id,
			email: user.email,
			auth: true,
			permissions: user.permissions,
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
