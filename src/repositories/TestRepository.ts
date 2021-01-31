import Base from "./abstract/TestRepositoryBase";
import Password from "../helpers/password";
import { Users } from "../models/Users";
import * as T from "../types/Abstract";
import { UserErrors } from "../types/Constants";

class UserRepository extends Base {

	public async Register(req: T.IRegister): Promise<Users> {
		try {
			const exists: Users = await Users.findOne({ where: [{ username: req.username }, { email: req.email }] });
			if (exists) throw UserErrors.credsTaken;

			const newUser: Users = new Users();
			newUser.username = req.username;
			newUser.email = req.email;
			newUser.created = new Date();
			newUser.lastUpdated = new Date();
			newUser.password = await Password.Hash(req.password);

			return await newUser.save();
		} catch (error) {
			throw Error(error);
		}
	}

	public async Login(req: T.ILogin): Promise<Users> {
		try {
			const exists: Users = await Users.findOne({ username: req.username });
			if (!exists) throw UserErrors.wrongUsername;

			const pass: boolean = await Password.Compare(req.password, exists.password);
			if (!pass) throw UserErrors.wrongPassword;

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}
}

export const User: Base = new UserRepository;