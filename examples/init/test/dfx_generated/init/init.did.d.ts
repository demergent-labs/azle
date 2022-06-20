import type { Principal } from '@dfinity/principal';
export type Reaction = { Fire: null } | { Wave: null };
export interface User {
    id: string;
}
export interface _SERVICE {
    getOwner: () => Promise<[] | [Principal]>;
    getReaction: () => Promise<[] | [Reaction]>;
    getUser: () => Promise<[] | [User]>;
}
