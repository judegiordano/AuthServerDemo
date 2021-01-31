import Koa, { Next } from "koa";
import { IUserJwt } from "../types/Abstract";
import Jwt from "../helpers/jwt";

export default async (ctx: Koa.Context, next: Koa.Next): Promise<Next> => {
	const authHeader: any = ctx.header["authorization"];
	const token: string = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		ctx.state.jwt = null;
		throw "invalid jwt";
	}

	try {
		const payload: IUserJwt = await Jwt.Verify(token);
		if (!payload) {
			ctx.state.jwt = null;
			throw "invalid jwt";
		}

		ctx.state.jwt = payload;
		return await next();
	} catch (e) {
		ctx.state.jwt = null;
		throw Error(e);
	}
};