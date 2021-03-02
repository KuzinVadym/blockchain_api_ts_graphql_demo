import pino, { Logger } from 'pino';
import { IService } from '../../../shared/interfaces/IService';
import {
  BlockchainHttpResolver,
  IBlockchainHttpResolver
} from '../../resolvers/http/BlockchainHttpResolver';
import { IBlock, IGetBlocksPayload, IRawBlock } from '../../types';
import { IGetStateFunction } from '../../../../shared/interfaces/IGetStateFunction';
import { withHttpClients } from '../../../../shared/utils/withHttpClients';

export interface IBlockchainHttpService extends IService {
  getRawBlock(hash: string): Promise<IRawBlock>;
  getBlocks(payload?: IGetBlocksPayload): Promise<IBlock[]>;
}

export class BlockchainHttpService implements IBlockchainHttpService {
  logger: Logger;
  constructor(
    readonly name: string,
    readonly blockchainHttpResolver: IBlockchainHttpResolver
  ) {
    this.logger = pino();
  }

  async getRawBlock(hash: string): Promise<IRawBlock> {
    return this.blockchainHttpResolver.getRawBlock(hash);
  }

  async getBlocks(payload?: IGetBlocksPayload): Promise<IBlock[]> {
    return this.blockchainHttpResolver.getBlocks(payload);
  }
}

export function createBlockchainHttpService(
  getState: IGetStateFunction
): IBlockchainHttpService {
  const blockchainClient = withHttpClients('blockchain', getState);
  return new BlockchainHttpService(
    'blockchain',
    new BlockchainHttpResolver(blockchainClient)
  );
}
