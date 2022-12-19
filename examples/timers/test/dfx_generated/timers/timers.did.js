export const idlFactory = ({ IDL }) => {
    const TimerIds = IDL.Record({
        repeat: IDL.Nat64,
        inline: IDL.Nat64,
        capture: IDL.Nat64,
        single: IDL.Nat64
    });
    const StatusReport = IDL.Record({
        repeat: IDL.Int8,
        inline: IDL.Int8,
        capture: IDL.Text,
        single: IDL.Bool
    });
    return IDL.Service({
        clear_timer: IDL.Func([IDL.Nat64], [], []),
        set_timers: IDL.Func([IDL.Nat64, IDL.Nat64], [TimerIds], []),
        status_report: IDL.Func([], [StatusReport], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
