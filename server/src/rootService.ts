import 'reflect-metadata';
import http, { Server } from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { getSchema } from './api/http/graphql/schema';
import { IAppServer } from './shared/interfaces/IAppServer';
import { ILogger, IState } from './shared/interfaces/IState';
import { ISettings } from './shared/interfaces/ISettings';
import { IServices } from './domains/shared/interfaces/IServices';
import { IClients } from './shared/interfaces/IClients';
import { ICreateHttpServices } from './domains';
import { ICreateHttpClients } from './api/http/clients';

export class AppServer implements IAppServer {
  private server: ApolloServer;
  private httpServer: Server;
  private logger: ILogger;
  private settings: ISettings;
  private httpServices: IServices;
  private httpClients: IClients;

  constructor(settings: ISettings, logger: ILogger) {
    this.settings = settings;
    this.logger = logger;
  }

  public getState(): IState {
    return {
      logger: this.logger,
      httpServices: this.httpServices,
      httpClients: this.httpClients
    };
  }

  async withHttpClients(createHttpClients: ICreateHttpClients) {
    const getState = () => {
      return this.getState();
    };
    this.httpClients = createHttpClients(getState);
  }

  async withHttpServices(createHttpServices: ICreateHttpServices) {
    const getState = () => {
      return this.getState();
    };
    this.httpServices = createHttpServices(getState);
  }

  async init(): Promise<void> {
    this.logger.info('Init Apollo Server');

    const getState = () => {
      return this.getState();
    };

    const app = express();

    const schema = await getSchema();

    this.server = new ApolloServer({
      schema,
      context: (context) => {
        return { getState };
      }
    });

    this.server.applyMiddleware({ app });

    this.httpServer = http.createServer(app);

    // server.installSubscriptionHandlers(this.httpServer);
  }

  async initTest(): Promise<ApolloServer> {
    this.logger.info('Init Apollo Server for tests');

    const getState = () => {
      return this.getState();
    };

    const schema = await getSchema();

    return new ApolloServer({
      schema,
      context: (context) => {
        return { getState };
      }
    });
  }

  listen(): void {
    this.httpServer.listen(this.settings.port, () => {
      this.logger.info(
        `🚀 Server ready at http://localhost:${this.settings.port}${this.server.graphqlPath}`
      );
    });
  }
}
