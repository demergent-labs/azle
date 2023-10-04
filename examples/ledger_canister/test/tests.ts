import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { ok, Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/ledger_canister/ledger_canister.did';

export function getTests(ledgerCanister: ActorSubclass<_SERVICE>): Test[] {
    const simpleTests = getSimpleTests(ledgerCanister);
    const transferErrorTests = getTransferErrorTests(ledgerCanister);
    const addressFromPrincipalTests =
        getAddressFromPrincipalTests(ledgerCanister);

    const tests = [
        ...simpleTests,
        ...transferErrorTests,
        ...addressFromPrincipalTests
    ];

    return tests;
}

function getSimpleTests(ledgerCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'getAccountBalance',
            test: async () => {
                const ledgerCanisterAddress = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                const result = await ledgerCanister.getAccountBalance(
                    ledgerCanisterAddress
                );

                return {
                    Ok: result.e8s === 100_000_000_000n
                };
            }
        },
        {
            name: 'getTransferFee',
            test: async () => {
                const result = await ledgerCanister.getTransferFee();

                return {
                    Ok: result.transfer_fee.e8s === 10_000n
                };
            }
        },
        {
            name: 'getBlocks',
            test: async () => {
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

                return {
                    Ok:
                        transfer_1 !== undefined &&
                        'Mint' in transfer_1 &&
                        transfer_1.Mint.amount.e8s === 100_000_000_000n &&
                        transfer_2 !== undefined &&
                        'Transfer' in transfer_2 &&
                        transfer_2.Transfer.amount.e8s === 2_000_000n &&
                        transfer_3 !== undefined &&
                        'Transfer' in transfer_3 &&
                        transfer_3.Transfer.amount.e8s === 3_000_000n
                };
            }
        },
        {
            name: 'getSymbol',
            test: async () => {
                const result = await ledgerCanister.getSymbol();

                return {
                    Ok: result === 'ICP'
                };
            }
        },
        {
            name: 'getName',
            test: async () => {
                const result = await ledgerCanister.getName();

                return {
                    Ok: result === 'Internet Computer'
                };
            }
        },
        {
            name: 'getDecimals',
            test: async () => {
                const result = await ledgerCanister.getDecimals();

                return {
                    Ok: result === 8
                };
            }
        },
        {
            name: 'getArchives',
            test: async () => {
                const result = await ledgerCanister.getArchives();

                return {
                    Ok: result.archives.length === 0
                };
            }
        },
        {
            name: 'executeTransfer',
            test: async () => {
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

                return {
                    Ok: 'Ok' in result && result.Ok === 3n
                };
            }
        },
        {
            name: 'getAccountBalance',
            test: async () => {
                const ledgerCanisterAddress = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                const result = await ledgerCanister.getAccountBalance(
                    ledgerCanisterAddress
                );

                return {
                    Ok: result.e8s === 99_999_970_000n
                };
            }
        }
    ];
}

