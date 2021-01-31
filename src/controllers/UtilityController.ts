import koa, { Next } from "koa";
import Router from "koa-router";

import jwt from "../middleware/jwt";
import * as T from "../types/Abstract";

const router: Router = new Router({ prefix: "/utility" });

router.post("/validate", jwt, async (ctx: koa.Context, next: koa.Next): Promise<Next> => {
	try {
		ctx.body = {
			ok: true,
			status: 200,
			data: ctx.state.jwt
		} as T.IResponse;

		return await next();
	} catch (e) {
		throw Error(e);
	}
});

export default router;