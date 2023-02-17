import {
    blob,
    CanisterResult,
    ExternalCanister,
    Func,
    Oneway,
    query
} from 'azle';

export type NotifierFunc = Func<Oneway<(message: blob) => void>>;

export class Notifier extends ExternalCanister {
    @query
    get_notifier: () => CanisterResult<NotifierFunc>;
}
