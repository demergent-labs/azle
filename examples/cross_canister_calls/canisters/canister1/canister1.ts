import {
    UpdateAsync,
    ic,
    int32,
    Canister
} from 'azle';

type Canister2 = Canister<{
    transfer(
        from: string,
        to: string,
        amount: int32
    ): UpdateAsync<string>;
}>;

let canister2 = ic.canisters.Canister2<Canister2>('ryjl3-tyaaa-aaaaa-aaaba-cai');

export function* initiateTransfer(): UpdateAsync<string> {
    return yield canister2.transfer(
        '0',
        '1',
        50
    ).next().value;
}