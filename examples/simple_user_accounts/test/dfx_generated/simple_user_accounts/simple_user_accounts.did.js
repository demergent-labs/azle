export const idlFactory = ({ IDL }) => {
    const User = IDL.Record({ id: IDL.Text, username: IDL.Text });
    return IDL.Service({
        createUser: IDL.Func([IDL.Text], [User], []),
        getAllUsers: IDL.Func([], [IDL.Vec(User)], ['query']),
        getUserById: IDL.Func([IDL.Text], [IDL.Opt(User)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
