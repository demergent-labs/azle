import { Principal } from '@dfinity/principal';
import { deploy, ok, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/ledger_canister';

const ledger_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const test_setups = get_test_setups();
const simple_tests = get_simple_tests();
const transfer_error_tests = get_transfer_error_tests();
const address_from_principal_tests = get_address_from_principal_tests();

const tests = [
    ...test_setups,
    ...simple_tests,
    ...transfer_error_tests,
    ...address_from_principal_tests
];

run_tests(tests);

function get_test_setups(): Test[] {
    return [
        {
            name: 'clear icp_ledger canister memory',
            prep: async () => {
                execSync(`dfx canister uninstall-code icp_ledger || true`, {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: 'icp_ledger setup',
            prep: async () => {
                execSync(`mkdir -p canisters/icp_ledger`, {
                    stdio: 'inherit'
                });

                execSync(
                    `cd canisters/icp_ledger && curl -o ledger.wasm.gz https://download.dfinity.systems/ic/dfdba729414d3639b2a6c269600bbbd689b35385/canisters/ledger-canister_notify-method.wasm.gz`,
                    {
                        stdio: 'inherit'
                    }
                );

                execSync(
                    `cd canisters/icp_ledger && gunzip -f ledger.wasm.gz`,
                    {
                        stdio: 'inherit'
                    }
                );

                execSync(
                    `cd canisters/icp_ledger && curl -o ledger.private.did https://raw.githubusercontent.com/dfinity/ic/dfdba729414d3639b2a6c269600bbbd689b35385/rs/rosetta-api/ledger.did`,
                    {
                        stdio: 'inherit'
                    }
                );

                execSync(
                    `cd canisters/icp_ledger && curl -o ledger.public.did https://raw.githubusercontent.com/dfinity/ic/dfdba729414d3639b2a6c269600bbbd689b35385/rs/rosetta-api/ledger_canister/ledger.did`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        },
        ...deploy('ledger_canister'),
        {
            name: 'deploy icp_ledger',
            prep: async () => {
                execSync(
                    `dfx deploy icp_ledger --argument='(record {minting_account = "'$(dfx ledger account-id)'"; initial_values = vec { record { "'$(dfx ledger account-id --of-canister ledger_canister)'"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}})'`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        }
    ];
}

function get_simple_tests(): Test[] {
    return [
        {
            name: 'get_account_balance',
            test: async () => {
                const ledger_canister_address = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                const result = await ledger_canister.get_account_balance(
                    ledger_canister_address
                );

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: result.ok.e8s === 100_000_000_000n
                };
            }
        },
        {
            name: 'get_transfer_fee',
            test: async () => {
                const result = await ledger_canister.get_transfer_fee();

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: result.ok.transfer_fee.e8s === 10_000n
                };
            }
        },
        {
            name: 'get_blocks',
            test: async () => {
                const ledger_canister_address = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                await ledger_canister.execute_transfer(
                    ledger_canister_address,
                    2_000_000n,
                    10_000n,
                    []
                );

                await ledger_canister.execute_transfer(
                    ledger_canister_address,
                    3_000_000n,
                    10_000n,
                    []
                );

                const result = await ledger_canister.get_blocks({
                    start: 0n,
                    length: 100n
                });

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                const transfer_1 = result.ok.blocks[0].transaction.operation[0];
                const transfer_2 = result.ok.blocks[1].transaction.operation[0];
                const transfer_3 = result.ok.blocks[2].transaction.operation[0];

                return {
                    ok:
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
            name: 'get_symbol',
            test: async () => {
                const result = await ledger_canister.get_symbol();

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: result.ok === 'ICP'
                };
            }
        },
        {
            name: 'get_name',
            test: async () => {
                const result = await ledger_canister.get_name();

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: result.ok === 'Internet Computer'
                };
            }
        },
        {
            name: 'get_decimals',
            test: async () => {
                const result = await ledger_canister.get_decimals();

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: result.ok === 8
                };
            }
        },
        {
            name: 'get_archives',
            test: async () => {
                const result = await ledger_canister.get_archives();

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: result.ok.archives.length === 0
                };
            }
        },
        {
            name: 'execute_transfer',
            test: async () => {
                const ledger_canister_address = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                const result = await ledger_canister.execute_transfer(
                    ledger_canister_address,
                    4_000_000n,
                    10_000n,
                    []
                );

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: 'Ok' in result.ok && result.ok.Ok === 3n
                };
            }
        },
        {
            name: 'get_account_balance',
            test: async () => {
                const ledger_canister_address = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                const result = await ledger_canister.get_account_balance(
                    ledger_canister_address
                );

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: result.ok.e8s === 99_999_970_000n
                };
            }
        }
    ];
}

function get_transfer_error_tests(): Test[] {
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
            name: 'deploy icp_ledger',
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
                const ledger_canister_address = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                const result = await ledger_canister.execute_transfer(
                    ledger_canister_address,
                    1_000_000n,
                    0n,
                    []
                );

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok:
                        'Err' in result.ok &&
                        'BadFee' in result.ok.Err &&
                        result.ok.Err.BadFee.expected_fee.e8s === 10_000n
                };
            }
        },
        {
            name: 'InsufficientFunds',
            test: async () => {
                const ledger_canister_address = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                const result = await ledger_canister.execute_transfer(
                    ledger_canister_address,
                    1_000_000n,
                    10_000n,
                    []
                );

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok:
                        'Err' in result.ok &&
                        'InsufficientFunds' in result.ok.Err &&
                        result.ok.Err.InsufficientFunds.balance.e8s === 0n
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
            name: 'deploy icp_ledger',
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
                const ledger_canister_address = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                const result = await ledger_canister.execute_transfer(
                    ledger_canister_address,
                    1_000_000n,
                    10_000n,
                    [
                        BigInt(new Date().getTime()) * 1_000_000n -
                            1_000_000_000n * 60n * 60n * 24n * 2n
                    ]
                );

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok:
                        'Err' in result.ok &&
                        'TxTooOld' in result.ok.Err &&
                        result.ok.Err.TxTooOld.allowed_window_nanos ===
                            86_400_000_000_000n
                };
            }
        },
        {
            name: 'TxCreatedInFuture',
            test: async () => {
                const ledger_canister_address = execSync(
                    `dfx ledger account-id --of-canister ledger_canister`
                )
                    .toString()
                    .trim();

                const result = await ledger_canister.execute_transfer(
                    ledger_canister_address,
                    1_000_000n,
                    10_000n,
                    [
                        BigInt(new Date().getTime()) * 1_000_000n +
                            1_000_000_000n * 60n * 60n * 24n * 2n
                    ]
                );

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok:
                        'Err' in result.ok &&
                        'TxCreatedInFuture' in result.ok.Err
                };
            }
        }
        // TODO I am not sure how to invoke this error
        // {
        //     name: 'TxDuplicate',
        //     test: async () => {
        //         return {
        //             ok: false
        //         };
        //     }
        // }
    ];
}

