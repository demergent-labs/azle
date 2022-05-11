import type { Principal } from '@dfinity/principal';
export type ExecuteCallRaw128Result = { 'ok' : Array<number> } |
  { 'err' : string };
export type ExecuteCallRawResult = { 'ok' : Array<number> } |
  { 'err' : string };
export interface _SERVICE {
  'execute_call_raw' : (
      arg_0: Principal,
      arg_1: string,
      arg_2: Array<number>,
      arg_3: bigint,
    ) => Promise<ExecuteCallRawResult>,
  'execute_call_raw128' : (
      arg_0: Principal,
      arg_1: string,
      arg_2: Array<number>,
      arg_3: bigint,
    ) => Promise<ExecuteCallRaw128Result>,
}
