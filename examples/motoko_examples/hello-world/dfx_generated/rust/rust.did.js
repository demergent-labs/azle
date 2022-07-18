export const idlFactory = ({ IDL }) => {
    return IDL.Service({ main: IDL.Func([], [], ['query']) });
};
export const init = ({ IDL }) => {
    return [];
};
