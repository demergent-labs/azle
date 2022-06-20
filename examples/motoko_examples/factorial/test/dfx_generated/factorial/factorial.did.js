export const idlFactory = ({ IDL }) => {
    return IDL.Service({ fac: IDL.Func([IDL.Nat], [IDL.Nat], ['query']) });
};
export const init = ({ IDL }) => {
    return [];
};
