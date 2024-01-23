import {
	defaultFieldResolver,
	defaultTypeResolver,
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
						const { currentUser } = context;
						if (
							currentUser.auth &&
							currentUser.permissions.includes(requirement)
						) {
							const result = await resolve(source, args, context, info);
							return result;
						} else {
							return Error("User is not authorized.");
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
