import { Actor, ActorSubclass } from '@dfinity/agent';
import { Src, Dest } from '.';
import { getListOfIncompleteFiles } from './incomplete_files';
import { createAuthenticatedAgent } from '../../../dfx';

export function onExit(canisterId: string, paths: [Src, Dest][]) {
    process.on('exit', async (_code) => {
        const incompleteFiles = await getListOfIncompleteFiles(
            paths,
            canisterId
        );
        for (const [_, path] of incompleteFiles) {
            const actor = await createClearFileAndInfoActor(canisterId);
            await actor.clear_file_and_info(path);
        }
    });
}

async function createClearFileAndInfoActor(
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
