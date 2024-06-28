import { ActorSubclass } from '@dfinity/agent';
import { getCanisterId } from 'azle/dfx';
import { expect, it, Test } from 'azle/test';

import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';

export function getTests(
    canister1: ActorSubclass<CANISTER1_SERVICE>,
    canister2: ActorSubclass<CANISTER2_SERVICE>
): Test {
    return () => {
        it('gets balance of account 0 via cross canister call', async () => {
            const result = await canister1.balance('0');

            expect(result).toBe(100n);
        });

        it('gets account 0 details via cross canister call', async () => {
            const result = await canister1.account({
                id: '0'
            });

            const expected = { id: '0', balance: 100n };

            expect(result).toEqual([expected]);
        });

        it('gets balance of account 1 via cross canister call', async () => {
            const result = await canister1.balance('1');

            expect(result).toBe(0n);
        });

        it('fails to get non-existent account 1 via cross canister call', async () => {
            const result = await canister1.account({
                id: '1'
            });

            expect(result).toHaveLength(0);
        });

        it('gets all accounts via cross canister call', async () => {
            const result = await canister1.accounts();

            const expected = { id: '0', balance: 100n };

            expect(result).toEqual([expected]);
        });

        it('transfers from account 0 to account 1 via cross canister call', async () => {
            const result = await canister1.transfer('0', '1', 34n);

            expect(result).toBe(34n);
        });

        it('gets updated balance of account 0 via cross canister call', async () => {
            const result = await canister1.balance('0');

            expect(result).toBe(66n);
        });

        it('gets updated account 0 details via cross canister call', async () => {
            const result = await canister1.account({
                id: '0'
            });

            const expected = { id: '0', balance: 66n };

            expect(result).toEqual([expected]);
        });

        it('gets update balance of account 1 via cross canister call', async () => {
            const result = await canister1.balance('1');

            expect(result).toBe(34n);
        });

        it('gets account 1 details after creation via cross canister call', async () => {
            const result = await canister1.account({
                id: '1'
            });

            const expected = { id: '1', balance: 34n };

            expect(result).toEqual([expected]);
        });

        it('gets all updated account details via cross canister call', async () => {
            const result = await canister1.accounts();

            const expected = [
                { id: '0', balance: 66n },
                { id: '1', balance: 34n }
            ];

            expect(result).toEqual(expected);
        });

        it('propagates traps across cross canister calls', async () => {
            const canister1Id = getCanisterId('canister1');
            const canister2Id = getCanisterId('canister2');
            const partialErrorMessage = new RegExp(
                `Error from Canister ${canister1Id}: Canister trapped explicitly: Uncaught Error: Rejection code 5, IC0503: Error from Canister ${canister2Id}: Canister trapped explicitly: hahahaha`
            );

            await expect(canister1.trap()).rejects.toThrow(partialErrorMessage);
        });

        it('gets no notifications from canister2 before any are sent', async () => {
            const result = await canister2.getNotification();

            expect(result).toBe('');
        });

        it('sends a notification to canister 2 via cross canister call', async () => {
            const result = await canister1.sendNotification();

            expect(result).toBeUndefined();
        });

        it('gets sent notification from canister 2', async () => {
            const result = await canister2.getNotification();

            expect(result).toBe('This is the notification');
        });
    };
}
