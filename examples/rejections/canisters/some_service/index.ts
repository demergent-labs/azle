import { Canister, CanisterResult, empty, ic, Principal } from 'azle';

export type SomeServiceOld = Canister<{
    reject(message: string): CanisterResult<empty>;
    accept(): CanisterResult<boolean>;
    error(): CanisterResult<empty>;
}>;

export const some_service_old: SomeServiceOld = ic.canisters.SomeServiceOld(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

// Used by `ic.result` example.

// export type Result = Variant<{
//     ok: boolean;
//     err: string;
// }>;

// class API

import { ExternalCanister, method } from 'azle';

export class SomeService extends ExternalCanister {
    @method
    reject: (message: string) => CanisterResult<empty>;

    @method
    accept: () => CanisterResult<boolean>;

    @method
    error: () => CanisterResult<empty>;
}

export const some_service = new SomeService(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);
