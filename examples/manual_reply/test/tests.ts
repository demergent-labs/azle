import { Test } from 'azle/test';
import {
    ManualReply,
    _SERVICE
} from './dfx_generated/manual_reply/manual_reply.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(manualReplyCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'manualUpdate when calling ic.reject',
            test: async () => {
                const rejectionMessage = 'reject';
                try {
                    await manualReplyCanister.manualUpdate(rejectionMessage);

                    return {
                        Ok: false
                    };
                } catch (error) {
                    return {
                        Ok:
                            (error as Error).message.includes(
                                'Reject code: 4'
                            ) &&
                            (error as Error).message.includes(
                                `Reject text: ${rejectionMessage}`
                            )
                    };
                }
            }
        },
        {
            name: 'manualUpdate when calling ic.reply',
            test: async () => {
                const result = await manualReplyCanister.manualUpdate('accept');

                return {
                    Ok: result === 'accept'
                };
            }
        },
        {
            name: 'update reply with blob',
            test: async () => {
                const result = await manualReplyCanister.updateBlob();
                const expectedResult = [
                    83, 117, 114, 112, 114, 105, 115, 101, 33
                ];

                return {
                    Ok: result.every((byte, i) => byte === expectedResult[i])
                };
            }
        },
        {
            name: 'update reply with float32',
            test: async () => {
                const result = await manualReplyCanister.updateFloat32();

                return {
                    Ok: result.toString() === '1245.677978515625'
                };
            }
        },
        {
            name: 'update reply with int8',
            test: async () => {
                const result = await manualReplyCanister.updateInt8();

                return {
                    Ok: result === -100
                };
            }
        },
        {
            name: 'update reply with nat',
            test: async () => {
                const result = await manualReplyCanister.updateNat();

                return {
                    Ok: result === 184_467_440_737_095_516_150n
                };
            }
        },
        {
            name: 'update reply with null',
            test: async () => {
                const result = await manualReplyCanister.updateNull();

                return {
                    Ok: result === null
                };
            }
        },
        {
            name: 'update reply with void',
            test: async () => {
                const result = await manualReplyCanister.updateVoid();

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'update reply with record',
            test: async () => {
                const result = await manualReplyCanister.updateRecord();
                const expectedResult: ManualReply = {
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
                    Ok:
                        JSON.stringify(result) ===
                        JSON.stringify(expectedResult)
                };
            }
        },
        {
            name: 'update reply with reserved',
            test: async () => {
                const result = await manualReplyCanister.updateReserved();

                return {
                    Ok: result === null
                };
            }
        },
        {
            name: 'update reply with string',
            test: async () => {
                const result = await manualReplyCanister.updateString();

                return {
                    Ok: result === 'hello'
                };
            }
        },
        {
            name: 'update reply with variant',
            test: async () => {
                const result = await manualReplyCanister.updateVariant();

                return {
                    Ok: 'Toxic' in result
                };
            }
        },
        {
            name: 'manualQuery when calling ic.reject',
            test: async () => {
                const rejectionMessage = 'reject';
                try {
                    await manualReplyCanister.manualQuery(rejectionMessage);

                    return {
                        Ok: false
                    };
                } catch (error) {
                    return {
                        Ok:
                            (error as any).props.Code === 'CanisterReject' &&
                            (error as any).props.Message === rejectionMessage
                    };
                }
            }
        },
        {
            name: 'manualQuery when calling ic.reply',
            test: async () => {
                const result = await manualReplyCanister.manualQuery('accept');

                return {
                    Ok: result === 'accept'
                };
            }
        },
        {
            name: 'query reply with blob',
            test: async () => {
                const result = await manualReplyCanister.queryBlob();
                const expectedResult = [
                    83, 117, 114, 112, 114, 105, 115, 101, 33
                ];

                return {
                    Ok: result.every((byte, i) => byte === expectedResult[i])
                };
            }
        },
        {
            name: 'query reply with float32',
            test: async () => {
                const result = await manualReplyCanister.updateFloat32();

                return {
                    Ok: result.toString() === '1245.677978515625'
                };
            }
        },
        {
            name: 'query reply with int8',
            test: async () => {
                const result = await manualReplyCanister.queryInt8();

                return {
                    Ok: result === -100
                };
            }
        },
        {
            name: 'query reply with nat',
            test: async () => {
                const result = await manualReplyCanister.queryNat();

                return {
                    Ok: result === 184_467_440_737_095_516_150n
                };
            }
        },
        {
            name: 'query reply with null',
            test: async () => {
                const result = await manualReplyCanister.queryNull();

                return {
                    Ok: result === null
                };
            }
        },
        {
            name: 'query reply with void',
            test: async () => {
                const result = await manualReplyCanister.queryVoid();

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'query reply with record',
            test: async () => {
                const result = await manualReplyCanister.queryRecord();
                const expectedResult: ManualReply = {
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
                    Ok:
                        JSON.stringify(result) ===
                        JSON.stringify(expectedResult)
                };
            }
        },
        {
            name: 'query reply with reserved',
            test: async () => {
                const result = await manualReplyCanister.queryReserved();

                return {
                    Ok: result === null
                };
            }
        },
        {
            name: 'query reply with string',
            test: async () => {
                const result = await manualReplyCanister.queryString();

                return {
                    Ok: result === 'hello'
                };
            }
        },
        {
            name: 'query reply with variant',
            test: async () => {
                const result = await manualReplyCanister.queryVariant();

                return {
                    Ok: 'Toxic' in result
                };
            }
        },
        {
            name: 'replyRaw',
            test: async () => {
                const record = await manualReplyCanister.replyRaw();
                const blob = 'Surprise!'
                    .split('')
                    .map((char) => char.charCodeAt(0));

                return {
                    Ok:
                        record.int === 42n &&
                        record.text === 'text' &&
                        record.bool === true &&
                        record.myBlob.every(
                            (byte, index) => blob[index] === byte
                        ) &&
                        'Medium' in record.myVariant
                };
            }
        }
    ];
}
