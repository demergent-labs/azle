import { executeAndReplyWithCandidSerde } from '../execute_with_candid_serde';

export function preUpgrade<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext
): void {
    const index = globalThis._azleCanisterMethodsIndex++;
    const name = context.name as string;
    const indexString = index.toString();

    globalThis._azleMethodMeta.pre_upgrade = {
        name,
        index
    };

    globalThis._azleCallbacks[indexString] = async (): Promise<void> => {
        await executeAndReplyWithCandidSerde(
            'preUpgrade',
            [],
            originalMethod.bind(globalThis._azleCanisterClassInstance),
            [],
            undefined,
            false
        );
    };
}
