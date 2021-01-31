import "reflect-metadata";
import cluster from "cluster";

import config from "./helpers/config";
import app from "./services/server";
import connect from "./services/db";
import log from "./services/logger";

const start = async (): Promise<void> => {
	try {
		await connect();
	} catch (e) {
		log.error(e);
		throw Error(e);
	}
	app.listen(config.PORT, () => {
		log.info(`${config.NODE_ENV} worker started on http://localhost:${config.PORT}`);
	});
};

if (cluster.isMaster) {
	for (let i: number = 0; i < config.CORES; i++) {
		cluster.fork();
	}
}
else start();