import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';
import { withHttpService } from '../../../shared/utils/withHttpService';
import { BlockType } from './BlockType';
import { RawBlockType } from './RawBlockType';

@Resolver((of) => BlockType)
export class BlockChainQuery {
  @Query(() => [BlockType])
  public async blocks(@Ctx() ctx): Promise<BlockType[]> {
    const blockChainHttpService = withHttpService('blockchain', ctx.getState);
    return blockChainHttpService.getBlocks();
  }

  @Query(() => RawBlockType)
  public async rawBlock(
    @Arg('hash', (type) => String) hash: string,
    @Ctx() ctx
  ): Promise<RawBlockType> {
    const blockChainHttpService = withHttpService('blockchain', ctx.getState);
    return blockChainHttpService.getRawBlock(hash);
  }
}
