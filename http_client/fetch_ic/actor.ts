import { Actor, ActorMethod, ActorSubclass, Identity } from '@dfinity/agent';
import type { Principal } from '@dfinity/principal';

import { createAgent } from './agent';

export async function createActor(
    identity: Identity,
    canisterId: string,
    host: string
): Promise<ActorSubclass<_SERVICE>> {
    const agent = await createAgent(identity, host);

    return Actor.createActor<_SERVICE>(
        ({ IDL }) => {
            const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);

            const HttpRequest = IDL.Record({
                method: IDL.Text,
                url: IDL.Text,
                headers: IDL.Vec(HeaderField),
                body: IDL.Vec(IDL.Nat8),
                certificate_version: IDL.Opt(IDL.Nat16)
            });

            const HttpUpdateRequest = IDL.Record({
                method: IDL.Text,
                url: IDL.Text,
                headers: IDL.Vec(HeaderField),
                body: IDL.Vec(IDL.Nat8)
            });

            const StreamingToken = IDL.Record({});

            const StreamingCallbackHttpResponse = IDL.Record({
                body: IDL.Vec(IDL.Nat8),
                token: IDL.Opt(StreamingToken)
            });

            const StreamingStrategy = IDL.Variant({
                Callback: IDL.Record({
                    callback: IDL.Func(
                        [StreamingToken],
                        [StreamingCallbackHttpResponse],
                        ['query']
                    )
                })
            });

            const HttpResponse = IDL.Record({
                status_code: IDL.Nat16,
                headers: IDL.Vec(HeaderField),
                body: IDL.Vec(IDL.Nat8),
                upgrade: IDL.Opt(IDL.Bool),
                streaming_strategy: IDL.Opt(StreamingStrategy)
            });

            return IDL.Service({
                http_request: IDL.Func(
                    [HttpRequest],
                    [HttpResponse],
                    ['query']
                ),
                http_request_update: IDL.Func(
                    [HttpUpdateRequest],
                    [HttpResponse],
                    []
                )
            });
        },
        {
            agent,
            canisterId
        }
    );
}

export interface _SERVICE {
    http_request: ActorMethod<
        [
            {
                url: string;
                method: string;
                body: Uint8Array | number[];
                headers: Array<[string, string]>;
                certificate_version: [] | [number];
            }
        ],
        {
            body: Uint8Array | number[];
            headers: Array<[string, string]>;
            upgrade: [] | [boolean];
            streaming_strategy:
                | []
                | [{ Callback: { token: {}; callback: [Principal, string] } }];
            status_code: number;
        }
    >;
    http_request_update: ActorMethod<
        [
            {
                url: string;
                method: string;
                body: Uint8Array | number[];
                headers: Array<[string, string]>;
            }
        ],
        {
            body: Uint8Array | number[];
            headers: Array<[string, string]>;
            upgrade: [] | [boolean];
            streaming_strategy:
                | []
                | [{ Callback: { token: {}; callback: [Principal, string] } }];
            status_code: number;
        }
    >;
}
