import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code http_counter || true`, {
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
        name: 'init get count',
        test: async () => {
            return {
                ok: getCount() === getExpectedGetCountResult(0)
            };
        }
    },
    {
        name: 'first increment',
        test: async () => {
            return {
                ok: count() === getExpectedCountResult(1)
            };
        }
    },
    {
        name: 'second increment',
        test: async () => {
            return {
                ok: count() === getExpectedCountResult(2)
            };
        }
    },
    {
        name: 'get count',
        test: async () => {
            return {
                ok: getCount() === getExpectedGetCountResult(2)
            };
        }
    },
    {
        name: 'gzipped increment',
        test: async () => {
            return {
                ok: countGzip() === 'update'
            };
        }
    },
    {
        name: 'get gzipped count',
        test: async () => {
            return {
                ok: getCountGzip() === 'query'
            };
        }
    },
    {
        name: 'final get count',
        test: async () => {
            return {
                ok: getCount() === getExpectedGetCountResult(3)
            };
        }
    },
];

run_tests(tests);

function getCanisterID(): string {
    return execSync(`dfx canister id http_counter`).toString().trim();
}

function count(): string {
    const canister_id = getCanisterID();
    return execSync(`curl --silent -X POST "${canister_id}.localhost:8000/" --resolve "${canister_id}.localhost:8000:127.0.0.1"`).toString().trim();
}

function countGzip(): string {
    const canister_id = getCanisterID();
    return execSync(`curl --compressed --silent -X POST "${canister_id}.localhost:8000/" --resolve "${canister_id}.localhost:8000:127.0.0.1"`).toString().trim();
}

function getCount(): string {
    const canister_id = getCanisterID();
    return execSync(`curl --silent "${canister_id}.localhost:8000/" --resolve "${canister_id}.localhost:8000:127.0.0.1"`).toString().trim();
}

function getCountGzip(): string {
    const canister_id = getCanisterID();
    return execSync(`curl --compressed --silent "${canister_id}.localhost:8000/" --resolve "${canister_id}.localhost:8000:127.0.0.1"`).toString().trim();
}

function getExpectedGetCountResult(expectedCount: number): string {
    return `Counter is ${expectedCount}\n/`;
}

function getExpectedCountResult(expectedCount: number): string {
    return `Counter updated to ${expectedCount}`;
}
