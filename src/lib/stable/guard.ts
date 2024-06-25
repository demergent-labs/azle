import { handleUncaughtError } from './error';

// TODO guards can be asynchronous right? At least update guards
// TODO query guards should be able to be composite as well
// TODO seems like in ic-cdk they cannot be asynchronous
// TODO but seems like ICP would allow them to be
export function createGlobalGuard(
    guard: (() => any) | undefined,
    guardedMethodName: string
): string | undefined {
    if (guard === undefined) {
        return undefined;
    }

    const guardName = `_azleGuard_${guardedMethodName}`;

    globalThis._azleGuardFunctions[guardName] = () => {
        try {
            guard();
        } catch (error) {
            handleUncaughtError(error);
        }
    };

    return guardName;
}
