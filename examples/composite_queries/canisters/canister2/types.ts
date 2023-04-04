import {
    CallResult,
    nat,
    Result,
    Service,
    serviceQuery,
    serviceUpdate
} from 'azle';

export class Canister2 extends Service {
    @serviceQuery
    simpleQuery: () => CallResult<string>;

    @serviceQuery
    manualQuery: () => CallResult<string>;

    @serviceUpdate
    updateQuery: () => CallResult<string>;

    @serviceQuery
    deepQuery: () => CallResult<Result<string, string>>;

    @serviceQuery
    incCounter: () => CallResult<nat>;
}
