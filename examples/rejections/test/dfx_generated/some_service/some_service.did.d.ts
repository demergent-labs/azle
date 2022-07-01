import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
    accept: () => Promise<boolean>;
    error: () => Promise<never>;
    reject: (arg_0: string) => Promise<never>;
}
