import { IBlock, IGetBlocksPayload, IRawBlock } from '../../types';
import { IBlockchainClient } from '../../../../api/http/clients/blockchain/BlockchainClient';

export interface IBlockchainHttpResolver {
  getRawBlock(hash: string): Promise<IRawBlock>;
  getBlocks(payload?: IGetBlocksPayload): Promise<IBlock[]>;
}

export class BlockchainHttpResolver implements IBlockchainHttpResolver {
  constructor(private readonly blockchainClient: IBlockchainClient) {}

  async getRawBlock(hash: string): Promise<IRawBlock> {
    return this.blockchainClient.getBlock(hash);
  }

  async getBlocks(payload?: IGetBlocksPayload): Promise<IBlock[]> {
    return this.blockchainClient.getBlocks();
  }
}
