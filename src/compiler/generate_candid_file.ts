import { writeFileSync } from 'fs';

export function generateCandidFile(mainJs: string, candidPath: string) {
    // TODO probably a very bad idea
    // TODO move into its own process or something
    // TODO sufficient for prototyping
    eval(mainJs);

    writeFileSync(candidPath, globalThis._azleCandidService);
}
