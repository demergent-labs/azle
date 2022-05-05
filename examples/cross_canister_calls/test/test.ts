import {
    ok,
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/canister1';

const canister1 = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code canister1 || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx canister uninstall-code canister2 || true`, {
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
        name: 'deploy',
        prep: async () => {
            execSync(`dfx deploy`, {
                stdio: 'inherit'
            });
        }
    },
    {
        name: 'canister1 balance 0',
        test: async () => {
            const result = await canister1.balance('0');

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok === 100n
            };
        }
    },
    {
        name: 'canister1 account 0',
        test: async () => {
            const result = await canister1.account({
                id: '0'
            });

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: (
                    result.ok.length === 1 &&
                    result.ok[0].id === '0' &&
                    result.ok[0].balance === 100n
                )
            };
        }
    },
    {
        name: 'canister1 balance 1',
        test: async () => {
            const result = await canister1.balance('1');

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok === 0n
            };
        }
    },
    {
        name: 'canister1 account 1',
        test: async () => {
            const result = await canister1.account({
                id: '1'
            });

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok.length === 0
            };
        }
    },
    {
        name: 'canister1 accounts',
        test: async () => {
            const result = await canister1.accounts();

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: (
                    result.ok.length === 1 &&
                    result.ok[0].id === '0' &&
                    result.ok[0].balance === 100n
                )
            };
        }
    },
    {
        name: 'canister1 transfer',
        test: async () => {
            const result = await canister1.transfer(
                '0',
                '1',
                34n
            );

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok === 34n
            };
        }
    },
    {
        name: 'canister1 balance 0',
        test: async () => {
            const result = await canister1.balance('0');

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok === 66n
            };
        }
    },
    {
        name: 'canister1 account 0',
        test: async () => {
            const result = await canister1.account({
                id: '0'
            });

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: (
                    result.ok.length === 1 &&
                    result.ok[0].id === '0' &&
                    result.ok[0].balance === 66n
                )
            };
        }
    },
    {
        name: 'canister1 balance 1',
        test: async () => {
            const result = await canister1.balance('1');

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok === 34n
            };
        }
    },
    {
        name: 'canister1 account 1',
        test: async () => {
            const result = await canister1.account({
                id: '1'
            });

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: (
                    result.ok.length === 1 &&
                    result.ok[0].id === '1' &&
                    result.ok[0].balance === 34n
                )
            };
        }
    },
    {
        name: 'canister1 accounts',
        test: async () => {
            const result = await canister1.accounts();

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: (
                    result.ok.length === 2 &&
                    result.ok[0].id === '0' &&
                    result.ok[0].balance === 66n &&
                    result.ok[1].id === '1' &&
                    result.ok[1].balance === 34n
                )
            };
        }
    },
    {
        name: 'canister1 trap',
        test: async () => {
            const result = await canister1.trap();

            return {
                ok: (
                    'err' in result &&
                    result.err === 'Rejection code 5, IC0503: Canister ryjl3-tyaaa-aaaaa-aaaba-cai trapped explicitly: hahahaha'
                )
            };
        }
    }
];

run_tests(tests);