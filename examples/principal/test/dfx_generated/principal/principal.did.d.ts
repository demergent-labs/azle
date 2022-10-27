import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Status =
    | { Online: null }
    | { WaitingOn: Principal }
    | { Offline: null };
export interface User {
    id: Principal;
    username: string;
}
export interface _SERVICE {
    principal_from_blob: ActorMethod<[Array<number>], Principal>;
    principal_from_hex: ActorMethod<[string], Principal>;
    principal_from_text: ActorMethod<[string], Principal>;
    principal_in_record: ActorMethod<[], User>;
    principal_in_variant: ActorMethod<[], Status>;
    principal_param: ActorMethod<[Principal], Principal>;
    principal_return_type: ActorMethod<[], Principal>;
    principal_to_blob: ActorMethod<[Principal], Array<number>>;
    principal_to_hex: ActorMethod<[Principal], string>;
    principal_to_text: ActorMethod<[Principal], string>;
}
