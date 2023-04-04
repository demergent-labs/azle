import { CallResult, nat, Service, serviceQuery, serviceUpdate } from 'azle';
import { StringQueryResult } from '../canister1/types';

export class Canister2 extends Service {
    @serviceQuery
    simpleQuery: () => CallResult<string>;

    @serviceQuery
    manualQuery: () => CallResult<string>;

    @serviceUpdate
    updateQuery: () => CallResult<string>;

    @serviceQuery
    deepQuery: () => CallResult<StringQueryResult>;

    @serviceQuery
    incCounter: () => CallResult<nat>;
}
