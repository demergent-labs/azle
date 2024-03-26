import { Actor, ActorMethod, ActorSubclass } from '@dfinity/agent';
import { createAuthenticatedAgent } from '../../../dfx';

export async function createActor(
    canisterId: string
): Promise<ActorSubclass<_SERVICE>> {
    const agent = await createAuthenticatedAgent();

    return Actor.createActor<_SERVICE>(
        ({ IDL }) => {
            return IDL.Service({
                clear_file_and_info: IDL.Func([IDL.Text], [], []),
                get_file_hash: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], []),
                get_hash_status: IDL.Func(
                    [IDL.Text],
                    [IDL.Opt(IDL.Tuple(IDL.Nat64, IDL.Nat64))],
                    []
                ),
                upload_file_chunk: IDL.Func(
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

export interface _SERVICE {
    clear_file_and_info: ActorMethod<[string]>;
    get_file_hash: ActorMethod<[string], [] | [string]>;
    get_hash_status: ActorMethod<[string], [] | [[bigint, bigint]]>;
    upload_file_chunk: ActorMethod<[string, bigint, bigint, Buffer, bigint]>;
}