function get_address_from_principal_tests(): Test[] {
    return [
        {
            name: 'get_address_from_principal rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal rrkah-fqaaa-aaaaa-aaaaq-cai`
                )
                    .toString()
                    .trim();

                return {
                    ok: result === address
                };
            }
        },
        {
            name: 'get_address_from_principal ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
                    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal ryjl3-tyaaa-aaaaa-aaaba-cai`
                )
                    .toString()
                    .trim();

                return {
                    ok: result === address
                };
            }
        },
        {
            name: 'get_address_from_principal rno2w-sqaaa-aaaaa-aaacq-cai',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
                    Principal.fromText('rno2w-sqaaa-aaaaa-aaacq-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal rno2w-sqaaa-aaaaa-aaacq-cai`
                )
                    .toString()
                    .trim();

                return {
                    ok: result === address
                };
            }
        },
        {
            name: 'get_address_from_principal rkp4c-7iaaa-aaaaa-aaaca-cai',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
                    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal rkp4c-7iaaa-aaaaa-aaaca-cai`
                )
                    .toString()
                    .trim();

                return {
                    ok: result === address
                };
            }
        },
        {
            name: 'get_address_from_principal r7inp-6aaaa-aaaaa-aaabq-cai',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
                    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal r7inp-6aaaa-aaaaa-aaabq-cai`
                )
                    .toString()
                    .trim();

                return {
                    ok: result === address
                };
            }
        },
        {
            name: 'get_address_from_principal rwlgt-iiaaa-aaaaa-aaaaa-cai',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
                    Principal.fromText('rwlgt-iiaaa-aaaaa-aaaaa-cai')
                );
                const address = execSync(
                    `dfx ledger account-id --of-principal rwlgt-iiaaa-aaaaa-aaaaa-cai`
                )
                    .toString()
                    .trim();

                return {
                    ok: result === address
                };
            }
        },
        {
            name: 'get_address_from_principal 3zjeh-xtbtx-mwebn-37a43-7nbck-qgquk-xtrny-42ujn-gzaxw-ncbzw-kqe',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
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
                    ok: result === address
                };
            }
        },
        {
            name: 'get_address_from_principal o2ivq-5dsz3-nba5d-pwbk2-hdd3i-vybeq-qfz35-rqg27-lyesf-xghzc-3ae',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
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
                    ok: result === address
                };
            }
        },
        {
            name: 'get_address_from_principal cb53b-qsf7f-isr4v-tco56-pu475-66ehq-cfkko-doax3-xrnjh-pdo57-zae',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
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
                    ok: result === address
                };
            }
        },
        {
            name: 'get_address_from_principal fhzp2-mb4kr-hm4io-32js7-oketg-gdi73-4pqb4-6jyxp-ajbhd-tuiwt-bqe',
            test: async () => {
                const result = await ledger_canister.get_address_from_principal(
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
                    ok: result === address
                };
            }
        }
    ];
}
