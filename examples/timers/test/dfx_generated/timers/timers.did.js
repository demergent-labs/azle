export const idlFactory = ({ IDL }) => {
    const TimerIds = IDL.Record({
        inline1: IDL.Nat64,
        inline2: IDL.Nat64,
        single: IDL.Nat64
    });
    const StatusReport = IDL.Record({
        inline1: IDL.Int8,
        inline2: IDL.Int8,
        single: IDL.Bool
    });
    return IDL.Service({
        clear_timer: IDL.Func([IDL.Nat64], [], []),
        set_timers: IDL.Func([IDL.Nat64], [TimerIds], []),
        status_report: IDL.Func([], [StatusReport], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
