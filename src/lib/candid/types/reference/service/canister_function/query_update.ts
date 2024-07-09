import { handleUncaughtError } from '../../../../../stable/error';
import { CanisterOptions } from '.';

type QueryMethod = {
    name: string;
    composite: boolean;
    guard_name: string | undefined;
    index: number;
};

type UpdateMethod = {
    name: string;
    guard_name: string | undefined;
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
                canisterMethod.guard,
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
            createUpdateMethod(
                methodName,
                canisterMethod.guard,
                canisterMethod.index
            )
        );
}

function createQueryMethod(
    methodName: string,
    isComposite: boolean,
    guardFunction: (() => any) | undefined,
    index: number
): QueryMethod {
    return {
        name: methodName,
        composite: isComposite,
        guard_name: createGlobalGuard(guardFunction, methodName),
        index
    };
}

function createUpdateMethod(
    methodName: string,
    guardFunction: (() => any) | undefined,
    index: number
): UpdateMethod {
    return {
        name: methodName,
        guard_name: createGlobalGuard(guardFunction, methodName),
        index
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

    globalThis._azleGuardFunctions[guardName] = (): void => {
        try {
            guard();
        } catch (error) {
            handleUncaughtError(error);
        }
    };

    return guardName;
}
