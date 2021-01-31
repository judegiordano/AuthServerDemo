/* eslint-disable no-unused-vars */
import * as T from "../../types/Abstract";
import { Users } from "../../models/Users";

export default abstract class UserRepositoryBase {
	public abstract Register(req: T.IRegister): Promise<Users>;
	public abstract Login(req: T.ILogin): Promise<Users>;
}
