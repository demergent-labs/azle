import { executeAndReplyWithCandidSerde } from '../execute_with_candid_serde';

export function preUpgrade<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext
): void {
    const index = globalThis._azleCanisterMethodsIndex++;

    globalThis._azleMethodMeta.pre_upgrade = {
        name: context.name as string,
        index
    };

    globalThis._azleCallbacks[index.toString()] = (): void => {
        executeAndReplyWithCandidSerde(
            'preUpgrade',
            [],
            originalMethod.bind(globalThis._azleCanisterClassInstance),
            [],
            undefined,
            false
        );
    };
}
