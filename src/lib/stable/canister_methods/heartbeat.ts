import { executeAndReplyWithCandidSerde } from '../execute_with_candid_serde';

export function heartbeat<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext
): void {
    const index = globalThis._azleCanisterMethodsIndex++;

    globalThis._azleMethodMeta.heartbeat = {
        name: context.name as string,
        index
    };

    globalThis._azleCallbacks[index.toString()] = (): void => {
        executeAndReplyWithCandidSerde(
            'heartbeat',
            [],
            originalMethod.bind(globalThis._azleCanisterClassInstance),
            [],
            undefined,
            false
        );
    };
}
