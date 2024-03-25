import { Actor, ActorSubclass } from '@dfinity/agent';
import { createAuthenticatedAgent } from '../../../dfx';

export async function createActor(canisterId: string): Promise<ActorSubclass> {
    const agent = await createAuthenticatedAgent();

    return Actor.createActor(
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
