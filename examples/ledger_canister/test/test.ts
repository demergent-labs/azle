import {
    ok,
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/ledger_canister';

const ledger_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
        }
    }
);

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code ledger_canister || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx canister uninstall-code icp_ledger || true`, {
                stdio: 'inherit'
            });
        }
    },
    {
        // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
        name: 'waiting for createActor fetchRootKey',
        wait: 5000
    },
    {
        name: 'icp_ledger setup',
        prep: async () => {
            execSync(`mkdir -p canisters/icp_ledger`, {
                stdio: 'inherit'
            })

            execSync(`cd canisters/icp_ledger && curl -o ledger.wasm.gz https://download.dfinity.systems/ic/dfdba729414d3639b2a6c269600bbbd689b35385/canisters/ledger-canister_notify-method.wasm.gz`, {
                stdio: 'inherit'
            });

            execSync(`cd canisters/icp_ledger && gunzip -f ledger.wasm.gz`, {
                stdio: 'inherit'
            });

            execSync(`cd canisters/icp_ledger && curl -o ledger.private.did https://raw.githubusercontent.com/dfinity/ic/dfdba729414d3639b2a6c269600bbbd689b35385/rs/rosetta-api/ledger.did`, {
                stdio: 'inherit'
            });

            execSync(`cd canisters/icp_ledger && curl -o ledger.public.did https://raw.githubusercontent.com/dfinity/ic/dfdba729414d3639b2a6c269600bbbd689b35385/rs/rosetta-api/ledger_canister/ledger.did`, {
                stdio: 'inherit'
            });
        }
    },
    {
        name: 'deploy ledger_canister',
        prep: async () => {
            execSync(`dfx deploy ledger_canister`, {
                stdio: 'inherit'
            });
        }
    },
    {
        name: 'deploy icp_ledger',
        prep: async () => {
            execSync(`dfx deploy icp_ledger --argument=\'(record {minting_account = "\'$(dfx ledger account-id)\'"; initial_values = vec { record { "\'$(dfx ledger account-id --of-canister ledger_canister)\'"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}})\'`, {
                stdio: 'inherit'
            });
        }
    },
    {
        name: 'get_account_balance',
        test: async () => {
            const ledger_canister_address = execSync(`dfx ledger account-id --of-canister ledger_canister`).toString().trim();

            const result = await ledger_canister.get_account_balance(ledger_canister_address);

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
            const ledger_canister_address = execSync(`dfx ledger account-id --of-canister ledger_canister`).toString().trim();

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
                ok: result.ok
            };
        }
    },
    {
        name: 'get_account_balance',
        test: async () => {
            const ledger_canister_address = execSync(`dfx ledger account-id --of-canister ledger_canister`).toString().trim();

            const result = await ledger_canister.get_account_balance(ledger_canister_address);

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok.e8s === 99_999_990_000n
            };
        }
    }
];

run_tests(tests);