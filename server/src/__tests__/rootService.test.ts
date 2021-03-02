import { AppServer } from '../rootService';
import pino from 'pino';

const logger = pino();

describe('rootService', () => {
  let server = new AppServer({ port: '4000' }, logger);

  it('successfully init ApolloServer', async () => {
    await expect(server.init()).resolves.not.toThrow();
  });
});
