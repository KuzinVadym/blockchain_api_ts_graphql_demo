import { ApolloServer } from 'apollo-server-express';
import { IState } from './IState';
import { ICreateHttpServices } from '../../domains';
import { ICreateHttpClients } from '../../api/http/clients';

export interface IAppServer {
  init: () => Promise<void>;
  getState: () => IState;
  withHttpServices: (createHttpServices: ICreateHttpServices) => Promise<void>;
  withHttpClients: (createHttpClients: ICreateHttpClients) => Promise<void>;
  initTest: () => Promise<ApolloServer>;
  listen: () => void;
}
