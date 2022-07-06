import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'boolean_init_heap' : ActorMethod<[number], bigint>,
  'boolean_init_stack' : ActorMethod<[number], bigint>,
  'int_init_heap' : ActorMethod<[number], bigint>,
  'int_init_stack' : ActorMethod<[number], bigint>,
  'nat_init_heap' : ActorMethod<[number], bigint>,
  'nat_init_stack' : ActorMethod<[number], bigint>,
}
