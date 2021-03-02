import { IServices } from './shared/interfaces/IServices';
import { IGetStateFunction } from '../shared/interfaces/IGetStateFunction';
import { createBlockchainHttpService } from './blockchain/services/http';

export interface ICreateHttpServices {
  (getState: IGetStateFunction): IServices;
}

export function createHttpServices(getState: IGetStateFunction): IServices {
  return {
    blockchain: createBlockchainHttpService(getState)
  };
}
