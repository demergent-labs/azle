import type { Principal } from '@dfinity/principal';
export interface Entry { 'key' : string, 'value' : bigint }
export interface _SERVICE {
  'getEntries' : () => Promise<Array<Entry>>,
  'setEntry' : (arg_0: Entry) => Promise<undefined>,
}
