import { Test } from 'azle/test';
import { execSync } from 'child_process';

export function getTests(): Test[] {
    return [
        {
            name: 'init get count',
            test: async () => {
                return {
                    Ok: getCount() === getExpectedGetCountResult(0)
                };
            }
        },
        {
            name: 'first increment',
            test: async () => {
                return {
                    Ok: count() === getExpectedCountResult(1)
                };
            }
        },
        {
            name: 'second increment',
            test: async () => {
                return {
                    Ok: count() === getExpectedCountResult(2)
                };
            }
        },
        {
            name: 'get count',
            test: async () => {
                return {
                    Ok: getCount() === getExpectedGetCountResult(2)
                };
            }
        },
        {
            name: 'gzipped increment',
            test: async () => {
                return {
                    Ok: countGzip() === 'update'
                };
            }
        },
        {
            name: 'get gzipped count',
            test: async () => {
                return {
                    Ok: getCountGzip() === 'query'
                };
            }
        },
        {
            name: 'get streaming count',
            test: async () => {
                return {
                    Ok: getCountStream() === getExpectedGetCountStreamResult(3)
                };
            }
        },
        {
            name: 'final get count',
            test: async () => {
                return {
                    Ok: getCount() === getExpectedGetCountResult(3)
                };
            }
        }
    ];
}

function getCanisterID(): string {
    return execSync(`dfx canister id http_counter`).toString().trim();
}

function count(): string {
    const canister_id = getCanisterID();
    return execSync(
        `curl --silent -X POST "${canister_id}.localhost:8000/" --resolve "${canister_id}.localhost:8000:127.0.0.1"`
    )
        .toString()
        .trim();
}

function countGzip(): string {
    const canister_id = getCanisterID();
    return execSync(
        `curl --compressed --silent -X POST "${canister_id}.localhost:8000/" --resolve "${canister_id}.localhost:8000:127.0.0.1"`
    )
        .toString()
        .trim();
}

function getCount(): string {
    const canister_id = getCanisterID();
    return execSync(
        `curl --silent "${canister_id}.localhost:8000/" --resolve "${canister_id}.localhost:8000:127.0.0.1"`
    )
        .toString()
        .trim();
}

function getCountStream(): string {
    const canister_id = getCanisterID();
    return execSync(
        `curl --silent "${canister_id}.localhost:8000/stream" --resolve "${canister_id}.localhost:8000:127.0.0.1"`
    )
        .toString()
        .trim();
}

function getCountGzip(): string {
    const canister_id = getCanisterID();
    return execSync(
        `curl --compressed --silent "${canister_id}.localhost:8000/" --resolve "${canister_id}.localhost:8000:127.0.0.1"`
    )
        .toString()
        .trim();
}

function getExpectedGetCountResult(expectedCount: number): string {
    return `Counter is ${expectedCount}\n/`;
}

function getExpectedGetCountStreamResult(expectedCount: number): string {
    return `Counter is ${expectedCount} streaming`;
}

function getExpectedCountResult(expectedCount: number): string {
    return `Counter updated to ${expectedCount}`;
}
