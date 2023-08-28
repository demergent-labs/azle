import { resolveRuntimeType, ReflectionKind } from '@deepkit/type';
import { IDL } from '@dfinity/candid';
import { ic } from './ic';

export function exportCanisterMethods(mainModuleImports: any[]) {
    for (const [key, value] of Object.entries(mainModuleImports)) {
        console.log(key);

        if (globalThis._azleCanisterMethodMeta) {
            const type = resolveRuntimeType(value);

            console.log(stringifyCircular(type));

            globalThis._azleCanisterMethods[key] = (...args: any[]) => {
                const paramsIdls = type.parameters.map((parameter) =>
                    getIdl(parameter.type.kind)
                );

                const returnIdl = getIdl(type.return.kind);

                console.log(`before decoding: ${ic.instructionCounter()}`);

                const decoded = IDL.decode(paramsIdls, args[0]);

                console.log(`after decoding: ${ic.instructionCounter()}`);

                const result = value(...decoded);
                const encodeReadyResult = result === undefined ? [] : [result];

                console.log(`after execution: ${ic.instructionCounter()}`);

                const encodedResult = new Uint8Array(
                    IDL.encode([returnIdl], encodeReadyResult)
                ).buffer;

                console.log(`after encoding: ${ic.instructionCounter()}`);

                return encodedResult;
            };
        }
    }
}

function getIdl(kind: number): IDL.Type {
    console.log('kind', kind);

    if (kind === ReflectionKind.string) {
        return IDL.Text;
    }

    throw new Error('This type is not supported');
}

function stringifyCircular(obj) {
    const seen = new Set();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return; // or you could replace with some string, e.g., "[Circular]"
            }
            seen.add(value);
        }
        return value;
    });
}
