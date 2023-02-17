import {
    CanisterResult,
    ExternalCanister,
    empty,
    Principal,
    query
} from 'azle';

export class SomeService extends ExternalCanister {
    @query
    reject: (message: string) => CanisterResult<empty>;

    @query
    accept: () => CanisterResult<boolean>;

    @query
    error: () => CanisterResult<empty>;
}

export const some_service = new SomeService(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);
