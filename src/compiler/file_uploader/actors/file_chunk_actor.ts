import { Actor, ActorMethod, ActorSubclass } from '@dfinity/agent';
import { createAuthenticatedAgent } from '../../../../dfx';

export async function createActor(
    canisterId: string
): Promise<ActorSubclass<_SERVICE>> {
    const agent = await createAuthenticatedAgent();

    return Actor.createActor<_SERVICE>(
        ({ IDL }) => {
            return IDL.Service({
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
    upload_file_chunk: ActorMethod<[string, bigint, bigint, Buffer, bigint]>;
}
