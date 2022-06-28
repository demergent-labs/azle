import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface QueryBoolResult {
  'wasm_instructions' : bigint,
  'boolean' : boolean,
}
export interface _SERVICE {
  'query_bool_init_heap' : ActorMethod<[number], QueryBoolResult>,
  'query_bool_init_stack' : ActorMethod<[number], QueryBoolResult>,
  'query_empty' : ActorMethod<[], bigint>,
}
