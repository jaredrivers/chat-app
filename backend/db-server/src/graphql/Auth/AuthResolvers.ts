import { prisma } from "../..";
import { userExists } from "./Functions";
import bcrypt from "bcrypt";

const resolvers = {
	Query: {},
	Mutation: {
		signUp: async (_: any, args: any) => {
			const { formData } = args;
			const { email, firstName, lastName, password, phoneNumber } = formData;

			//check if user then create
			const user = await userExists(formData.email);

			if (user) {
				return {
					code: 404,
					message: "User exists with that email.",
					success: false,
					user: null,
				};
			}

			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(password, salt);

			console.log(password, hashedPassword);

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
					success: true,
					user: null,
				};
			}
		},
	},
};

export default resolvers;
