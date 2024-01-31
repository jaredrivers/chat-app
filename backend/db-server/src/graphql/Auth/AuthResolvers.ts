import { prisma } from "../..";
import { userExists } from "./AuthFunctions";
import bcrypt from "bcrypt";

const resolvers = {
	Query: {},
	Mutation: {
		signUp: async (_: any, { args }: any) => {
			const { email, firstName, lastName, password, phoneNumber } = args;

			//check if user then create
			const user = await userExists(email);

			if (user) {
				return {
					code: 404,
					message: "User exists with that email.",
					success: false,
				};
			}

			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(password, salt);

			try {
				const newUser = await prisma.user.create({
					data: {
						email,
						firstName,
						lastName,
						password: hashedPassword,
						phoneNumber,
					},
				});
				return {
					code: 200,
					message: "Account created successfully.",
					success: true,
					user: newUser,
				};
			} catch (error) {
				return {
					code: 500,
					message: "Account creation failed.\n" + error,
					success: false,
				};
			}
		},

		login: async (_: any, { args }: any, { session }: any) => {
			const { email, password } = args;

			const user = await prisma.user.findUnique({
				where: {
					email,
				},
			});
			if (!user) {
				return {
					code: 400,
					message: "User does not exist with that email.",
					success: false,
				};
			} else {
				if (bcrypt.compareSync(password, user.password)) {
					session.userId = user.id;
					session.permissions = user.permissions;
					session.email = user.email;

					return {
						code: 200,
						message: "User has logged in successfully.",
						success: true,
					};
				} else {
					return {
						code: 400,
						message: "Password is incorrect.\n",
						success: false,
					};
				}
			}
		},
	},
};

export default resolvers;
