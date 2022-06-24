import type { Principal } from '@dfinity/principal';
export type BasicFunc = (arg_0: string) => Promise<string>;
export type ComplexFunc = (arg_0: User, arg_1: Reaction) => Promise<bigint>;
export type GetNotifierFromNotifiersCanisterResult =
    | { ok: NotifierFunc }
    | { err: string };
export type NotifierFunc = (arg_0: Array<number>) => Promise<undefined>;
export type Reaction =
    | { Bad: null }
    | { ComplexFunc: ComplexFunc }
    | { Good: null }
    | { BasicFunc: BasicFunc };
export type StableFunc = (arg_0: bigint, arg_1: string) => Promise<undefined>;
export interface User {
    id: string;
    basic_func: BasicFunc;
    complex_func: ComplexFunc;
}
export interface _SERVICE {
    basic_func_param: (
        arg_0: [Principal, string]
    ) => Promise<[Principal, string]>;
    basic_func_param_array: (
        arg_0: Array<[Principal, string]>
    ) => Promise<Array<[Principal, string]>>;
    basic_func_return_type: () => Promise<[Principal, string]>;
    basic_func_return_type_array: () => Promise<Array<[Principal, string]>>;
    complex_func_param: (
        arg_0: [Principal, string]
    ) => Promise<[Principal, string]>;
    complex_func_return_type: () => Promise<[Principal, string]>;
    get_notifier_from_notifiers_canister: () => Promise<GetNotifierFromNotifiersCanisterResult>;
    get_stable_func: () => Promise<[Principal, string]>;
}
