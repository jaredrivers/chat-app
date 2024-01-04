import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";

export function authDirectiveTransformer(
	schema: GraphQLSchema,
	directiveName: string
) {
	console.log("8: directiveName: ", directiveName);
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const authDirective = getDirective(
				schema,
				fieldConfig,
				directiveName
			)?.[0];
			const { resolve = defaultFieldResolver } = fieldConfig;

			if (authDirective) {
				return {
					...fieldConfig,
					resolve: async function (source, args, context, info) {
						console.log("source: ", source);
						console.log("args: ", args);
						console.log("context: ", context);
						console.log("info: ", info);
						const result = await resolve(source, args, context, info);

						console.log("25: ", result);
					},
				};
			}
			return fieldConfig;
		},
	});
}
