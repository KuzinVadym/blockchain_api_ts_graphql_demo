import { buildSchema } from 'type-graphql';
import { combineBlockChainResolvers } from '../resolvers/blockchain';

export async function getSchema() {
  const blockchainResolvers = combineBlockChainResolvers();
  return buildSchema({
    resolvers: [...blockchainResolvers],
    dateScalarMode: 'timestamp'
  });
}
