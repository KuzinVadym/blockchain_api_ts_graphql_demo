import { BlockchainHttpResolver } from '../BlockchainHttpResolver';
import { IBlockchainClient } from '../../../../../api/http/clients/blockchain/BlockchainClient';

const getBlockMock = jest.fn();
const getBlocksMock = jest.fn();

const blockchainClient: IBlockchainClient = {
  name: 'blockchain',
  getBlock: getBlockMock,
  getBlocks: getBlocksMock
};

describe('BlockchainHttpResolver', () => {
  let resolver: BlockchainHttpResolver;

  beforeEach(async () => {
    resolver = new BlockchainHttpResolver(blockchainClient);

    getBlockMock.mockResolvedValue({
      size: 1819006,
      block_index: 0
    });

    getBlocksMock.mockResolvedValue([
      {
        hash:
          '000000000000000000082bac0859c43f89c35423049712658ee9a0963c15aaf3',
        time: 1614211561,
        height: 672046
      }
    ]);
  });

  afterEach(async () => {
    getBlockMock.mockReset();
    getBlocksMock.mockReset();
  });

  it('calls Blockchain Client methods with right params while getting Raw Block', async () => {
    await resolver.getRawBlock('hash');

    expect(getBlockMock).toBeCalledWith('hash');
  });

  it('calls Blockchain Client methods with right params while getting BlocksList', async () => {
    await resolver.getBlocks();

    expect(getBlocksMock).toBeCalledWith();
  });
});
