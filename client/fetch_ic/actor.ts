import { Actor, Identity } from '@dfinity/agent';

import { getAgent } from './agent';

export async function createActor(
    identity: Identity,
    input: RequestInfo | URL
) {
    const agent = await getAgent(identity);
    const canisterId = getCanisterId(input);

    if (canisterId === undefined) {
        throw new Error(
            `The canister id could not be determined from the fetch input argument`
        );
    }

    return Actor.createActor(
        ({ IDL }) => {
            const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);

            const HttpRequest = IDL.Record({
                method: IDL.Text,
                url: IDL.Text,
                headers: IDL.Vec(HeaderField),
                body: IDL.Vec(IDL.Nat8),
                certificate_version: IDL.Opt(IDL.Nat16) // TODO do we need to allow the user to set this
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

function getCanisterId(input: RequestInfo | URL): string | undefined {
    // TODO this should solve the case of using a custo domain scheme
    if (typeof import.meta.env.VITE_ORIGIN_CANISTER_ID === 'string') {
        return import.meta.env.VITE_ORIGIN_CANISTER_ID;
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

    return undefined;
}
