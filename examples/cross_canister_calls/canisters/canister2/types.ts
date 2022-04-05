import { nat64 } from 'azle';

// TODO start using principals instead of strings for ids
export type State = {
    accounts: {
        [id: string]: Account
    }
};

export type Account = {
    id: string;
    balance: nat64;
};

export type AccountArgs = {
    id: string;
};