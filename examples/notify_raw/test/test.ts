import { deploy, ok, run_tests, Test } from 'azle/test';
import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';

const canister1 = createActorCanister1('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const canister2 = createActorCanister2('ryjl3-tyaaa-aaaaa-aaaba-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('canister1'),
    ...deploy('canister2'),
    {
        name: 'check notification before',
        test: async () => {
            const result = await canister2.get_notified();

            return {
                ok: result === false
            };
        }
    },
    {
        name: 'send notification',
        test: async () => {
            const result = await canister1.send_notification();

            await new Promise((resolve) => setTimeout(resolve, 5000));

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: true
            };
        }
    },
    {
        name: 'check notification after',
        test: async () => {
            const result = await canister2.get_notified();

            return {
                ok: result === true
            };
        }
    }
];

run_tests(tests);
