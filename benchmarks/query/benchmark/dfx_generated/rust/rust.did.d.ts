import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'query_empty' : ActorMethod<[], bigint>,
  'query_nat64_add_many' : ActorMethod<[], bigint>,
  'query_nat64_add_one' : ActorMethod<[], bigint>,
  'query_string_initialize' : ActorMethod<[], bigint>,
}
