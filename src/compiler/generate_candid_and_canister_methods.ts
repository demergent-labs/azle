import { CanisterMethods } from './utils/types';
import {
    getDefaultVisitorData,
    DidVisitor
} from '../lib/candid/did_file/visitor';
import { toDidString } from '../lib/candid/did_file';

export function generateCandidAndCanisterMethods(mainJs: string): {
    candid: string;
    canisterMethods: CanisterMethods;
} {
    const vm = require('vm');

    const sandbox = {
        globalThis: {},
        crypto: {
            getRandomValues: () => {
                let array = new Uint8Array(32);

                for (let i = 0; i < array.length; i++) {
                    array[i] = Math.floor(Math.random() * 256);
                }

                return array;
            }
        },
        exports: {},
        console,
        TextDecoder,
        TextEncoder
    };
    const context = new vm.createContext(sandbox);

    const script = new vm.Script(mainJs);
    script.runInContext(context);

    const canisterMethods = (sandbox.exports as any).canisterMethods;

    const candidInfo = canisterMethods.getIdl([]).accept(new DidVisitor(), {
        ...getDefaultVisitorData(),
        isFirstService: true,
        systemFuncs: canisterMethods.getSystemFunctionIdls()
    });

    return {
        candid: toDidString(candidInfo),
        canisterMethods: canisterMethods
    };
}
