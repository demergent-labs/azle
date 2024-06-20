import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from './dfx_generated/proxy/proxy.did';

export function getTests(proxyCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('gets icrc1 metadata', async () => {
            const expectedResult = [
                ['icrc1:name', { Text: 'Azle' }],
                ['icrc1:symbol', { Text: 'AZLE' }],
                ['icrc1:decimals', { Nat: 8n }],
                ['icrc1:fee', { Nat: 0n }]
            ];

            const result = await proxyCanister.icrc1_metadata();

            expect(result).toStrictEqual(expectedResult);
        });

        it('gets icrc1 name', async () => {
            const result = await proxyCanister.icrc1_name();

            expect(result).toBe('Azle');
        });

        it('gets icrc1 decimals', async () => {
            const result = await proxyCanister.icrc1_decimals();

            expect(result).toBe(8);
        });

        it('gets icrc1 symbol', async () => {
            const result = await proxyCanister.icrc1_symbol();

            expect(result).toBe('AZLE');
        });

        it('gets icrc1 fee', async () => {
            const result = await proxyCanister.icrc1_fee();

            expect(result).toBe(0n);
        });

        it('gets icrc1 total supply', async () => {
            const result = await proxyCanister.icrc1_total_supply();

            expect(result).toBe(1_000_000n);
        });

        it('gets icrc1 minting account', async () => {
            const result = await proxyCanister.icrc1_minting_account();

            expect(result[0]?.owner.toText()).toBe('2vxsx-fae');
        });

        it('gets icrc1 balance of', async () => {
            const result = await proxyCanister.icrc1_balance_of({
                owner: Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai'),
                subaccount: []
            });

            expect(result).toBe(1_000_000n);
        });

        it('sends an icrc1 transfer', async () => {
            const result = await proxyCanister.icrc1_transfer({
                from_subaccount: [],
                to: {
                    owner: Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
                    subaccount: []
                },
                amount: 1n,
                fee: [],
                memo: [],
                created_at_time: []
            });

            expect(result).toStrictEqual({ Ok: 1n });
        });

        it('gets icrc1 supported_standards', async () => {
            const result = await proxyCanister.icrc1_supported_standards();

            const expectedResult = [
                {
                    url: 'https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-1',
                    name: 'ICRC-1'
                },
                {
                    url: 'https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-2',
                    name: 'ICRC-2'
                }
            ];

            expect(result).toStrictEqual(expectedResult);
        });

        it('approves an icrc2 transaction', async () => {
            const result = await proxyCanister.icrc2_approve({
                from_subaccount: [],
                spender: {
                    owner: Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
                    subaccount: []
                },
                amount: 1n,
                expected_allowance: [],
                expires_at: [],
                fee: [],
                memo: [],
                created_at_time: []
            });

            expect(result).toStrictEqual({ Ok: 2n });
        });

        it('sends an icrc2 transfer', async () => {
            const result = await proxyCanister.icrc2_transfer_from({
                spender_subaccount: [],
                from: {
                    owner: Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai'),
                    subaccount: []
                },
                to: {
                    owner: Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
                    subaccount: []
                },
                amount: 1n,
                fee: [],
                memo: [],
                created_at_time: []
            });

            expect(result).toStrictEqual({ Ok: 3n });
        });

        it('gets icrc2 allowance', async () => {
            const result = await proxyCanister.icrc2_allowance({
                account: {
                    owner: Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai'),
                    subaccount: []
                },
                spender: {
                    owner: Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
                    subaccount: []
                }
            });

            expect(result.allowance).toBe(1n);
        });
    };
}
