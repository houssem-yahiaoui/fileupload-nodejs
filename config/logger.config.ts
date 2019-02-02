import {
  Logger,
  transports,
  LoggerInstance
} from 'winston';

const logger: LoggerInstance = new Logger();
const tsFormat = () => new Date().toLocaleTimeString();

logger.add(transports.Console, {
  name: 'info-logger',
  timestamp: tsFormat,
  colorize: true,
  level: 'info'
});

logger.add(transports.Console, {
  name: 'error-logger',
  timestamp: tsFormat,
  colorize: true,
  level: 'error'
});

export default logger;