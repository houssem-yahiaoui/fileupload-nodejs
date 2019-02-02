import app from './config/express.config';
import logger from './config/logger.config';
import * as config from './config/config.json';

app.listen(config.port, () => {
  logger.info(`[*] Listening on port ${config.port} ..`);
});
