// TODO start figuring out the cross canister call API...I need the types in Rust I think
// TODO so I might need to create a typed function in TypeScript

import {
    Query,
    Update,
    u64,
    Vec,
    u8
} from 'azle';

// TODO we need to provide this type to the user
// TODO doing it through an import would probably be best
// TODO so we need to get imports to work
declare const ic: {
    caller: () => string;
    canisterBalance: () => u64;
    id: () => string;
    print: (...args: any) => void;
    time: () => u64;
    trap: (message: string) => never;
    rawRand: () => Uint8Array;

    // TODO figure out these functions
    // call: (...args: any) => any;
    // call_raw
    // call_with_payment

    testCrossCanister: () => string;
};

// type RemoteCanister = Canister<{
//     echo: (message: string) => string;
// }>;

// export function test(id: string, argument0: string): Canister<string> {
//     // return // TODO figure this out
//     return ic.call();
// }

export function test(): Update<boolean> {
    // ic.print('ic.rejectMessage()', ic.rejectMessage());

    ic.print('ic.testCrossCanister()', ic.testCrossCanister());

    // const rawRand = ic.rawRand();

    // rawRand.forEach((uint) => {
    //     ic.print('uint', uint);
    // });

    return true;
}