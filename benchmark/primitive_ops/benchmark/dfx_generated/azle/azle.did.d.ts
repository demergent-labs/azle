import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface BooleanResult {
  'value' : boolean,
  'wasm_instructions' : bigint,
}
export interface BooleansResult {
  'value' : Array<boolean>,
  'wasm_instructions' : bigint,
}
export interface NatResult { 'value' : bigint, 'wasm_instructions' : bigint }
export interface NatsResult {
  'value' : Array<bigint>,
  'wasm_instructions' : bigint,
}
export interface _SERVICE {
  'boolean_candid_serde_many' : ActorMethod<[Array<boolean>], BooleansResult>,
  'boolean_candid_serde_one' : ActorMethod<[boolean], BooleanResult>,
  'boolean_init_heap' : ActorMethod<[number], BooleanResult>,
  'boolean_init_stack' : ActorMethod<[number], BooleanResult>,
  'empty' : ActorMethod<[], bigint>,
  'nat_candid_serde_many' : ActorMethod<[Array<bigint>], NatsResult>,
  'nat_candid_serde_one' : ActorMethod<[bigint], NatResult>,
  'nat_init_heap' : ActorMethod<[number], NatResult>,
  'nat_init_stack' : ActorMethod<[number], NatResult>,
}
