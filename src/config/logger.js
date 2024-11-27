const winston = require('winston');
require('dotenv').config();

const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: process.env.NODE_ENV !== 'production' }),
        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
});

const appLogger = winston.createLogger({
    level: 'info',
    transports: [
        consoleTransport,
        new winston.transports.File({ filename: process.env.NODE_ENV === 'production' 
            ? '/home/node/logs/app.log'   // Production file path
            : './../../logs/app.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
    ],
});

const accessLogger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: process.env.NODE_ENV !== 'production' }),
                winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
                winston.format.printf(({ timestamp, level, message, ...metadata }) => {
                    return `[${timestamp}] ${level} -> ${message}: ${metadata.method} ${metadata.url} - ${metadata.status} - ${metadata.responseTime}`;
                })
            ),
        }),
        new winston.transports.File({ filename: process.env.NODE_ENV === 'production' 
            ? '/home/node/logs/access.log'
            : './../../logs/access.log', 
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ), 
        }),
    ],
});

const errorLogger = winston.createLogger({
    level: 'error',
    transports: [
        consoleTransport,
        new winston.transports.File({ filename: process.env.NODE_ENV === 'production' 
            ? '/home/node/logs/error.log'   // Production file path
            : './../../logs/error.log', 
            format: winston.format.combine(
                winston.format.errors({stack: true}),
                winston.format.timestamp(),
                winston.format.json()
            ), 
        }),
    ],
});

module.exports = {
    appLogger,
    accessLogger,
    errorLogger
};