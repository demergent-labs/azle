import { ActorSubclass, Actor } from '@dfinity/agent';
import { Src, Dest } from '.';
import { createAuthenticatedAgent } from '../../../dfx';

export async function getListOfIncompleteFiles(
    paths: [Src, Dest][],
    canisterId: string
): Promise<[Src, Dest][]> {
    const hashActor = await createGetFileHashActor(canisterId);
    const filters = await Promise.all(
        paths.map(
            async ([_, destPath]): Promise<boolean> =>
                !(await hasValidHash(destPath, hashActor))
        )
    );
    return paths.filter((_, index) => filters[index]);
}

async function hasValidHash(
    path: string,
    actor: ActorSubclass
): Promise<boolean> {
    try {
        const hashOption = (await actor.get_file_hash(path)) as [] | [string];
        return hashOption.length === 1;
    } catch {
        return false;
    }
}

async function createGetFileHashActor(
    canisterId: string
): Promise<ActorSubclass> {
    const agent = await createAuthenticatedAgent();

    return Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                get_file_hash: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], [])
            });
        },
        {
            agent,
            canisterId
        }
    );
}
