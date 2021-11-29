import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;
const logger = createLogger({
	level: "info",
	format: combine(timestamp(), prettyPrint()),
	transports: [
		new transports.File({ filename: "./logs/error.log", level: "error" }),
		new transports.File({ filename: "./logs/info.log", level: "info" }),
	],
});

export default logger;
