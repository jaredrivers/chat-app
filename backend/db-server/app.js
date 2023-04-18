import express from "express";
import cors from "cors";
import graphql, {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

const app = express();
app.use(cors());

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLInt },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
	}),
});

const MessageType = new GraphQLObjectType({
	name: "Message",
	fields: () => ({
		id: { type: GraphQLInt },
		content: { type: GraphQLString },
		timeSent: { type: GraphQLInt },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		getAllUsers: {
			type: new GraphQLList(UserType),
			resolve(parent) {
				return { 1158461: "admin" };
			},
		},
	},
});
const Users = {};
const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		createUser: {
			type: UserType,
			args: {
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				email: { type: GraphQLString },
			},
			resolve(parent, args) {
				Users.push({
					id: Users.length,
					firstName: args.firstName,
					lastName: args.lastName,
					email: args.email,
				});
				return args;
			},
		},
	},
});
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
app.all("/graphql", createHandler({ schema }));

// app.use('/users', )
export default app;
