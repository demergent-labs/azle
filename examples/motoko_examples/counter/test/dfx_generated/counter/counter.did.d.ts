import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'get' : () => Promise<bigint>,
  'inc' : () => Promise<undefined>,
  'set' : (arg_0: bigint) => Promise<undefined>,
}
