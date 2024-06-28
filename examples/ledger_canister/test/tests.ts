import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { describe } from '@jest/globals';
import { expect, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/ledger_canister/ledger_canister.did';

export function getTests(ledgerCanister: ActorSubclass<_SERVICE>): Test {
    const simpleTests = getSimpleTests(ledgerCanister);
    const transferErrorTests = getTransferErrorTests(ledgerCanister);
    const addressFromPrincipalTests =
        getAddressFromPrincipalTests(ledgerCanister);

    return () => {
        describe('simpleTests', simpleTests);
        describe('transferErrorTests', transferErrorTests);
        describe('addressFromPrincipalTests', addressFromPrincipalTests);
    };
}

function getSimpleTests(ledgerCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('getAccountBalance', async () => {
            const ledgerCanisterAddress = execSync(
                `dfx ledger account-id --of-canister ledger_canister`
            )
                .toString()
                .trim();

            const result = await ledgerCanister.getAccountBalance(
                ledgerCanisterAddress
            );

            expect(result.e8s).toBe(100_000_000_000n);
        });

        it('getTransferFee', async () => {
            const result = await ledgerCanister.getTransferFee();

            expect(result.transfer_fee.e8s).toBe(10_000n);
        });

        it('getBlocks', async () => {
            const ledgerCanisterAddress = execSync(
                `dfx ledger account-id --of-canister ledger_canister`
            )
                .toString()
                .trim();

            await ledgerCanister.executeTransfer(
                ledgerCanisterAddress,
                2_000_000n,
                10_000n,
                []
            );

            await ledgerCanister.executeTransfer(
                ledgerCanisterAddress,
                3_000_000n,
                10_000n,
                []
            );

            const result = await ledgerCanister.getBlocks({
                start: 0n,
                length: 100n
            });

            const transfer_1 = result.blocks[0].transaction.operation[0];
            const transfer_2 = result.blocks[1].transaction.operation[0];
            const transfer_3 = result.blocks[2].transaction.operation[0];

            expect(transfer_1).toEqual({
                Mint: expect.objectContaining({
                    amount: { e8s: 100_000_000_000n }
                })
            });
            expect(transfer_2).toEqual({
                Transfer: expect.objectContaining({
                    amount: { e8s: 2_000_000n }
                })
            });
            expect(transfer_3).toEqual({
                Transfer: expect.objectContaining({
                    amount: { e8s: 3_000_000n }
                })
            });
        }, 10_000);

        it('getSymbol', async () => {
            const result = await ledgerCanister.getSymbol();

            expect(result).toBe('ICP');
        });

        it('getName', async () => {
            const result = await ledgerCanister.getName();

            expect(result).toBe('Internet Computer');
        });

        it('getDecimals', async () => {
            const result = await ledgerCanister.getDecimals();

            expect(result).toBe(8);
        });

        it('getArchives', async () => {
            const result = await ledgerCanister.getArchives();

            expect(result.archives).toHaveLength(0);
        });

        it('executeTransfer', async () => {
            const ledgerCanisterAddress = execSync(
                `dfx ledger account-id --of-canister ledger_canister`
            )
                .toString()
                .trim();

            const result = await ledgerCanister.executeTransfer(
                ledgerCanisterAddress,
                4_000_000n,
                10_000n,
                []
            );

            expect(result).toStrictEqual({ Ok: 3n });
        });

        it('getAccountBalance', async () => {
            const ledgerCanisterAddress = execSync(
                `dfx ledger account-id --of-canister ledger_canister`
            )
                .toString()
                .trim();

            const result = await ledgerCanister.getAccountBalance(
                ledgerCanisterAddress
            );

            expect(result.e8s).toBe(99_999_970_000n);
        });
    };
}

function getTransferErrorTests(ledgerCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        please('clear canister memory', async () => {
            execSync(`dfx canister uninstall-code icp_ledger || true`, {
                stdio: 'inherit'
            });
        });

        please('deploy icpLedger', async () => {
            execSync(
                `dfx deploy icp_ledger --argument='(record {minting_account = "'$(dfx ledger account-id)'"; initial_values = vec {}; send_whitelist = vec {}})'`,
                {
                    stdio: 'inherit'
                }
            );
        });

        it('BadFee', async () => {
            const ledgerCanisterAddress = execSync(
                `dfx ledger account-id --of-canister ledger_canister`
            )
                .toString()
                .trim();

            const result = await ledgerCanister.executeTransfer(
                ledgerCanisterAddress,
                1_000_000n,
                0n,
                []
            );

            expect(result).toStrictEqual({
                Err: { BadFee: { expected_fee: { e8s: 10_000n } } }
            });
        });

        it('InsufficientFunds', async () => {
            const ledgerCanisterAddress = execSync(
                `dfx ledger account-id --of-canister ledger_canister`
            )
                .toString()
                .trim();

            const result = await ledgerCanister.executeTransfer(
                ledgerCanisterAddress,
                1_000_000n,
                10_000n,
                []
            );

            expect(result).toStrictEqual({
                Err: { InsufficientFunds: { balance: { e8s: 0n } } }
            });
        });

        please('clear canister memory', async () => {
            execSync(`dfx canister uninstall-code icp_ledger || true`, {
                stdio: 'inherit'
            });
        });

        please('deploy icpLedger', async () => {
            execSync(
                `dfx deploy icp_ledger --argument='(record {minting_account = "'$(dfx ledger account-id)'"; initial_values = vec { record { "'$(dfx ledger account-id --of-canister ledger_canister)'"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}})'`,
                {
                    stdio: 'inherit'
                }
            );
        });

        it('TxTooOld', async () => {
            const ledgerCanisterAddress = execSync(
                `dfx ledger account-id --of-canister ledger_canister`
            )
                .toString()
                .trim();

            const result = await ledgerCanister.executeTransfer(
                ledgerCanisterAddress,
                1_000_000n,
                10_000n,
                [
                    BigInt(new Date().getTime()) * 1_000_000n -
                        1_000_000_000n * 60n * 60n * 24n * 2n
                ]
            );

            expect(result).toStrictEqual({
                Err: { TxTooOld: { allowed_window_nanos: 86_400_000_000_000n } }
            });
        });

        it('TxCreatedInFuture', async () => {
            const ledgerCanisterAddress = execSync(
                `dfx ledger account-id --of-canister ledger_canister`
            )
                .toString()
                .trim();

            const result = await ledgerCanister.executeTransfer(
                ledgerCanisterAddress,
                1_000_000n,
                10_000n,
                [
                    BigInt(new Date().getTime()) * 1_000_000n +
                        1_000_000_000n * 60n * 60n * 24n * 2n
                ]
            );

            expect(result).toStrictEqual({ Err: { TxCreatedInFuture: null } });
        });

        it.skip('TxDuplicate', async () => {
            // TODO I am not sure how to invoke this error
            expect(true).toBe(false);
        });
    };
}

