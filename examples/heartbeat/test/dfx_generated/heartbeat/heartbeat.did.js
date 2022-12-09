export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        get_initialized: IDL.Func([], [IDL.Bool], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
