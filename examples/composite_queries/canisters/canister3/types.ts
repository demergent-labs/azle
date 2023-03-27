import { CanisterResult, Service, serviceQuery } from 'azle';

export class Canister3 extends Service {
    @serviceQuery
    deepQuery: () => CanisterResult<string>;
}
