import { candid, nat64, Record, text } from 'azle';

// TODO start using principals instead of strings for ids
export type State = {
    accounts: {
        [id: string]: Account;
    };
    notification: string;
};

export class Account extends Record {
    @candid(text)
    id: text;

    @candid(nat64)
    balance: nat64;
}

export class AccountArgs extends Record {
    @candid(text)
    id: text;
}
