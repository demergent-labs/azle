import { CanisterMethods } from './utils/types';
import {
    DEFAULT_VISITOR_DATA,
    DidResultToCandidString,
    DidVisitor
} from '../lib_new/visitors/did_visitor';

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

    const candidInfo = (sandbox.exports as any).canisterMethods
        .getIDL([])
        .accept(new DidVisitor(), {
            ...DEFAULT_VISITOR_DATA,
            isFirstService: true
        });

    return {
        candid: DidResultToCandidString(candidInfo),
        canisterMethods: (sandbox.exports as any).canisterMethods
    };
}
