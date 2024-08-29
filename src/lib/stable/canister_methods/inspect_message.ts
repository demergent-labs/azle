import { executeAndReplyWithCandidSerde } from '../execute_with_candid_serde';

// TODO explain here in a jsdoc that the dev can get the raw args using argDataRaw
export function inspectMessage<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext
): void {
    const index = globalThis._azleCanisterMethodsIndex++;

    globalThis._azleMethodMeta.inspect_message = {
        name: context.name as string,
        index
    };

    globalThis._azleCallbacks[index.toString()] = (): void => {
        executeAndReplyWithCandidSerde(
            'inspectMessage',
            [],
            originalMethod.bind(globalThis._azleCanisterClassInstance),
            [],
            undefined,
            false
        );
    };
}
