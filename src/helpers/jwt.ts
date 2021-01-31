import jwt from "jsonwebtoken";
import dateFormat from "dateformat";
import config from "./config";

import { IJwtPayload, IUserJwt } from "../types/Abstract";

export default class Jwt {

	public static async Sign(payload: IJwtPayload): Promise<string> {
		try {
			return jwt.sign(payload, config.JWT_SECRET, {
				expiresIn: config.JWT_EXPIRATION
			});
		} catch (error) {
			throw Error(error);
		}
	}

	public static async Verify(token: string): Promise<IUserJwt> {
		try {
			const data: IUserJwt = jwt.verify(token, config.JWT_SECRET) as IUserJwt;

			return {
				id: data.id,
				username: data.username,
				iat: data.iat,
				exp: data.exp,
				issued: dateFormat(new Date(parseInt(data.iat) * 1000), "yyyy-mm-dd h:MM:ss"),
				expires: dateFormat(new Date(parseInt(data.exp) * 1000), "yyyy-mm-dd h:MM:ss"),
			};
		} catch (error) {
			throw Error(error);
		}
	}

	public static async SignUser(user: IJwtPayload): Promise<string> {
		const token: string = await Jwt.Sign({
			id: user.id,
			username: user.username
		} as IJwtPayload);

		return token;
	}
}