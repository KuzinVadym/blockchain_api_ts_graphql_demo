import pino from 'pino';
import { settings } from './settings';
import { AppServer } from './rootService';
import { createHttpServices } from './domains';
import { createHttpClients } from './api/http/clients';

const logger = pino();

(async () => {
  try {
    const appSrv = new AppServer(settings, logger);
    logger.info('Starting HTTP server');

    await appSrv.withHttpClients(createHttpClients);

    await appSrv.withHttpServices(createHttpServices);

    await appSrv.init();

    appSrv.listen();
  } catch (e) {
    logger.error(e, 'An error occurred while initializing application.');
  }
})();
