import { CanisterOptions } from '.';

type QueryMethod = {
    name: string;
    composite: boolean;
    guard_name: string | undefined;
};

type UpdateMethod = {
    name: string;
    guard_name: string | undefined;
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
                canisterMethod.guard
            )
        );
}

export function createUpdateMethods(
    canisterOptions: CanisterOptions
): UpdateMethod[] {
    return Object.entries(canisterOptions)
        .filter(([_name, canisterMethod]) => canisterMethod.mode === 'update')
        .map(([methodName, canisterMethod]) =>
            createUpdateMethod(methodName, canisterMethod.guard)
        );
}

function createQueryMethod(
    methodName: string,
    isComposite: boolean,
    guardFunction: (() => any) | undefined
): QueryMethod {
    return {
        name: methodName,
        composite: isComposite,
        guard_name: createGlobalGuard(guardFunction, methodName)
    };
}

function createUpdateMethod(
    methodName: string,
    guardFunction: (() => any) | undefined
): UpdateMethod {
    return {
        name: methodName,
        guard_name: createGlobalGuard(guardFunction, methodName)
    };
}

function createGlobalGuard(
    guard: (() => any) | undefined,
    guardedMethodName: string
): string | undefined {
    if (guard === undefined) {
        return undefined;
    }

    const guardName = `_azleGuard_${guardedMethodName}`;

    globalThis._azleGuardFunctions[guardName] = guard;

    return guardName;
}
