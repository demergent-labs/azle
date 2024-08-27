import { filterAsync } from '../../../utils/filter_async';
import { Dest, Src } from '.';
import { UploaderActor } from './uploader_actor';

export async function getListOfIncompleteFiles(
    paths: [Src, Dest][],
    actor: UploaderActor
): Promise<[Src, Dest][]> {
    return filterAsync(
        paths,
        async ([_, path]) => !(await hasValidHash(path, actor))
    );
}

async function hasValidHash(
    path: string,
    actor: UploaderActor
): Promise<boolean> {
    try {
        const hashOption = await actor._azle_get_file_hash(path);
        return hashOption.length === 1;
    } catch {
        return false;
    }
}
