import { Actor, ActorMethod, ActorSubclass } from '@dfinity/agent';

import { createAuthenticatedAgent } from '../../../../../../dfx';

export type UploaderActor = ActorSubclass<_SERVICE>;

export async function createActor(
    canisterId: string,
    identityName: string
): Promise<UploaderActor> {
    const agent = await createAuthenticatedAgent(identityName);

    return Actor.createActor<_SERVICE>(
        ({ IDL }) => {
            return IDL.Service({
                _azle_clear_file_and_info: IDL.Func([IDL.Text], [], []),
                _azle_get_file_hash: IDL.Func(
                    [IDL.Text],
                    [IDL.Opt(IDL.Text)],
                    []
                ),
                _azle_upload_file_chunk: IDL.Func(
                    [
                        IDL.Text,
                        IDL.Nat64,
                        IDL.Nat64,
                        IDL.Vec(IDL.Nat8),
                        IDL.Nat64
                    ],
                    [],
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

interface _SERVICE {
    _azle_clear_file_and_info: ActorMethod<[string], void>;
    _azle_get_file_hash: ActorMethod<[string], [] | [string]>;
    _azle_upload_file_chunk: ActorMethod<
        [string, bigint, bigint, Uint8Array, bigint],
        void
    >;
}
