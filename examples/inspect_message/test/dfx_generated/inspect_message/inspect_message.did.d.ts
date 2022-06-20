import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
    accessible: () => Promise<boolean>;
    alsoInaccessible: () => Promise<boolean>;
    inaccessible: () => Promise<boolean>;
}
