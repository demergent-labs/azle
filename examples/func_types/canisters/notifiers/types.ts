import { blob, Canister, CanisterResult, Func, Oneway } from 'azle';

export type NotifierFunc = Func<(message: blob) => Oneway>;

export type NotifierOld = Canister<{
    get_notifier(): CanisterResult<NotifierFunc>;
}>;

// class API

import { ExternalCanister, method } from 'azle';

export class Notifier extends ExternalCanister {
    @method
    get_notifier: () => CanisterResult<NotifierFunc>;
}
