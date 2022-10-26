import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface User {
    id: string;
    username: string;
}
export interface _SERVICE {
    create_user: ActorMethod<[string], User>;
    get_all_users: ActorMethod<[], Array<User>>;
    get_user_by_id: ActorMethod<[string], [] | [User]>;
}
