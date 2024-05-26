import { ActorSubclass } from '@dfinity/agent';
import { fail, Test, test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/manual_reply/manual_reply.did';

export function getTests(manualReplyCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'manualUpdate when calling ic.reject',
            test: async () => {
                const rejectionMessage = 'reject';
                try {
                    await manualReplyCanister.manualUpdate(rejectionMessage);

                    return fail();
                } catch (error) {
                    return test(
                        (error as Error).message.includes('Reject code: 4') &&
                            (error as Error).message.includes(
                                `Reject text: ${rejectionMessage}`
                            )
                    );
                }
            }
        },
        {
            name: 'manualUpdate when calling ic.reply',
            test: async () => {
                const result = await manualReplyCanister.manualUpdate('accept');

                return testEquality(result, 'accept');
            }
        },
        {
            name: 'update reply with blob',
            test: async () => {
                const result = await manualReplyCanister.updateBlob();
                const expectedResult = [
                    83, 117, 114, 112, 114, 105, 115, 101, 33
                ];

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'update reply with float32',
            test: async () => {
                const result = await manualReplyCanister.updateFloat32();

                return testEquality(result.toString(), '1245.677978515625');
            }
        },
        {
            name: 'update reply with int8',
            test: async () => {
                const result = await manualReplyCanister.updateInt8();

                return testEquality(result, -100);
            }
        },
        {
            name: 'update reply with nat',
            test: async () => {
                const result = await manualReplyCanister.updateNat();

                return testEquality(result, 184_467_440_737_095_516_150n);
            }
        },
        {
            name: 'update reply with null',
            test: async () => {
                const result = await manualReplyCanister.updateNull();

                return testEquality(result, null);
            }
        },
        {
            name: 'update reply with void',
            test: async () => {
                const result = await manualReplyCanister.updateVoid();

                return testEquality(result, undefined);
            }
        },
        {
            name: 'update reply with record',
            test: async () => {
                const result = await manualReplyCanister.updateRecord();
                const expectedResult = {
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

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'update reply with reserved',
            test: async () => {
                const result = await manualReplyCanister.updateReserved();

                return testEquality(result, null);
            }
        },
        {
            name: 'update reply with string',
            test: async () => {
                const result = await manualReplyCanister.updateString();

                return testEquality(result, 'hello');
            }
        },
        {
            name: 'update reply with variant',
            test: async () => {
                const result = await manualReplyCanister.updateVariant();
                const expected = { Toxic: null };

                return testEquality(result, expected);
            }
        },
        {
            name: 'manualQuery when calling ic.reject',
            test: async () => {
                const rejectionMessage = 'reject';
                try {
                    await manualReplyCanister.manualQuery(rejectionMessage);

                    return fail();
                } catch (error) {
                    return testEquality(
                        [
                            (error as any).props.Code,
                            (error as any).props.Message
                        ],
                        ['CanisterReject', rejectionMessage]
                    );
                }
            }
        },
        {
            name: 'manualQuery when calling ic.reply',
            test: async () => {
                const result = await manualReplyCanister.manualQuery('accept');

                return testEquality(result, 'accept');
            }
        },
        {
            name: 'query reply with blob',
            test: async () => {
                const result = await manualReplyCanister.queryBlob();
                const expectedResult = [
                    83, 117, 114, 112, 114, 105, 115, 101, 33
                ];

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'query reply with float32',
            test: async () => {
                const result = await manualReplyCanister.updateFloat32();

                return testEquality(result.toString(), '1245.677978515625');
            }
        },
        {
            name: 'query reply with int8',
            test: async () => {
                const result = await manualReplyCanister.queryInt8();

                return testEquality(result, -100);
            }
        },
        {
            name: 'query reply with nat',
            test: async () => {
                const result = await manualReplyCanister.queryNat();

                return testEquality(result, 184_467_440_737_095_516_150n);
            }
        },
        {
            name: 'query reply with null',
            test: async () => {
                const result = await manualReplyCanister.queryNull();

                return testEquality(result, null);
            }
        },
        {
            name: 'query reply with void',
            test: async () => {
                const result = await manualReplyCanister.queryVoid();

                return testEquality(result, undefined);
            }
        },
        {
            name: 'query reply with record',
            test: async () => {
                const result = await manualReplyCanister.queryRecord();
                const expectedResult = {
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

                return testEquality(result, expectedResult);
            }
        },
        {
            name: 'query reply with reserved',
            test: async () => {
                const result = await manualReplyCanister.queryReserved();

                return testEquality(result, null);
            }
        },
        {
            name: 'query reply with string',
            test: async () => {
                const result = await manualReplyCanister.queryString();

                return testEquality(result, 'hello');
            }
        },
        {
            name: 'query reply with variant',
            test: async () => {
                const result = await manualReplyCanister.queryVariant();
                const expected = { Toxic: null };

                return testEquality(result, expected);
            }
        },
        {
            name: 'replyRaw',
            test: async () => {
                const record = await manualReplyCanister.replyRaw();
                const blob = 'Surprise!'
                    .split('')
                    .map((char) => char.charCodeAt(0));
                const expected = {
                    int: 42n,
                    text: 'text',
                    bool: true,
                    myBlob: blob,
                    myVariant: { Medium: null }
                };

                return testEquality(record, expected);
            }
        }
    ];
}
