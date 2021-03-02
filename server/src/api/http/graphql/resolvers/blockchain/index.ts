import { NonEmptyArray } from 'type-graphql/dist/interfaces/NonEmptyArray';
import { BlockChainQuery } from './BlockChainQuery';

export const combineBlockChainResolvers = (): NonEmptyArray<Function> => {
  return [BlockChainQuery];
};
