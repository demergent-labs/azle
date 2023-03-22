import { CanisterResult, empty, Principal, Service, serviceQuery } from 'azle';

export class SomeService extends Service {
    @serviceQuery
    reject: (message: string) => CanisterResult<empty>;

    @serviceQuery
    accept: () => CanisterResult<boolean>;

    @serviceQuery
    error: () => CanisterResult<empty>;
}

export const someService = new SomeService(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);
