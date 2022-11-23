export const idlFactory = ({ IDL }) => {
    const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text });
    const HttpResponse = IDL.Record({
        status: IDL.Nat,
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(HttpHeader)
    });
    const HttpTransformArgs = IDL.Record({
        context: IDL.Vec(IDL.Nat8),
        response: HttpResponse
    });
    return IDL.Service({
        xkcd: IDL.Func([], [HttpResponse], []),
        xkcd_raw: IDL.Func([], [HttpResponse], []),
        xkcd_transform: IDL.Func([HttpTransformArgs], [HttpResponse], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
