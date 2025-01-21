import { getCanisterId } from 'azle/dfx';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';

type Canisters = {
    canister1: CANISTER1_SERVICE;
    canister2: CANISTER2_SERVICE;
};

export function getTests(): Test {
    return () => {
        it<Pick<Canisters, 'canister1'>>('gets balance of account 0', async ({
            canister1
        }) => {
            const result = await canister1.balance('0');
            expect(result).toBe(100n);
        });

        it<Pick<Canisters, 'canister1'>>('gets account 0 details', async ({
            canister1
        }) => {
            const result = await canister1.account({
                id: '0'
            });

            const expected = { id: '0', balance: 100n };
            expect(result).toEqual([expected]);
        });

        it<Pick<Canisters, 'canister1'>>('gets balance of account 1', async ({
            canister1
        }) => {
            const result = await canister1.balance('1');

            expect(result).toBe(0n);
        });

        it<
            Pick<Canisters, 'canister1'>
        >('fails to get non-existent account 1', async ({ canister1 }) => {
            const result = await canister1.account({
                id: '1'
            });

            expect(result).toHaveLength(0);
        });

        it<Pick<Canisters, 'canister1'>>('gets all accounts', async ({
            canister1
        }) => {
            const result = await canister1.accounts();

            const expected = { id: '0', balance: 100n };

            expect(result).toEqual([expected]);
        });

        it<
            Pick<Canisters, 'canister1'>
        >('transfers from account 0 to account 1', async ({ canister1 }) => {
            const result = await canister1.transfer('0', '1', 34n);

            expect(result).toBe(34n);
        });

        it<
            Pick<Canisters, 'canister1'>
        >('gets updated balance of account 0', async ({ canister1 }) => {
            const result = await canister1.balance('0');

            expect(result).toBe(66n);
        });

        it<
            Pick<Canisters, 'canister1'>
        >('gets updated account 0 details', async ({ canister1 }) => {
            const result = await canister1.account({
                id: '0'
            });

            const expected = { id: '0', balance: 66n };

            expect(result).toEqual([expected]);
        });

        it<
            Pick<Canisters, 'canister1'>
        >('gets update balance of account 1', async ({ canister1 }) => {
            const result = await canister1.balance('1');

            expect(result).toBe(34n);
        });

        it<
            Pick<Canisters, 'canister1'>
        >('gets account 1 details after creation', async ({ canister1 }) => {
            const result = await canister1.account({
                id: '1'
            });

            const expected = { id: '1', balance: 34n };

            expect(result).toEqual([expected]);
        });

        it<
            Pick<Canisters, 'canister1'>
        >('gets all updated account details', async ({ canister1 }) => {
            const result = await canister1.accounts();

            const expected = [
                { id: '0', balance: 66n },
                { id: '1', balance: 34n }
            ];

            expect(result).toEqual(expected);
        });

        it<
            Pick<Canisters, 'canister1'>
        >('propagates traps across cross canister calls', async ({
            canister1
        }) => {
            const canister1Id = getCanisterId('canister1');
            const canister2Id = getCanisterId('canister2');
            const partialErrorMessage = new RegExp(
                `Error from Canister ${canister1Id}: Canister called \`ic0.trap\` with message: Uncaught Error: Rejection code 5, IC0503: Error from Canister ${canister2Id}: Canister called \`ic0.trap\` with message: hahahaha`
            );

            await expect(canister1.trap()).rejects.toThrow(partialErrorMessage);
        });

        it<
            Pick<Canisters, 'canister2'>
        >('gets no notifications from canister2 before any are sent', async ({
            canister2
        }) => {
            const result = await canister2.getNotification();

            expect(result).toBe('');
        });

        it<
            Pick<Canisters, 'canister1'>
        >('sends a notification to canister 2', async ({ canister1 }) => {
            const result = await canister1.sendNotification();

            expect(result).toBeUndefined();
        });

        it<
            Pick<Canisters, 'canister2'>
        >('gets sent notification from canister 2', async ({ canister2 }) => {
            const result = await canister2.getNotification();

            expect(result).toBe('This is the notification');
        });

        it<Canisters>('sends and receives notification', async ({
            canister1,
            canister2
        }) => {
            await canister1.sendNotification();
            const result = await canister2.getNotification();
            expect(result).toBe('This is the notification');
        });

        it<
            Pick<Canisters, 'canister2'>
        >('gets notification from canister2', async ({ canister2 }) => {
            const result = await canister2.getNotification();
            expect(result).toBe('This is the notification');
        });
    };
}
