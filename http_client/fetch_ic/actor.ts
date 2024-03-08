import { Actor, ActorMethod, ActorSubclass, Identity } from '@dfinity/agent';
import type { Principal } from '@dfinity/principal';

import { getAgent } from './agent';

// TODO make sure the developer can access this if they
// TODO for example are not using a web client and want to use
// TODO the actor directly
export async function createActor(
    identity: Identity,
    input: RequestInfo | URL
): Promise<ActorSubclass<_SERVICE>> {
    const agent = await getAgent(identity);
    const canisterId = getCanisterId(input);

    if (canisterId === undefined) {
        throw new Error(
            `The canister id could not be determined from the fetch input argument`
        );
    }

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

// TODO it would be pretty cool to get the canister id from DNS records
// TODO seems we would have to call some service that can query DNS
function getCanisterId(input: RequestInfo | URL): string {
    if (typeof import.meta.env.IC_ORIGIN_CANISTER_ID === 'string') {
        return import.meta.env.IC_ORIGIN_CANISTER_ID;
    }

    if (typeof input === 'string') {
        return new URL(input).hostname.split('.')[0];
    }

    if (input instanceof URL) {
        return input.hostname.split('.')[0];
    }

    if (input instanceof Request) {
        return getCanisterId(input.url);
    }

    throw new Error(
        `fetchIc: canister id could not be obtained from URL or IC_ORIGIN_CANISTER_ID environment variable`
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
