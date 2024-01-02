import UserResolvers from "./User/UserResolvers";
import ChatResolvers from "./Chat/ChatResolvers";
import MessageResolvers from "./Message/MessageResolvers";
import AuthResolvers from "./Auth/AuthResolvers";

export const resolvers = [
	UserResolvers,
	ChatResolvers,
	MessageResolvers,
	AuthResolvers,
];
