import { writeFileSync } from 'fs';

export function generateCandidFile(mainJs: string, candidPath: string) {
    const vm = require('vm');

    const sandbox = {
        globalThis: {},
        exports: {},
        console,
        TextDecoder,
        TextEncoder
    };
    const context = new vm.createContext(sandbox);

    const script = new vm.Script(mainJs);
    script.runInContext(context);

    writeFileSync(candidPath, (sandbox.globalThis as any)._azleCandidService);
}
