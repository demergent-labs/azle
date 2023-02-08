import {
    blob,
    Canister,
    CanisterResult,
    ExternalCanister,
    Func,
    Oneway,
    query
} from 'azle';

export type NotifierFunc = Func<Oneway<(message: blob) => void>>;

export type NotifierOld = Canister<{
    get_notifier(): CanisterResult<NotifierFunc>;
}>;

export class Notifier extends ExternalCanister {
    @query
    get_notifier: () => CanisterResult<NotifierFunc>;
}
