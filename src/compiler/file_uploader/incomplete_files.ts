import { Src, Dest } from '.';
import { UploaderActor } from './uploader_actor';

export async function getListOfIncompleteFiles(
    paths: [Src, Dest][],
    actor: UploaderActor
): Promise<[Src, Dest][]> {
    const filters = await Promise.all(
        paths.map(
            async ([_, destPath]): Promise<boolean> =>
                !(await hasValidHash(destPath, actor))
        )
    );
    return paths.filter((_, index) => filters[index]);
}

async function hasValidHash(
    path: string,
    actor: UploaderActor
): Promise<boolean> {
    try {
        const hashOption = await actor.get_file_hash(path);
        return hashOption.length === 1;
    } catch {
        return false;
    }
}
