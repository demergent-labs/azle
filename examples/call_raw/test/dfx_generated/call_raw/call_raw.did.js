export const idlFactory = ({ IDL }) => {
    const ExecuteCallRawResult = IDL.Variant({
        ok: IDL.Text,
        err: IDL.Text
    });
    const ExecuteCallRaw128Result = IDL.Variant({
        ok: IDL.Text,
        err: IDL.Text
    });
    return IDL.Service({
        execute_call_raw: IDL.Func(
            [IDL.Principal, IDL.Text, IDL.Text, IDL.Nat64],
            [ExecuteCallRawResult],
            []
        ),
        execute_call_raw128: IDL.Func(
            [IDL.Principal, IDL.Text, IDL.Text, IDL.Nat],
            [ExecuteCallRaw128Result],
            []
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
