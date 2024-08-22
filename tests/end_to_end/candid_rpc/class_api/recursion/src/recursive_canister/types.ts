import { IDL, Principal } from 'azle';

export const MyCanister = IDL.Rec();
MyCanister.fill(
    IDL.Service({
        myQuery: IDL.Func([MyCanister], [MyCanister], ['query']),
        getMessage: IDL.Func([], [IDL.Text], ['query'])
    })
);
export type MyCanister = Principal;
