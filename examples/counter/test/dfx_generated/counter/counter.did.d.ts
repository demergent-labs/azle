import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'incrementCount' : () => Promise<bigint>,
  'readCount' : () => Promise<bigint>,
}
