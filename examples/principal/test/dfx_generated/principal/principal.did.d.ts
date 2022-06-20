import type { Principal } from '@dfinity/principal';
export type Status =
    | { Online: null }
    | { WaitingOn: Principal }
    | { Offline: null };
export interface User {
    id: Principal;
    username: string;
}
export interface _SERVICE {
    principal_from_hex: (arg_0: string) => Promise<Principal>;
    principal_from_text: (arg_0: string) => Promise<Principal>;
    principal_from_uint8array: (arg_0: Array<number>) => Promise<Principal>;
    principal_in_record: () => Promise<User>;
    principal_in_variant: () => Promise<Status>;
    principal_param: (arg_0: Principal) => Promise<Principal>;
    principal_return_type: () => Promise<Principal>;
    principal_to_hex: (arg_0: Principal) => Promise<string>;
    principal_to_text: (arg_0: Principal) => Promise<string>;
    principal_to_uint8array: (arg_0: Principal) => Promise<Array<number>>;
}
