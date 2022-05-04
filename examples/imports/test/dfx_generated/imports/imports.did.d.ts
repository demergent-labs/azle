import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'getOne' : () => Promise<string>,
  'getThree' : () => Promise<string>,
  'getTwo' : () => Promise<string>,
  'sha224Hash' : (arg_0: string) => Promise<string>,
}
