import type { Principal } from '@dfinity/principal';
export type NotifierFunc = (arg_0: Array<number>) => Promise<undefined>;
export interface _SERVICE {
    get_notifier: () => Promise<[Principal, string]>;
}
