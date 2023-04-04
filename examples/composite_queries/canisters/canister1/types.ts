import { CallResult, nat, Service, serviceQuery } from 'azle';

export class Canister1 extends Service {
    @serviceQuery
    incCounter: () => CallResult<nat>;
}
