import axios from 'axios';
import { IClient } from '../shared/interfaces';
import { IGetStateFunction } from '../../../../shared/interfaces/IGetStateFunction';
import { IBlock, IRawBlock } from './types';

export interface IBlockchainClient extends IClient {
  getBlock(hash: string): Promise<IRawBlock>;
  getBlocks(): Promise<IBlock[]>;
}

export class BlockchainClient implements IBlockchainClient {
  constructor(readonly name: string) {}

  async getBlock(hash: string): Promise<IRawBlock> {
    const result = await axios.get(`https://blockchain.info/rawblock/${hash}`);
    return result.data;
  }

  async getBlocks(): Promise<IBlock[]> {
    const result = await axios.get(`https://blockchain.info/blocks`, {
      params: { format: 'json' }
    });
    return result.data.blocks;
  }
}

export function createBlockchainHttpClient(
  getState: IGetStateFunction
): IBlockchainClient {
  return new BlockchainClient('blockchain');
}
