import { getCanisterId } from 'azle/dfx';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';

export function getTests(): Test {
    return () => {
        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets balance of account 0 via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.balance('0');

            expect(result).toBe(100n);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets account 0 details via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.account({
                id: '0'
            });

            const expected = { id: '0', balance: 100n };

            expect(result).toEqual([expected]);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets balance of account 1 via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.balance('1');

            expect(result).toBe(0n);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('fails to get non-existent account 1 via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.account({
                id: '1'
            });

            expect(result).toHaveLength(0);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets all accounts via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.accounts();

            const expected = { id: '0', balance: 100n };

            expect(result).toEqual([expected]);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('transfers from account 0 to account 1 via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.transfer('0', '1', 34n);

            expect(result).toBe(34n);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets updated balance of account 0 via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.balance('0');

            expect(result).toBe(66n);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets updated account 0 details via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.account({
                id: '0'
            });

            const expected = { id: '0', balance: 66n };

            expect(result).toEqual([expected]);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets update balance of account 1 via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.balance('1');

            expect(result).toBe(34n);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets account 1 details after creation via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.account({
                id: '1'
            });

            const expected = { id: '1', balance: 34n };

            expect(result).toEqual([expected]);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets all updated account details via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.accounts();

            const expected = [
                { id: '0', balance: 66n },
                { id: '1', balance: 34n }
            ];

            expect(result).toEqual(expected);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('propagates traps across cross canister calls', async (canister1, _canister2) => {
            const canister1Id = getCanisterId('canister1');
            const canister2Id = getCanisterId('canister2');
            const partialErrorMessage = new RegExp(
                `Error from Canister ${canister1Id}: Canister called \`ic0.trap\` with message: Uncaught Error: Rejection code 5, IC0503: Error from Canister ${canister2Id}: Canister called \`ic0.trap\` with message: hahahaha`
            );

            await expect(canister1.trap()).rejects.toThrow(partialErrorMessage);
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets no notifications from canister2 before any are sent', async (_canister1, canister2) => {
            const result = await canister2.getNotification();

            expect(result).toBe('');
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('sends a notification to canister 2 via cross canister call', async (canister1, _canister2) => {
            const result = await canister1.sendNotification();

            expect(result).toBeUndefined();
        });

        it<
            [CANISTER1_SERVICE, CANISTER2_SERVICE]
        >('gets sent notification from canister 2', async (_canister1, canister2) => {
            const result = await canister2.getNotification();

            expect(result).toBe('This is the notification');
        });
    };
}
