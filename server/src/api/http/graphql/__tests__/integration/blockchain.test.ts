import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerTestClient,
  createTestClient
} from 'apollo-server-testing';
import pino from 'pino';
import { AppServer } from '../../../../../rootService';
import { createHttpServices } from '../../../../../domains';
import { createHttpClients } from '../../../clients';

const logger = pino();

describe('blockchain integration tests', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    const testAppSrv = new AppServer({ port: '4000' }, logger);
    await testAppSrv.withHttpClients(createHttpClients);
    await testAppSrv.withHttpServices(createHttpServices);
    server = await testAppSrv.initTest();
  });

  it('finds block by hash', async () => {
    const testQuery = `
    query BlockChainQuery($hash: String!){
      rawBlock(hash: $hash) {
        size
        block_index
      }
    }
  `;
    const { query }: ApolloServerTestClient = createTestClient(server);

    const result = await query({
      query: testQuery,
      variables: {
        hash: '000000000000000000082bac0859c43f89c35423049712658ee9a0963c15aaf3'
      }
    });

    expect(result.data.rawBlock).toMatchSnapshot();
  });

  it('returns blocks data', async () => {
    const testQuery = `{
      blocks {
        hash
        time
        height
      }
    }
  `;

    const { query }: ApolloServerTestClient = createTestClient(server);

    const res = await query({ query: testQuery, variables: {} });
    expect(res.data.blocks.length).toBeGreaterThan(0);
  });
});
