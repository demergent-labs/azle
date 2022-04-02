import type { Principal } from '@dfinity/principal';
export interface Entry { 'desc' : string, 'phone' : string }
export interface _SERVICE {
  'insert' : (arg_0: string, arg_1: Entry) => Promise<undefined>,
  'lookup' : (arg_0: string) => Promise<[] | [Entry]>,
}
