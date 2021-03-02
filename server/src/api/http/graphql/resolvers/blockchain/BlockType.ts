import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class BlockType {
  @Field()
  public hash: string;

  @Field((type) => Int)
  public time: number;

  @Field((type) => Int)
  public height: number;
}
