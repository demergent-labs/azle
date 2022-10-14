export const idlFactory = ({ IDL }) => {
    return IDL.Service({ standin: IDL.Func([], [], ['query']) });
};
export const init = ({ IDL }) => {
    return [];
};
