import { IResponse } from '../../shared/types/IResponse';

export type IBlock = {
  hash: string;
  time: number;
  height: number;
};

export type IRawBlock = {
  size?: number;
  block_index?: number;
  prev_hash?: number;
};

export type IGetBlocksPayload = {};

export type IBlocksResponse = IResponse<IBlock[]>;
export type IRawBlockResponse = IResponse<IRawBlock>;
