import Router from "koa-router";

import User from "./UserController";
import Utiltiy from "./UtilityController";

const router: Router = new Router({ prefix: "/api" });

router.use(User.routes()).use(User.allowedMethods());
router.use(Utiltiy.routes()).use(Utiltiy.allowedMethods());

export default router;