import { blob, Canister, CanisterResult, Func, Oneway } from 'azle';

export type NotifierFunc = Func<(message: blob) => Oneway>;

export type Notifier = Canister<{
    get_notifier(): CanisterResult<NotifierFunc>;
}>;
