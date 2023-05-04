import { CallResult, empty, ic, Principal, Service, serviceQuery } from 'azle';

export class SomeService extends Service {
    @serviceQuery
    reject: (message: string) => CallResult<empty>;

    @serviceQuery
    accept: () => CallResult<boolean>;

    @serviceQuery
    error: () => CallResult<empty>;
}

export const someService = new SomeService(
    Principal.fromText(
        process.env.SOME_SERVICE_PRINCIPAL ??
            ic.trap('process.env.SOME_SERVICE_PRINCIPAL is undefined')
    )
);
