import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/manual_reply/manual_reply.did';

export function getTests(manualReplyCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('manualUpdate when calling ic.reject', async () => {
            const rejectionMessage = 'reject';
            const expectedErrorMessage = new RegExp(
                `Call was rejected:\\s*Request ID: [a-f0-9]{64}\\s*Reject code: 4\\s*Reject text: ${rejectionMessage}`
            );
            await expect(
                manualReplyCanister.manualUpdate(rejectionMessage)
            ).rejects.toThrow(expectedErrorMessage);
        });

        it('manualUpdate when calling ic.reply', async () => {
            const result = await manualReplyCanister.manualUpdate('accept');

            expect(result).toBe('accept');
        });

        it('update reply with blob', async () => {
            const result = await manualReplyCanister.updateBlob();
            const expectedResult = new Uint8Array([
                83, 117, 114, 112, 114, 105, 115, 101, 33
            ]);

            expect(result).toStrictEqual(expectedResult);
        });

        it('update reply with float32', async () => {
            const result = await manualReplyCanister.updateFloat32();

            expect(result.toString()).toBe('1245.677978515625');
        });

        it('update reply with int8', async () => {
            const result = await manualReplyCanister.updateInt8();

            expect(result).toBe(-100);
        });

        it('update reply with nat', async () => {
            const result = await manualReplyCanister.updateNat();

            expect(result).toBe(184_467_440_737_095_516_150n);
        });

        it('update reply with null', async () => {
            const result = await manualReplyCanister.updateNull();

            expect(result).toBeNull();
        });

        it('update reply with void', async () => {
            const result = await manualReplyCanister.updateVoid();

            expect(result).toBeUndefined();
        });

        it('update reply with record', async () => {
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

            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
        });

        it('update reply with reserved', async () => {
            const result = await manualReplyCanister.updateReserved();

            expect(result).toBeNull();
        });

        it('update reply with string', async () => {
            const result = await manualReplyCanister.updateString();

            expect(result).toBe('hello');
        });

        it('update reply with variant', async () => {
            const result = await manualReplyCanister.updateVariant();

            expect(result).toStrictEqual({ Toxic: null });
        });

        it('manualQuery when calling ic.reject', async () => {
            const rejectionMessage = 'reject';
            await expect(
                manualReplyCanister.manualQuery(rejectionMessage)
            ).rejects.toMatchObject({
                props: {
                    Code: 'CanisterReject',
                    Message: rejectionMessage
                }
            });
        });

        it('manualQuery when calling ic.reply', async () => {
            const result = await manualReplyCanister.manualQuery('accept');

            expect(result).toBe('accept');
        });

        it('query reply with blob', async () => {
            const result = await manualReplyCanister.queryBlob();
            const expectedResult = new Uint8Array([
                83, 117, 114, 112, 114, 105, 115, 101, 33
            ]);

            expect(result).toStrictEqual(expectedResult);
        });

        it('query reply with float32', async () => {
            const result = await manualReplyCanister.updateFloat32();

            expect(result.toString()).toBe('1245.677978515625');
        });

        it('query reply with int8', async () => {
            const result = await manualReplyCanister.queryInt8();

            expect(result).toBe(-100);
        });

        it('query reply with nat', async () => {
            const result = await manualReplyCanister.queryNat();

            expect(result).toBe(184_467_440_737_095_516_150n);
        });

        it('query reply with null', async () => {
            const result = await manualReplyCanister.queryNull();

            expect(result).toBeNull();
        });

        it('query reply with void', async () => {
            const result = await manualReplyCanister.queryVoid();

            expect(result).toBeUndefined();
        });

        it('query reply with record', async () => {
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

            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
        });

        it('query reply with reserved', async () => {
            const result = await manualReplyCanister.queryReserved();

            expect(result).toBeNull();
        });

        it('query reply with string', async () => {
            const result = await manualReplyCanister.queryString();

            expect(result).toBe('hello');
        });

        it('query reply with variant', async () => {
            const result = await manualReplyCanister.queryVariant();

            expect(result).toStrictEqual({ Toxic: null });
        });

        it('replyRaw', async () => {
            const record = await manualReplyCanister.replyRaw();
            const blob = 'Surprise!'
                .split('')
                .map((char) => char.charCodeAt(0));

            const expected = {
                int: 42n,
                text: 'text',
                bool: true,
                myBlob: new Uint8Array(blob),
                myVariant: { Medium: null }
            };

            expect(record).toStrictEqual(expected);
        });
    };
}
