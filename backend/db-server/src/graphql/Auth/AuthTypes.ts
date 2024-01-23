type Permissions = "ADMIN" | "USER";

export interface IAuthUser {
	id: string;
	token?: string;
	email: string;
	auth: true;
	permissions: Permissions[];
}

export interface INonAuthUser {
	auth: false;
}
