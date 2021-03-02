import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class RawBlockType {
  @Field((type) => Int)
  public size: number;

  @Field((type) => Int)
  public block_index: number;

  @Field((type) => Int)
  public prev_hash: number;
}
