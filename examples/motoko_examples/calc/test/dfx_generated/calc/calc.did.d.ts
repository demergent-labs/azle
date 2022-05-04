import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'add' : (arg_0: bigint) => Promise<bigint>,
  'clearall' : () => Promise<undefined>,
  'div' : (arg_0: bigint) => Promise<[] | [bigint]>,
  'mul' : (arg_0: bigint) => Promise<bigint>,
  'sub' : (arg_0: bigint) => Promise<bigint>,
}
