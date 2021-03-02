import 'reflect-metadata';
import {
  ApolloServerTestClient,
  createTestClient
} from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { BlockChainQuery } from '../BlockChainQuery';

const contextMock = {
  getState: jest.fn()
};

const blockChainServiceMock = {
  getBlocks: jest.fn(),
  getRawBlock: jest.fn()
};

describe('CommitQuery', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    const schema = await buildSchema({ resolvers: [BlockChainQuery] });
    server = new ApolloServer({
      schema,
      context: contextMock
    });
  });

  beforeEach(async () => {
    blockChainServiceMock.getBlocks.mockResolvedValue([
      {
        hash:
          '000000000000000000082bac0859c43f89c35423049712658ee9a0963c15aaf3',
        time: 1614211561,
        height: 672046
      }
    ]);
    blockChainServiceMock.getRawBlock.mockResolvedValue({
      size: 1819006,
      block_index: 0
    });

    contextMock.getState.mockReturnValue({
      httpServices: {
        blockchain: blockChainServiceMock
      }
    });
  });

  afterEach(() => {
    blockChainServiceMock.getBlocks.mockReset();
    blockChainServiceMock.getRawBlock.mockReset();
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
    expect(res).toMatchSnapshot();
  });

  it('returns Raw Block data', async () => {
    const testQuery = `
    query BlockChainQuery($hash: String!){
      rawBlock(hash: $hash) {
        size
        block_index
      }
    }
  `;
    const { query }: ApolloServerTestClient = createTestClient(server);

    const res = await query({ query: testQuery, variables: { hash: '1' } });
    expect(res).toMatchSnapshot();
  });

  it('cals service with right params', async () => {
    const testQuery = `
    query BlockChainQuery($hash: String!){
      rawBlock(hash: $hash) {
        size
        block_index
      }
    }
  `;
    const { query }: ApolloServerTestClient = createTestClient(server);

    await query({ query: testQuery, variables: { hash: '1' } });

    expect(blockChainServiceMock.getRawBlock).toBeCalledWith('1');
  });
});
