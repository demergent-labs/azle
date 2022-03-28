import {
    UpdateAsync,
    ic,
    int32,
    Canister,
    nat8
} from 'azle';

type Canister2 = Canister<{
    transfer(
        from: string,
        to: string,
        amount: int32
    ): UpdateAsync<int32>;
}>;

let canister2 = ic.canisters.Canister2<Canister2>('ryjl3-tyaaa-aaaaa-aaaba-cai');

export function* initiateTransfer(): UpdateAsync<int32> {
    return yield canister2.transfer(
        '0',
        '1',
        50
    );
}

// type Test = {
//     rand1: nat8[];
//     rand2: nat8[];
// };

// export function* test(): UpdateAsync<Test> {
//     const rand1 = yield ic.rawRand();
//     const rand2 = yield ic.rawRand();

//     return {
//         rand1,
//         rand2
//     };
// }