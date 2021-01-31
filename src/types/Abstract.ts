/* eslint-disable no-unused-vars */

export interface IRegister {
	username: string,
	email: string,
	password: string
}

export interface ILogin {
	username: string,
	password: string
}

export interface IResponse {
	ok: boolean,
	status: number,
	data: any
}

export interface IJwtPayload {
	id: number,
	username: string,
}

export interface IUserJwt {
	id: number,
	username: string,
	iat: string,
	exp: string,
	issued: string,
	expires: string
}