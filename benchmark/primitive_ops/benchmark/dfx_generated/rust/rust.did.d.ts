import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface BooleanResult {
  'value' : boolean,
  'wasm_instructions' : bigint,
}
export interface NatResult { 'value' : bigint, 'wasm_instructions' : bigint }
export interface _SERVICE {
  'boolean_init_heap' : ActorMethod<[number], BooleanResult>,
  'boolean_init_stack' : ActorMethod<[number], BooleanResult>,
  'empty' : ActorMethod<[], bigint>,
  'nat_init_heap' : ActorMethod<[number], NatResult>,
  'nat_init_stack' : ActorMethod<[number], NatResult>,
}
