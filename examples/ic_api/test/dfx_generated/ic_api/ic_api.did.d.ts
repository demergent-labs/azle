import type { Principal } from '@dfinity/principal';
export interface ArgDataMultipleParamsResult {
    int: number;
    string: string;
    blob: Array<number>;
    boolean: boolean;
}
export interface _SERVICE {
    arg_data_multiple_params: (
        arg_0: Array<number>,
        arg_1: number,
        arg_2: boolean,
        arg_3: string
    ) => Promise<ArgDataMultipleParamsResult>;
    arg_data_one_param: (arg_0: boolean) => Promise<boolean>;
    arg_data_raw: (
        arg_0: Array<number>,
        arg_1: number,
        arg_2: boolean,
        arg_3: string
    ) => Promise<Array<number>>;
    arg_data_raw_size: (
        arg_0: Array<number>,
        arg_1: number,
        arg_2: boolean,
        arg_3: string
    ) => Promise<number>;
    arg_data_zero_params: () => Promise<Array<null>>;
    caller: () => Promise<Principal>;
    canister_balance: () => Promise<bigint>;
    canister_balance128: () => Promise<bigint>;
    data_certificate: () => Promise<[] | [Array<number>]>;
    data_certificate_null: () => Promise<[] | [Array<number>]>;
    id: () => Promise<Principal>;
    print: (arg_0: string) => Promise<boolean>;
    reject: (arg_0: string) => Promise<never>;
    set_certified_data: (arg_0: Array<number>) => Promise<undefined>;
    time: () => Promise<bigint>;
    trap: (arg_0: string) => Promise<boolean>;
}
