import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/inspect_message';

const inspect_message_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('inspect_message'),
    {
        name: 'calling `ic.accept_message` in inspectMessage',
        test: async () => {
            try {
                const result = await inspect_message_canister.accessible();
                return {
                    ok: result === true
                };
            } catch (error) {
                console.error(error);
                return {
                    ok: false
                };
            }
        }
    },
    {
        name: 'not calling `ic.accept_message` in inspectMessage',
        test: async () => {
            try {
                const result = await inspect_message_canister.inaccessible();
                return {
                    ok: false
                };
            } catch (error) {
                return {
                    ok: ((error as any).message as string).includes('Code: 403')
                };
            }
        }
    },
    {
        name: 'throwing in `inspectMessage`',
        test: async () => {
            try {
                const result =
                    await inspect_message_canister.alsoInaccessible();

                return {
                    ok: false
                };
            } catch (error) {
                return {
                    ok: ((error as any).message as string).includes('Code: 500')
                };
            }
        }
    }
];

run_tests(tests);
