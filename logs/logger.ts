import { createLogger, format, transports } from 'winston';
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
    level: 'error',
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new transports.File({ filename: './logs/error.log', level: 'error' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.colorize(),
    }));
}

export default logger;