import { CallResult, Service, serviceQuery } from 'azle';

export class Canister3 extends Service {
    @serviceQuery
    deepQuery: () => CallResult<string>;
}
