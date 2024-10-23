import { executeAndReplyWithCandidSerde } from '../execute_with_candid_serde';

// TODO explain here in a jsdoc that the dev can get the raw args using argDataRaw
export function inspectMessage<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext
): void {
    const index = globalThis._azleCanisterMethodsIndex++;
    const name = context.name as string;
    const indexString = index.toString();

    globalThis._azleMethodMeta.inspect_message = {
        name,
        index
    };

    globalThis._azleCallbacks[indexString] = (): void => {
        executeAndReplyWithCandidSerde(
            'inspectMessage',
            [],
            originalMethod.bind(globalThis._azleCanisterClassInstance),
            [],
            undefined,
            false
        );
    };

    if (globalThis._azleRecordBenchmarks === true) {
        globalThis._azleCanisterMethodNames[indexString] = name;
    }
}
