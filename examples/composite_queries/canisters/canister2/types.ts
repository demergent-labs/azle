import {
    CanisterResult,
    nat,
    Service,
    serviceQuery,
    serviceUpdate
} from 'azle';
import { StringQueryResult } from '../canister1/types';

export class Canister2 extends Service {
    @serviceQuery
    simpleQuery: () => CanisterResult<string>;

    @serviceQuery
    manualQuery: () => CanisterResult<string>;

    @serviceUpdate
    updateQuery: () => CanisterResult<string>;

    @serviceQuery
    deepQuery: () => CanisterResult<StringQueryResult>;

    @serviceQuery
    incCounter: () => CanisterResult<nat>;
}
