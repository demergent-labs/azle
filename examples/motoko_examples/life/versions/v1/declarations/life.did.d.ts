import type { Principal } from '@dfinity/principal';
export type State = { 'v1' : Array<Array<boolean>> };
export interface _SERVICE {
  'current' : () => Promise<string>,
  'next' : () => Promise<string>,
  'stableState' : () => Promise<string>,
}
