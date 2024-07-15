// TODO inspect message can read the arguments of the call
// TODO but it applies to all query and update calls
// TODO the Rust CDK allows you to define parameters
// TODO but it will break all of your other methods
// TODO so do we just leave params out?

import { executeAndReplyWithCandidSerde } from './execute_with_candid_serde';

export function inspectMessage<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext
): void {
    const index = globalThis._azleCanisterMethodsIndex++;

    globalThis._azleCanisterMethods.inspect_message = {
        name: context.name as string,
        index
    };

    globalThis._azleCanisterMethods.callbacks[index.toString()] = (
        ...args: any[]
    ): void => {
        executeAndReplyWithCandidSerde(
            'inspectMessage',
            args,
            originalMethod.bind(globalThis._azleCanisterClassInstance),
            [],
            undefined,
            false
        );
    };
}
