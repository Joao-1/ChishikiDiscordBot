import { createLogger, format } from "winston";

const { combine, timestamp, prettyPrint } = format;
const logger = createLogger({
	level: "info",
	format: combine(timestamp(), prettyPrint()),
});

export default logger;
