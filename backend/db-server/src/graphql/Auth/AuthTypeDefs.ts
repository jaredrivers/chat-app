export const Auth = `#graphql
    interface AuthResponse {
        code: String!
        message: String!
        success: Boolean!
        user: User
    }
    type SignUpResponse implements AuthResponse {
        code: String!
        message: String!
        success: Boolean!
        user: User
    }
   
    type LoginResponse implements AuthResponse {
        code: String!
        message: String!
        success: Boolean!
        user: User
        token: String
    }
    
    input SignUpInput {
        firstName: String!
        lastName: String!
        email: String!
        phoneNumber: String!
        password: String!
    }
    input LoginInput {
        email: String!
        password: String!
    }

	extend type Mutation {
    	signUp(args: SignUpInput!): SignUpResponse
        login(args: LoginInput!): LoginResponse
}
`;
