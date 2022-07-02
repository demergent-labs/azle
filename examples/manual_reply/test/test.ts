// TODO test records and variants and other types

import { cleanDeploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/manual_reply';
import { Element } from './dfx_generated/manual_reply/manual_reply.did';

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
    },
    {
        name: 'reply with blob',
        test: async () => {
            const result = await manual_reply_canister.reply_blob();
            const expectedResult = [83, 117, 114, 112, 114, 105, 115, 101, 33];

            return {
                ok:
                    Array.isArray(result) &&
                    result.every((byte, i) => byte === expectedResult[i])
            };
        }
    },
    {
        name: 'reply with float32',
        test: async () => {
            const result = await manual_reply_canister.reply_float32();

            return {
                ok: result === 1245.677978515625 // TODO: This should not be changing
            };
        }
    },
    {
        name: 'reply with int8',
        test: async () => {
            const result = await manual_reply_canister.reply_int8();

            return {
                ok: result === -100
            };
        }
    },
    {
        name: 'reply with nat',
        test: async () => {
            const result = await manual_reply_canister.reply_nat();

            return {
                ok: result === 184467440737095516150n
            };
        }
    },
    {
        name: 'reply with string',
        test: async () => {
            const result = await manual_reply_canister.reply_string();

            return {
                ok: result === 'hello'
            };
        }
    },
    {
        name: 'reply with record',
        test: async () => {
            const result = await manual_reply_canister.reply_record();
            const expectedResult: Element = {
                id: 'b0283eb7-9c0e-41e5-8089-3345e6a8fa6a',
                orbitals: [
                    {
                        electrons: 2,
                        layer: 1
                    },
                    {
                        electrons: 8,
                        layer: 2
                    }
                ],
                state: {
                    Gas: { Elemental: null }
                }
            };

            return {
                ok: JSON.stringify(result) === JSON.stringify(expectedResult)
            };
        }
    },
    {
        name: 'reply with reserved',
        test: async () => {
            const result = await manual_reply_canister.reply_reserved();

            return {
                ok: result === null
            };
        }
    },
    {
        name: 'reply with variant',
        test: async () => {
            const result = await manual_reply_canister.reply_variant();

            return {
                ok: 'Toxic' in result
            };
        }
    }
];

run_tests(tests);
