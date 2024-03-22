import { ActorSubclass, Actor } from '@dfinity/agent';
import { Src, Dest } from '.';
import { createAgent } from '../../../dfx';

export async function getListOfIncompleteFiles(
    paths: [Src, Dest][],
    canisterId: string
): Promise<[Src, Dest][]> {
    const filters = await Promise.all(
        paths.map(async ([_, destPath]) => {
            try {
                let hashActor = await createGetFileHashActor(canisterId);
                const result = (await hashActor.get_file_hash(destPath)) as
                    | []
                    | [string];
                return result.length === 0;
            } catch {
                return true;
            }
        })
    );
    return paths.filter((_, index) => filters[index]);
}

async function createGetFileHashActor(
    canisterId: string
): Promise<ActorSubclass> {
    const agent = await createAgent();

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
