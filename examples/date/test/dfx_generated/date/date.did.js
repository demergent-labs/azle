export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        get_date: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_day: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_full_year: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_hours: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_milliseconds: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_minutes: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_month: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_seconds: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_time: IDL.Func([IDL.Text], [IDL.Nat64], ['query']),
        get_timezone_offset: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_utc_date: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_utc_day: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_utc_full_year: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_utc_hours: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_utc_milliseconds: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_utc_minutes: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_utc_month: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        get_utc_seconds: IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
        now: IDL.Func([], [IDL.Nat64], ['query']),
        parse: IDL.Func([IDL.Text], [IDL.Nat64], ['query']),
        set_date: IDL.Func([IDL.Text, IDL.Nat32], [IDL.Nat32], ['query']),
        set_full_year: IDL.Func([IDL.Text, IDL.Nat32], [IDL.Nat32], ['query']),
        set_hours: IDL.Func([IDL.Text, IDL.Nat32], [IDL.Nat32], ['query']),
        set_milliseconds: IDL.Func(
            [IDL.Text, IDL.Nat32],
            [IDL.Nat32],
            ['query']
        ),
        set_minutes: IDL.Func([IDL.Text, IDL.Nat32], [IDL.Nat32], ['query']),
        set_month: IDL.Func([IDL.Text, IDL.Nat32], [IDL.Nat32], ['query']),
        set_seconds: IDL.Func([IDL.Text, IDL.Nat32], [IDL.Nat32], ['query']),
        set_time: IDL.Func([IDL.Text, IDL.Nat64], [IDL.Nat64], ['query']),
        set_utc_date: IDL.Func([IDL.Text, IDL.Nat32], [IDL.Nat32], ['query']),
        set_utc_full_year: IDL.Func(
            [IDL.Text, IDL.Nat32],
            [IDL.Nat32],
            ['query']
        ),
        set_utc_hours: IDL.Func([IDL.Text, IDL.Nat32], [IDL.Nat32], ['query']),
        set_utc_milliseconds: IDL.Func(
            [IDL.Text, IDL.Nat32],
            [IDL.Nat32],
            ['query']
        ),
        set_utc_minutes: IDL.Func(
            [IDL.Text, IDL.Nat32],
            [IDL.Nat32],
            ['query']
        ),
        set_utc_month: IDL.Func([IDL.Text, IDL.Nat32], [IDL.Nat32], ['query']),
        set_utc_seconds: IDL.Func(
            [IDL.Text, IDL.Nat32],
            [IDL.Nat32],
            ['query']
        ),
        to_date_string: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        to_iso_string: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        to_json: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        to_string: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        to_time_string: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        to_utc_string: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        utc: IDL.Func([IDL.Nat32, IDL.Nat32], [IDL.Nat64], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
