import { ic } from './ic';
import { GuardResult, IDL } from './index';

export function createGlobalGuard(
    guard: (() => GuardResult) | undefined,
    functionName: string
): string | undefined {
    if (guard === undefined) {
        return undefined;
    }

    const guardName = `_azleGuard_${functionName}`;

    (globalThis as any)[guardName] = guard;

    return guardName;
}
