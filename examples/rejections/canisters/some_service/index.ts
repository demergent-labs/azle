import { CallResult, empty, Principal, Service, serviceQuery } from 'azle';

export class SomeService extends Service {
    @serviceQuery
    reject: (message: string) => CallResult<empty>;

    @serviceQuery
    accept: () => CallResult<boolean>;

    @serviceQuery
    error: () => CallResult<empty>;
}

export const someService = new SomeService(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);
