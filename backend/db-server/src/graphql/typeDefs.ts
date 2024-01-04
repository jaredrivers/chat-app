import { Message } from "./Message/MessageTypeDefs";
import { Chat } from "./Chat/ChatTypeDefs";
import { User } from "./User/UserTypeDefs";
import { Auth } from "./Auth/AuthTypeDefs";

const globalTypes = `#graphql
      directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

    type Query {
        root: String
    }
    type Mutation {
        root: String
    }
    scalar Date

    enum Role {
        ADMIN
        USER
    }
`;

export const typeDefs = [globalTypes, Message, Chat, User, Auth];
