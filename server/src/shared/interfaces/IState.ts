import { Logger } from 'pino';
import { IServices } from '../../domains/shared/interfaces/IServices';
import { IClients } from './IClients';

export type ILogger = Logger;

export interface IState {
  logger?: ILogger;
  httpServices: IServices;
  httpClients: IClients;
}
