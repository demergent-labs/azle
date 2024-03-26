import { Actor, ActorMethod, ActorSubclass } from '@dfinity/agent';
import { createAuthenticatedAgent } from '../../../../dfx';

export async function createClearFileAndInfoActor(
    canisterId: string
): Promise<ActorSubclass<_SERVICE>> {
    const agent = await createAuthenticatedAgent();

    return Actor.createActor<_SERVICE>(
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

export interface _SERVICE {
    clear_file_and_info: ActorMethod<[string]>;
}
