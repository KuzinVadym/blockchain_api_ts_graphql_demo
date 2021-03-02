import { BlockchainClient } from '../BlockchainClient';
jest.mock('axios');
import axios from 'axios';

describe('BlockchainClient', () => {
  let client: BlockchainClient;

  beforeEach(async () => {
    client = new BlockchainClient('blockchain');
  });

  afterEach(() => {
    jest.mock('axios').resetAllMocks();
  });

  it('calls axios post with right params after call BlockchainClient getBlocks method', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { blocks: ['blocks'] } });
    await client.getBlocks();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toBeCalledWith('https://blockchain.info/blocks', {
      params: { format: 'json' }
    });
  });

  it('calls axios post with right params after call BlockchainClient getBlock method', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { test: 'test' } });
    await client.getBlock('hash');

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toBeCalledWith(`https://blockchain.info/rawblock/hash`);
  });
});
