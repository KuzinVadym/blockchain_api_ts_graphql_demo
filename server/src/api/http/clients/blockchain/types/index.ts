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