function getAddressFromPrincipalTests(
    ledgerCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('getAddressFromPrincipal rrkah-fqaaa-aaaaa-aaaaq-cai', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
            );
            const address = execSync(
                `dfx ledger account-id --of-principal rrkah-fqaaa-aaaaa-aaaaq-cai`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });

        it('getAddressFromPrincipal ryjl3-tyaaa-aaaaa-aaaba-cai', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
            );
            const address = execSync(
                `dfx ledger account-id --of-principal ryjl3-tyaaa-aaaaa-aaaba-cai`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });

        it('getAddressFromPrincipal rno2w-sqaaa-aaaaa-aaacq-cai', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText('rno2w-sqaaa-aaaaa-aaacq-cai')
            );
            const address = execSync(
                `dfx ledger account-id --of-principal rno2w-sqaaa-aaaaa-aaacq-cai`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });

        it('getAddressFromPrincipal rkp4c-7iaaa-aaaaa-aaaca-cai', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
            );
            const address = execSync(
                `dfx ledger account-id --of-principal rkp4c-7iaaa-aaaaa-aaaca-cai`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });

        it('getAddressFromPrincipal r7inp-6aaaa-aaaaa-aaabq-cai', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
            );
            const address = execSync(
                `dfx ledger account-id --of-principal r7inp-6aaaa-aaaaa-aaabq-cai`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });

        it('getAddressFromPrincipal rwlgt-iiaaa-aaaaa-aaaaa-cai', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText('rwlgt-iiaaa-aaaaa-aaaaa-cai')
            );
            const address = execSync(
                `dfx ledger account-id --of-principal rwlgt-iiaaa-aaaaa-aaaaa-cai`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });

        it('getAddressFromPrincipal 3zjeh-xtbtx-mwebn-37a43-7nbck-qgquk-xtrny-42ujn-gzaxw-ncbzw-kqe', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText(
                    '3zjeh-xtbtx-mwebn-37a43-7nbck-qgquk-xtrny-42ujn-gzaxw-ncbzw-kqe'
                )
            );
            const address = execSync(
                `dfx ledger account-id --of-principal 3zjeh-xtbtx-mwebn-37a43-7nbck-qgquk-xtrny-42ujn-gzaxw-ncbzw-kqe`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });

        it('getAddressFromPrincipal o2ivq-5dsz3-nba5d-pwbk2-hdd3i-vybeq-qfz35-rqg27-lyesf-xghzc-3ae', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText(
                    'o2ivq-5dsz3-nba5d-pwbk2-hdd3i-vybeq-qfz35-rqg27-lyesf-xghzc-3ae'
                )
            );
            const address = execSync(
                `dfx ledger account-id --of-principal o2ivq-5dsz3-nba5d-pwbk2-hdd3i-vybeq-qfz35-rqg27-lyesf-xghzc-3ae`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });

        it('getAddressFromPrincipal cb53b-qsf7f-isr4v-tco56-pu475-66ehq-cfkko-doax3-xrnjh-pdo57-zae', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText(
                    'cb53b-qsf7f-isr4v-tco56-pu475-66ehq-cfkko-doax3-xrnjh-pdo57-zae'
                )
            );
            const address = execSync(
                `dfx ledger account-id --of-principal cb53b-qsf7f-isr4v-tco56-pu475-66ehq-cfkko-doax3-xrnjh-pdo57-zae`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });

        it('getAddressFromPrincipal fhzp2-mb4kr-hm4io-32js7-oketg-gdi73-4pqb4-6jyxp-ajbhd-tuiwt-bqe', async () => {
            const result = await ledgerCanister.getAddressFromPrincipal(
                Principal.fromText(
                    'fhzp2-mb4kr-hm4io-32js7-oketg-gdi73-4pqb4-6jyxp-ajbhd-tuiwt-bqe'
                )
            );
            const address = execSync(
                `dfx ledger account-id --of-principal fhzp2-mb4kr-hm4io-32js7-oketg-gdi73-4pqb4-6jyxp-ajbhd-tuiwt-bqe`
            )
                .toString()
                .trim();

            expect(result).toBe(address);
        });
    };
}
