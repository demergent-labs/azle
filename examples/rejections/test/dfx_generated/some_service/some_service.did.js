export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        accept: IDL.Func([], [IDL.Bool], ['query']),
        error: IDL.Func([], [IDL.Empty], ['query']),
        reject: IDL.Func([IDL.Text], [IDL.Empty], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
