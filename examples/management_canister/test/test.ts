import { deploy, ok, run_tests, Test } from 'azle/test';
import { readFileSync } from 'fs';
import { createActor } from '../test/dfx_generated/management_canister';

const management_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('management_canister'),
    {
        name: 'execute_create_canister',
        test: async () => {
            const result = await management_canister.execute_create_canister();

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok:
                    result.ok.canister_id !== undefined &&
                    result.ok.canister_id !== null
            };
        }
    },
    {
        name: 'execute_update_settings',
        test: async () => {
            const canister_id =
                await management_canister.get_created_canister_id();

            const execute_update_settings_result =
                await management_canister.execute_update_settings(canister_id);

            if (!ok(execute_update_settings_result)) {
                return {
                    err: execute_update_settings_result.err
                };
            }

            const get_canister_status_result =
                await management_canister.get_canister_status({
                    canister_id: canister_id
                });

            if (!ok(get_canister_status_result)) {
                return {
                    err: get_canister_status_result.err
                };
            }

            const canister_settings = get_canister_status_result.ok.settings;

            return {
                ok:
                    canister_settings.compute_allocation === 1n &&
                    canister_settings.memory_allocation === 3_000_000n &&
                    canister_settings.freezing_threshold === 2_000_000n
            };
        }
    },
    {
        name: 'execute_install_code',
        test: async () => {
            const canister_id =
                await management_canister.get_created_canister_id();

            // this Wasm module is for a simple canister written in Motoko that has one query method called hello that returns a string
            const wasm_module = Array.from(readFileSync('src/test.wasm'));

            const result = await management_canister.execute_install_code(
                canister_id,
                wasm_module
            );

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: true
            };
        }
    },
    {
        name: 'execute_uninstall_code',
        test: async () => {
            const canister_id =
                await management_canister.get_created_canister_id();

            const execute_uninstall_code_result =
                await management_canister.execute_uninstall_code(canister_id);

            if (!ok(execute_uninstall_code_result)) {
                return {
                    err: execute_uninstall_code_result.err
                };
            }

            const get_canister_status_result =
                await management_canister.get_canister_status({
                    canister_id: canister_id
                });

            if (!ok(get_canister_status_result)) {
                return {
                    err: get_canister_status_result.err
                };
            }

            const canister_status = get_canister_status_result.ok;

            return {
                ok: canister_status.module_hash.length === 0
            };
        }
    },
    {
        name: 'execute_stop_canister',
        test: async () => {
            const canister_id =
                await management_canister.get_created_canister_id();

            const execute_stop_canister_result =
                await management_canister.execute_stop_canister(canister_id);

            if (!ok(execute_stop_canister_result)) {
                return {
                    err: execute_stop_canister_result.err
                };
            }

            const get_canister_status_result =
                await management_canister.get_canister_status({
                    canister_id: canister_id
                });

            if (!ok(get_canister_status_result)) {
                return {
                    err: get_canister_status_result.err
                };
            }

            const canister_status = get_canister_status_result.ok;

            return {
                ok: 'stopped' in canister_status.status
            };
        }
    },
    {
        name: 'execute_start_canister',
        test: async () => {
            const canister_id =
                await management_canister.get_created_canister_id();

            const get_canister_status_before_result =
                await management_canister.get_canister_status({
                    canister_id: canister_id
                });

            if (!ok(get_canister_status_before_result)) {
                return {
                    err: get_canister_status_before_result.err
                };
            }

            const canister_status_before = get_canister_status_before_result.ok;

            if ('stopped' in canister_status_before.status === false) {
                return {
                    ok: false
                };
            }

            const execute_start_canister_result =
                await management_canister.execute_start_canister(canister_id);

            if (!ok(execute_start_canister_result)) {
                return {
                    err: execute_start_canister_result.err
                };
            }

            const get_canister_status_after_result =
                await management_canister.get_canister_status({
                    canister_id: canister_id
                });

            if (!ok(get_canister_status_after_result)) {
                return {
                    err: get_canister_status_after_result.err
                };
            }

            const canister_status_after = get_canister_status_after_result.ok;

            return {
                ok: 'running' in canister_status_after.status
            };
        }
    },
    {
        name: 'get_canister_status',
        test: async () => {
            const canister_id =
                await management_canister.get_created_canister_id();

            const get_canister_status_result =
                await management_canister.get_canister_status({
                    canister_id: canister_id
                });

            if (!ok(get_canister_status_result)) {
                return {
                    err: get_canister_status_result.err
                };
            }

            const canister_status = get_canister_status_result.ok;

            return {
                ok:
                    'running' in canister_status.status &&
                    canister_status.memory_size === 0n &&
                    canister_status.cycles >= 800_000_000_000n &&
                    canister_status.settings.freezing_threshold ===
                        2_000_000n &&
                    canister_status.settings.controllers.length === 1 &&
                    canister_status.settings.memory_allocation === 3_000_000n &&
                    canister_status.settings.compute_allocation === 1n &&
                    canister_status.module_hash.length === 0
            };
        }
    },
    {
        name: 'execute_delete_canister',
        test: async () => {
            const canister_id =
                await management_canister.get_created_canister_id();

            const execute_stop_canister_result =
                await management_canister.execute_stop_canister(canister_id);

            if (!ok(execute_stop_canister_result)) {
                return {
                    err: execute_stop_canister_result.err
                };
            }

            const execute_delete_canister_result =
                await management_canister.execute_delete_canister(canister_id);

            if (!ok(execute_delete_canister_result)) {
                return {
                    err: execute_delete_canister_result.err
                };
            }

            return {
                ok: true
            };
        }
    },
    {
        name: 'get_raw_rand',
        test: async () => {
            const result = await management_canister.get_raw_rand();

            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            return {
                ok: result.ok.length === 32
            };
        }
    }
];

run_tests(tests);
