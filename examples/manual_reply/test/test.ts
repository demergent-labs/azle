// TODO test records and variants and other types

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
            const rejectionMessage = 'reject';
            try {
                await manual_reply_canister.manual_query(rejectionMessage);

                return {
                    ok: false
                };
            } catch (error) {
                return {
                    ok:
                        (error as any).props.Code === 'CanisterReject' &&
                        (error as any).props.Message === rejectionMessage
                };
            }
        }
    },
    {
        name: 'manual_query when calling ic.reply',
        test: async () => {
            const result = await manual_reply_canister.manual_query('accept');

            return {
                ok: result === 'accept'
            };
        }
    },
    {
        name: 'manual_update when calling ic.reject',
        test: async () => {
            const rejectionMessage = 'reject';
            try {
                await manual_reply_canister.manual_update(rejectionMessage);

                return {
                    ok: false
                };
            } catch (error) {
                return {
                    ok:
                        (error as Error).message.includes('Reject code: 4') &&
                        (error as Error).message.includes(
                            `Reject text: ${rejectionMessage}`
                        )
                };
            }
        }
    },
    {
        name: 'manual_update when calling ic.reply',
        test: async () => {
            const result = await manual_reply_canister.manual_update('accept');

            return {
                ok: result === 'accept'
            };
        }
    }
];

run_tests(tests);
