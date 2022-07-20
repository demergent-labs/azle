import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
    argument: () => Promise<Principal>;
    id: () => Promise<Principal>;
    idQuick: () => Promise<Principal>;
    installer: () => Promise<Principal>;
    whoami: () => Promise<Principal>;
}
