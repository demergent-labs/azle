import { ActorSubclass } from '@dfinity/agent';
import { Src, Dest } from '.';
import { _SERVICE, createActor } from './uploader_actor';

export async function getListOfIncompleteFiles(
    paths: [Src, Dest][],
    canisterId: string
): Promise<[Src, Dest][]> {
    const hashActor = await createActor(canisterId);
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
    actor: ActorSubclass<_SERVICE>
): Promise<boolean> {
    try {
        const hashOption = await actor.get_file_hash(path);
        return hashOption.length === 1;
    } catch {
        return false;
    }
}
