import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/manual_reply';
import { Element } from './dfx_generated/manual_reply/manual_reply.did';
import { execSync } from 'child_process';

const manual_reply_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('manual_reply'),
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
        name: 'update reply with blob',
        test: async () => {
            const result = await manual_reply_canister.update_blob();
            const expectedResult = [83, 117, 114, 112, 114, 105, 115, 101, 33];

            return {
                ok:
                    Array.isArray(result) &&
                    result.every((byte, i) => byte === expectedResult[i])
            };
        }
    },
    {
        name: 'update reply with float32',
        test: async () => {
            // const result = await manual_reply_canister.update_float32();
            // Note: The JS agent doesn't handle floats correctly.
            // See https://github.com/dfinity/agent-js/issues/589
            const result = execSync(
                'dfx canister call manual_reply update_float32'
            )
                .toString()
                .trim();

            return {
                ok: result === '(1245.678 : float32)'
            };
        }
    },
    {
        name: 'update reply with int8',
        test: async () => {
            const result = await manual_reply_canister.update_int8();

            return {
                ok: result === -100
            };
        }
    },
    {
        name: 'update reply with nat',
        test: async () => {
            const result = await manual_reply_canister.update_nat();

            return {
                ok: result === 184467440737095516150n
            };
        }
    },
    {
        name: 'update reply with null',
        test: async () => {
            const result = await manual_reply_canister.update_null();

            return {
                ok: result === null
            };
        }
    },
    {
        name: 'update reply with record',
        test: async () => {
            const result = await manual_reply_canister.update_record();
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
        name: 'update reply with reserved',
        test: async () => {
            const result = await manual_reply_canister.update_reserved();

            return {
                ok: result === null
            };
        }
    },
    {
        name: 'update reply with string',
        test: async () => {
            const result = await manual_reply_canister.update_string();

            return {
                ok: result === 'hello'
            };
        }
    },
    {
        name: 'update reply with variant',
        test: async () => {
            const result = await manual_reply_canister.update_variant();

            return {
                ok: 'Toxic' in result
            };
        }
    },
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
        name: 'query reply with blob',
        test: async () => {
            const result = await manual_reply_canister.query_blob();
            const expectedResult = [83, 117, 114, 112, 114, 105, 115, 101, 33];

            return {
                ok:
                    Array.isArray(result) &&
                    result.every((byte, i) => byte === expectedResult[i])
            };
        }
    },
    {
        name: 'query reply with float32',
        test: async () => {
            // const result = await manual_reply_canister.update_float32();
            // Note: The JS agent doesn't handle floats correctly.
            // See https://github.com/dfinity/agent-js/issues/589
            const result = execSync(
                'dfx canister call manual_reply query_float32'
            )
                .toString()
                .trim();

            return {
                ok: result === '(1245.678 : float32)'
            };
        }
    },
    {
        name: 'query reply with int8',
        test: async () => {
            const result = await manual_reply_canister.query_int8();

            return {
                ok: result === -100
            };
        }
    },
    {
        name: 'query reply with nat',
        test: async () => {
            const result = await manual_reply_canister.query_nat();

            return {
                ok: result === 184467440737095516150n
            };
        }
    },
    {
        name: 'query reply with null',
        test: async () => {
            const result = await manual_reply_canister.query_null();

            return {
                ok: result === null
            };
        }
    },
    {
        name: 'query reply with record',
        test: async () => {
            const result = await manual_reply_canister.query_record();
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
        name: 'query reply with reserved',
        test: async () => {
            const result = await manual_reply_canister.query_reserved();

            return {
                ok: result === null
            };
        }
    },
    {
        name: 'query reply with string',
        test: async () => {
            const result = await manual_reply_canister.query_string();

            return {
                ok: result === 'hello'
            };
        }
    },
    {
        name: 'query reply with variant',
        test: async () => {
            const result = await manual_reply_canister.query_variant();

            return {
                ok: 'Toxic' in result
            };
        }
    },
    {
        name: 'reply_raw',
        test: async () => {
            const record = await manual_reply_canister.reply_raw();
            const blob = 'Surprise!'
                .split('')
                .map((char) => char.charCodeAt(0));

            return {
                ok:
                    record.int === 42n &&
                    record.text === 'text' &&
                    record.bool === true &&
                    record.blob.every((byte, index) => blob[index] === byte) &&
                    'Medium' in record.variant
            };
        }
    }
];

run_tests(tests);