function getTransferErrorTests(
    ledgerCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'clear canister memory',
            prep: async () => {
                execSync(`dfx canister uninstall-code icp_ledger || true`, {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: 'deploy icpLedger',
            prep: async () => {
                execSync(
                    `dfx deploy icp_ledger --argument=\'(record {minting_account = "\'$(dfx ledger account-id)\'"; initial_values = vec {}; send_whitelist = vec {}})\'`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        },
        {
            name: 'BadFee',
            test: async () => {
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

                return {
                    Ok:
                        'Err' in result &&
                        'BadFee' in result.Err &&
                        result.Err.BadFee.expected_fee.e8s === 10_000n
                };
            }
        },
        {
            name: 'InsufficientFunds',
            test: async () => {
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

                return {
                    Ok:
                        'Err' in result &&
                        'InsufficientFunds' in result.Err &&
                        result.Err.InsufficientFunds.balance.e8s === 0n
                };
            }
        },
        {
            name: 'clear canister memory',
            prep: async () => {
                execSync(`dfx canister uninstall-code icp_ledger || true`, {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: 'deploy icpLedger',
            prep: async () => {
                execSync(
                    `dfx deploy icp_ledger --argument=\'(record {minting_account = "\'$(dfx ledger account-id)\'"; initial_values = vec { record { "\'$(dfx ledger account-id --of-canister ledger_canister)\'"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}})\'`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        },
        {
            name: 'TxTooOld',
            test: async () => {
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

                return {
                    Ok:
                        'Err' in result &&
                        'TxTooOld' in result.Err &&
                        result.Err.TxTooOld.allowed_window_nanos ===
                            86_400_000_000_000n
                };
            }
        },
        {
            name: 'TxCreatedInFuture',
            test: async () => {
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

                return {
                    Ok: 'Err' in result && 'TxCreatedInFuture' in result.Err
                };
            }
        }
        // TODO I am not sure how to invoke this error
        // {
        //     name: 'TxDuplicate',
        //     test: async () => {
        //         return {
        //             Ok: false
        //         };
        //     }
        // }
    ];
}

function getAddressFromPrincipalTests(
    ledgerCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getAddressFromPrincipal rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const result = await ledgerCanister.getAddressFromPrincipal(
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal rrkah-fqaaa-aaaaa-aaaaq-cai`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === address
                };
            }
        },
        {
            name: 'getAddressFromPrincipal ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const result = await ledgerCanister.getAddressFromPrincipal(
                    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal ryjl3-tyaaa-aaaaa-aaaba-cai`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === address
                };
            }
        },
        {
            name: 'getAddressFromPrincipal rno2w-sqaaa-aaaaa-aaacq-cai',
            test: async () => {
                const result = await ledgerCanister.getAddressFromPrincipal(
                    Principal.fromText('rno2w-sqaaa-aaaaa-aaacq-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal rno2w-sqaaa-aaaaa-aaacq-cai`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === address
                };
            }
        },
        {
            name: 'getAddressFromPrincipal rkp4c-7iaaa-aaaaa-aaaca-cai',
            test: async () => {
                const result = await ledgerCanister.getAddressFromPrincipal(
                    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal rkp4c-7iaaa-aaaaa-aaaca-cai`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === address
                };
            }
        },
        {
            name: 'getAddressFromPrincipal r7inp-6aaaa-aaaaa-aaabq-cai',
            test: async () => {
                const result = await ledgerCanister.getAddressFromPrincipal(
                    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal r7inp-6aaaa-aaaaa-aaabq-cai`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === address
                };
            }
        },
        {
            name: 'getAddressFromPrincipal rwlgt-iiaaa-aaaaa-aaaaa-cai',
            test: async () => {
                const result = await ledgerCanister.getAddressFromPrincipal(
                    Principal.fromText('rwlgt-iiaaa-aaaaa-aaaaa-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal rwlgt-iiaaa-aaaaa-aaaaa-cai`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === address
                };
            }
        },
        {
            name: 'getAddressFromPrincipal 3zjeh-xtbtx-mwebn-37a43-7nbck-qgquk-xtrny-42ujn-gzaxw-ncbzw-kqe',
            test: async () => {
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

                return {
                    Ok: result === address
                };
            }
        },
        {
            name: 'getAddressFromPrincipal o2ivq-5dsz3-nba5d-pwbk2-hdd3i-vybeq-qfz35-rqg27-lyesf-xghzc-3ae',
            test: async () => {
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

                return {
                    Ok: result === address
                };
            }
        },
        {
            name: 'getAddressFromPrincipal cb53b-qsf7f-isr4v-tco56-pu475-66ehq-cfkko-doax3-xrnjh-pdo57-zae',
            test: async () => {
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

                return {
                    Ok: result === address
                };
            }
        },
        {
            name: 'getAddressFromPrincipal fhzp2-mb4kr-hm4io-32js7-oketg-gdi73-4pqb4-6jyxp-ajbhd-tuiwt-bqe',
            test: async () => {
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

                return {
                    Ok: result === address
                };
            }
        }
    ];
}
