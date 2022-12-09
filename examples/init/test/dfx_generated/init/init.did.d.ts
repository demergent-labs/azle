import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Reaction = { Fire: null } | { Wave: null };
export interface User {
    id: string;
}
export interface _SERVICE {
    get_owner: ActorMethod<[], [] | [Principal]>;
    get_reaction: ActorMethod<[], [] | [Reaction]>;
    get_user: ActorMethod<[], [] | [User]>;
}
