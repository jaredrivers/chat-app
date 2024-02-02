import {
	defaultFieldResolver,
	defaultTypeResolver,
	GraphQLError,
	GraphQLSchema,
} from "graphql";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";

export function authDirectiveTransformer(
	schema: GraphQLSchema,
	directiveName: string
) {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const authDirective = getDirective(
				schema,
				fieldConfig,
				directiveName
			)?.[0];

			const { resolve = defaultFieldResolver } = fieldConfig;

			if (authDirective) {
				const requirement = authDirective.requires;
				return {
					...fieldConfig,
					resolve: async function (source, args, context, info) {
						const { currentUser, session } = context;
						console.log(session);
						if (!session || !session.userId) {
							return new GraphQLError("UNAUTHORIZED", {
								extensions: {
									code: "You need to be logged in to access this resource.",
									http: {
										status: 401,
									},
								},
							});
						} else if (
							currentUser.auth &&
							currentUser.permissions.includes(requirement)
						) {
							const result = await resolve(source, args, context, info);
							return result;
						} else {
							return new GraphQLError("UNAUTHORIZED", {
								extensions: {
									code: "You do not have persmission to access this resource.",
									http: {
										status: 401,
									},
								},
							});
						}
					},
				};
			}
			return fieldConfig;
		},
		// [MapperKind.OBJECT_TYPE]: (objectType) => {
		// 	const authDirective = getDirective(
		// 		schema,
		// 		objectType,
		// 		directiveName
		// 	)?.[0];

		// 	if (authDirective) {
		// 		const requirement = authDirective.requires;
		// 		return {
		// 			...objectType,
		// 		};
		// 	}
		// },
	});
}
