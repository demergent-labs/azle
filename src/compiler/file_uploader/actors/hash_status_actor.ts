import { Actor, ActorMethod, ActorSubclass } from '@dfinity/agent';
import { createAuthenticatedAgent } from '../../../../dfx';

export async function createActor(
    canisterId: string
): Promise<ActorSubclass<_SERVICE>> {
    const agent = await createAuthenticatedAgent();

    return Actor.createActor<_SERVICE>(
        ({ IDL }) => {
            return IDL.Service({
                get_file_hash: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], []),
                get_hash_status: IDL.Func(
                    [IDL.Text],
                    [IDL.Opt(IDL.Tuple(IDL.Nat64, IDL.Nat64))],
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
    get_file_hash: ActorMethod<[string], [] | [string]>;
    get_hash_status: ActorMethod<[string], [] | [[bigint, bigint]]>;
}
