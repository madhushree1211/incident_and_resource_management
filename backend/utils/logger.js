const winston = require('winston');
const LogEntry = require('../models/LogEntry');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

const logEvent = async ({ level = 'info', message, meta = {} }) => {
  logger.log({ level, message, meta });

  try {
    await LogEntry.create({ level, message, meta });
  } catch (error) {
    logger.error('Failed to write log entry to database', { error: error.message });
  }
};

module.exports = { logger, logEvent };
