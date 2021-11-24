// TODO start figuring out the cross canister call API...I need the types in Rust I think
// TODO so I might need to create a typed function in TypeScript

import {
    Query,
    Update,
    u64,
    Vec,
    u8
} from 'azle';

declare const ic: {
    caller: () => string;
    canisterBalance: () => u64;
    id: () => string;
    print: (...args: any) => void;
    time: () => u64;
    trap: (message: string) => never;
    rawRand: () => Uint8Array;

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
    ic.print('ic.testCrossCanister()', ic.testCrossCanister());

    // const rawRand = ic.rawRand();

    // rawRand.forEach((uint) => {
    //     ic.print('uint', uint);
    // });

    return true;
}