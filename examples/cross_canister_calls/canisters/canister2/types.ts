import { nat64, Record, text } from 'azle';

// TODO start using principals instead of strings for ids
export type State = {
    accounts: {
        [id: string]: typeof Account;
    };
    notification: string;
};

export const Account = Record({
    id: text,
    balance: nat64
});

export const AccountArgs = Record({
    id: text
});
