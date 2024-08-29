import '../../../../../experimental';

import { CanisterOptions } from '.';

type QueryMethod = {
    name: string;
    composite: boolean;
    index: number;
};

type UpdateMethod = {
    name: string;
    index: number;
};

export function createQueryMethods(
    canisterOptions: CanisterOptions
): QueryMethod[] {
    return Object.entries(canisterOptions)
        .filter(([_name, canisterMethod]) => canisterMethod.mode === 'query')
        .map(([methodName, canisterMethod]) =>
            createQueryMethod(
                methodName,
                canisterMethod.async,
                canisterMethod.index
            )
        );
}

export function createUpdateMethods(
    canisterOptions: CanisterOptions
): UpdateMethod[] {
    return Object.entries(canisterOptions)
        .filter(([_name, canisterMethod]) => canisterMethod.mode === 'update')
        .map(([methodName, canisterMethod]) =>
            createUpdateMethod(methodName, canisterMethod.index)
        );
}

function createQueryMethod(
    methodName: string,
    isComposite: boolean,
    index: number
): QueryMethod {
    return {
        name: methodName,
        composite: isComposite,
        index
    };
}

function createUpdateMethod(methodName: string, index: number): UpdateMethod {
    return {
        name: methodName,
        index
    };
}
