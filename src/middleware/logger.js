import { createLogger, format, transports } from "winston";

const logger  = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({filename:"logs/index.log", level: "error"})
    ],
    format: format.combine(
        format.colorize(),
        format.timestamp({format: "DD-MM-YYY HH:mm:ss"}),
        format.printf(log=> `${log.timestamp} | [${log.level}] : ${log.message}`)
    )
})

export default logger;