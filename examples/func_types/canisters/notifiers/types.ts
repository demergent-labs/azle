import {
    blob,
    CanisterResult,
    ExternalCanister,
    Func,
    FuncOneway,
    query
} from 'azle';

export type NotifierFunc = Func<FuncOneway<(message: blob) => void>>;

export type NotifierOld = Canister<{
    get_notifier(): CanisterResult<NotifierFunc>;
}>;

export class Notifier extends ExternalCanister {
    @query
    get_notifier: () => CanisterResult<NotifierFunc>;
}
