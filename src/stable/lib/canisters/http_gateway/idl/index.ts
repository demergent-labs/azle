import { ActorMethod } from '@icp-sdk/core/agent';
import { IDL } from '@icp-sdk/core/candid';
import { Principal } from '@icp-sdk/core/principal';

export type HeaderField = [string, string];
export interface HttpRequest {
    url: string;
    method: string;
    body: Uint8Array | number[];
    headers: Array<HeaderField>;
    certificate_version: [] | [number];
}
export interface HttpResponse {
    body: Uint8Array | number[];
    headers: Array<HeaderField>;
    upgrade: [] | [boolean];
    streaming_strategy: [] | [StreamingStrategy];
    status_code: number;
}
export interface HttpUpdateRequest {
    url: string;
    method: string;
    body: Uint8Array | number[];
    headers: Array<HeaderField>;
}
export interface StreamingCallbackHttpResponse {
    token: [] | [StreamingToken];
    body: Uint8Array | number[];
}
export type StreamingStrategy = {
    Callback: { token: StreamingToken; callback: [Principal, string] };
};
export type StreamingToken = {};
export interface _SERVICE {
    http_request: ActorMethod<[HttpRequest], HttpResponse>;
    http_request_update: ActorMethod<[HttpUpdateRequest], HttpResponse>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
export const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    certificate_version: IDL.Opt(IDL.Nat16)
});
export const StreamingToken = IDL.Record({});
export const StreamingCallbackHttpResponse = IDL.Record({
    token: IDL.Opt(StreamingToken),
    body: IDL.Vec(IDL.Nat8)
});
export const StreamingStrategy = IDL.Variant({
    Callback: IDL.Record({
        token: StreamingToken,
        callback: IDL.Func(
            [StreamingToken],
            [IDL.Opt(StreamingCallbackHttpResponse)],
            ['query']
        )
    })
});
export const HttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    upgrade: IDL.Opt(IDL.Bool),
    streaming_strategy: IDL.Opt(StreamingStrategy),
    status_code: IDL.Nat16
});
export const HttpUpdateRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField)
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
    const HttpRequest = IDL.Record({
        url: IDL.Text,
        method: IDL.Text,
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(HeaderField),
        certificate_version: IDL.Opt(IDL.Nat16)
    });
    const StreamingToken = IDL.Record({});
    const StreamingCallbackHttpResponse = IDL.Record({
        token: IDL.Opt(StreamingToken),
        body: IDL.Vec(IDL.Nat8)
    });
    const StreamingStrategy = IDL.Variant({
        Callback: IDL.Record({
            token: StreamingToken,
            callback: IDL.Func(
                [StreamingToken],
                [IDL.Opt(StreamingCallbackHttpResponse)],
                ['query']
            )
        })
    });
    const HttpResponse = IDL.Record({
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(HeaderField),
        upgrade: IDL.Opt(IDL.Bool),
        streaming_strategy: IDL.Opt(StreamingStrategy),
        status_code: IDL.Nat16
    });
    const HttpUpdateRequest = IDL.Record({
        url: IDL.Text,
        method: IDL.Text,
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(HeaderField)
    });
    return IDL.Service({
        http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
        http_request_update: IDL.Func([HttpUpdateRequest], [HttpResponse], [])
    });
};
export const init: init = () => {
    return [];
};
