import { IDL } from 'azle';

export type State = {
    accounts: {
        [id: string]: Account;
    };
    notification: string;
};

export const Account = IDL.Record({
    id: IDL.Text,
    balance: IDL.Nat64
});
export type Account = {
    id: string;
    balance: bigint;
};

export const AccountArgs = IDL.Record({
    id: IDL.Text
});
export type AccountArgs = {
    id: string;
};
