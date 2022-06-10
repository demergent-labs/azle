import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'caller' : () => Promise<Principal>,
  'canisterBalance' : () => Promise<bigint>,
  'id' : () => Promise<Principal>,
  'print' : (arg_0: string) => Promise<boolean>,
  'time' : () => Promise<bigint>,
  'trap' : (arg_0: string) => Promise<boolean>,
}
