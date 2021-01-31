import { ConnectionOptions } from "typeorm";
import config from "./config";
import { Environment } from "../types/Constants";

export default {
	type: config.DB_TYPE,
	database: config.DB_NAME,
	synchronize: config.DB_SYNCHRONIZE,
	logging: config.NODE_ENV == Environment.dev ? true : false,
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 2000,
	entities: [
		`${config.IS_COMPILED ? "build" : "src"}/models/**/*.${config.IS_COMPILED ? "js" : "ts"}`
	]
} as ConnectionOptions;