export const idlFactory = ({ IDL }) => {
    const NotifierFunc = IDL.Func([IDL.Vec(IDL.Nat8)], [], ['query']);
    return IDL.Service({
        get_notifier: IDL.Func([], [NotifierFunc], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
