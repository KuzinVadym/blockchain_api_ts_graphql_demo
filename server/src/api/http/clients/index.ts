import { IClients } from './shared/interfaces';
import { IGetStateFunction } from '../../../shared/interfaces/IGetStateFunction';
import { createBlockchainHttpClient } from './blockchain/BlockchainClient';

export interface ICreateHttpClients {
  (getState: IGetStateFunction): IClients;
}

export function createHttpClients(getState: IGetStateFunction): IClients {
  return {
    blockchain: createBlockchainHttpClient(getState)
  };
}
