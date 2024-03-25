import { Actor, ActorSubclass } from '@dfinity/agent';
import { createAuthenticatedAgent } from '../../../dfx';

export async function createClearFileAndInfoActor(
    canisterId: string
): Promise<ActorSubclass> {
    const agent = await createAuthenticatedAgent();

    return Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                clear_file_and_info: IDL.Func([IDL.Text], [], [])
            });
        },
        {
            agent,
            canisterId
        }
    );
}
