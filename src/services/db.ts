import { Connection, createConnection, getConnection } from "typeorm";
import logger from "../services/logger";
import ORMConfig from "../helpers/ormconfig";

export default async (): Promise<void> => {
	let connection: Connection | undefined;
	try {
		connection = getConnection();
	} catch (e) {
		logger.error("error connecting to database", e);
	}

	try {
		if (connection) {
			if (!connection.isConnected)
				await connection.connect();
		} else
			await createConnection(ORMConfig);
		logger.info("successfully connected to database");
	} catch (e) {
		logger.error("error connecting to database", e);
		throw Error(e);
	}
};