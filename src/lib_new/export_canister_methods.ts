import { resolveRuntimeType, ReflectionKind, Type } from '@deepkit/type';
// import { getType } from 'tst-reflect';
import { IDL } from '@dfinity/candid';
import { ic } from './ic';
import { IDLs } from './idls';

export function exportCanisterMethods(mainModuleImports: any[]) {
    for (const [key, value] of Object.entries(mainModuleImports)) {
        console.log(key);
        const methodMeta = globalThis._azleCanisterMethodMeta[key];
        if (methodMeta) {
            const type = resolveRuntimeType(value);
            // const type = getType(value);
            // type.getTypeParameters();
            // console.log(type.getTypeParameters());
            // console.log(type.getSignatures());
            // TODO do all of the type stuff once outside here
            console.log(stringifyCircular(type));
            // console.log(type);
            const paramsIdls = type.parameters
                .map((parameter) => getIdl(parameter.type))
                .flat();
            const returnIdl = getIdl(type.return);
            globalThis._azleCandidMethods.push(
                `${key}: (${paramsIdls
                    .map((paramIdl) => display(paramIdl))
                    .join(', ')}) -> (${returnIdl.map((returnIdl) =>
                    display(returnIdl)
                )})${modeToCandid(methodMeta)};`
            );
            globalThis._azleCanisterMethods[key] = (...args: any[]) => {
                console.log(`before decoding: ${ic.instructionCounter()}`);
                const decoded = IDL.decode(paramsIdls, args[0]);
                console.log(`after decoding: ${ic.instructionCounter()}`);
                const result = value(...decoded);
                const encodeReadyResult = result === undefined ? [] : [result];
                console.log(`after execution: ${ic.instructionCounter()}`);
                const encodedResult = new Uint8Array(
                    IDL.encode(returnIdl, encodeReadyResult)
                ).buffer;
                console.log(`after encoding: ${ic.instructionCounter()}`);
                return encodedResult;
            };
        }
    }
}

// TODO I think we still need robust imports for Azle types unfortunately
function getIdl(type: Type): IDL.Type[] {
    // console.log(type);

    if (type.kind === ReflectionKind.never) {
        return [];
    }

    if (type.kind === ReflectionKind.boolean) {
        return [IDL.Bool];
    }

    if (type.kind === ReflectionKind.number && type.typeName === undefined) {
        return [IDL.Float64];
    }

    if (type.kind === ReflectionKind.null) {
        return [IDL.Null];
    }

    if (type.kind === ReflectionKind.string) {
        return [IDL.Text];
    }

    if (type.kind === ReflectionKind.void) {
        return [];
    }

    // TODO what if the types are aliased or renamed???
    // TODO is there some kind of runtime magic we can do to avoid this?
    if (type.typeName) {
        console.log('type.typeName', type.typeName);
        // TODO handle opt
        // TODO handle func
        // TODO handle service
        // TODO handle variant
        // TODO handle record

        if (type.typeName === 'Vec') {
            if (type.typeArguments?.length !== 1) {
                throw new Error(`Vec must have one type argument`);
            }

            const typeArgument = type.typeArguments[0];
            const typeArgumentIdls = getIdl(typeArgument);

            if (typeArgumentIdls.length !== 1) {
                throw new Error(`Vec type argument is not valid`);
            }

            const typeArgumentIdl = typeArgumentIdls[0];

            return [IDL.Vec(typeArgumentIdl)];
        }

        return [IDLs[type.typeName]];
    }

    throw new Error('This type is not supported');
}

function stringifyCircular(obj: {}) {
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

function display(paramIdl: IDL.Type) {
    if (paramIdl instanceof IDL.FuncClass) {
        return `func ${paramIdl.display().replace(/→/g, '->')}`;
    }
    return paramIdl.display();
}

function modeToCandid(mode: string) {
    return {
        query: ' query',
        update: ''
    }[mode];
}
