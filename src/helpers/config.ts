import * as dotenv from "dotenv";
import path from "path";
import os from "os";

import { Environment, RateLimit } from "../types/Constants";

dotenv.config();

const config = {
	NODE_ENV: <Environment>process.env.NODE_ENV || Environment.dev,
	PORT: <number>parseInt(process.env.PORT) || 3000,
	JWT_SECRET: <string>process.env.JWT_SECRET || undefined,
	JWT_EXPIRATION: <string | number>(60 * 1),
	DB_TYPE: <string>process.env.DB_TYPE || undefined,
	DB_NAME: <string>process.env.DB_NAME || undefined,
	DB_SYNCHRONIZE: <boolean>(process.env.DB_SYNCHRONIZE == "true" ? true : false),
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
	RATE_LIMIT: {
		interval: <object>{ hour: <number>1 },
		delayAfter: <number>50,
		timeWait: <number>500,
		max: <number>250,
		message: <string>RateLimit.generic,
	},
	CORES: <number>(process.env.NODE_ENV == Environment.prod ? os.cpus().length : 1),
};

if (config.DB_TYPE === undefined)
	throw Error("DB_TYPE not specified");
else if (config.DB_NAME === undefined)
	throw Error("DB_NAME not specified");
else if (config.JWT_SECRET === undefined)
	throw Error("JWT_SECRET not specified");

export default config;