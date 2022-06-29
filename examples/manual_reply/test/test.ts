import { cleanDeploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/manual_reply';

const manual_reply_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...cleanDeploy('manual_reply'),
    {
        name: 'manual_query when calling ic.reject',
        test: async () => {
            try {
                const result = await manual_reply_canister.manual_query(
                    'reject'
                );

                return {
                    ok: false
                };
            } catch (error) {
                return {
                    ok: (error as any).props.Code === 'CanisterReject'
                };
            }
        }
    },
    {
        name: 'manual_query when calling ic.reply',
        test: async () => {
            // TODO: Once ic.reply is implemented this shouldn't throw
            try {
                const result = await manual_reply_canister.manual_query(
                    'accept'
                );

                return {
                    ok: false
                };
            } catch (error) {
                return {
                    ok: (error as any).props.Code === 'CanisterError'
                };
            }
        }
    }
];

run_tests(tests);
