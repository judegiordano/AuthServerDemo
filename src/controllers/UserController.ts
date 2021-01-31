import koa, { Next } from "koa";
import Router from "koa-router";

import { User } from "../repositories/TestRepository";
import { Users } from "../models/Users";
import Jwt from "../helpers/jwt";
import { IJwtPayload } from "../types/Abstract";
import * as T from "../types/Abstract";

const router: Router = new Router({ prefix: "/user" });

router.post("/login", async (ctx: koa.Context, next: koa.Next): Promise<Next> => {
	const req: T.ILogin = ctx.request.body;
	try {
		if (!req.password || !req.username) throw "bad request";

		const user: Users = await User.Login(req);

		const token: string = await Jwt.SignUser({
			id: user.id,
			username: user.username
		} as IJwtPayload);

		ctx.body = {
			ok: true,
			status: 200,
			data: token
		} as T.IResponse;

		return await next();
	} catch (e) {
		throw Error(e);
	}
});

router.post("/register", async (ctx: koa.Context, next: koa.Next): Promise<Next> => {
	const req: T.IRegister = ctx.request.body;
	try {
		if (!req.password || !req.username || !req.email) throw "bad request";

		const user: Users = await User.Register(req);

		const token: string = await Jwt.SignUser({
			id: user.id,
			username: user.username
		} as IJwtPayload);

		ctx.body = {
			ok: true,
			status: 200,
			data: token
		} as T.IResponse;

		return await next();
	} catch (e) {
		throw Error(e);
	}
});

export default router;