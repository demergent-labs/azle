export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        msgCyclesAccept: IDL.Func([IDL.Nat64], [IDL.Nat64], []),
        msgCyclesAccept128: IDL.Func([IDL.Nat], [IDL.Nat], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
