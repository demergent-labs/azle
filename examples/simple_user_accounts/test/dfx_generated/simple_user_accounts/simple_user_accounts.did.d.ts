import type { Principal } from '@dfinity/principal';
export interface User { 'id' : string, 'username' : string }
export interface _SERVICE {
  'createUser' : (arg_0: string) => Promise<User>,
  'getAllUsers' : () => Promise<Array<User>>,
  'getUserById' : (arg_0: string) => Promise<[] | [User]>,
}
