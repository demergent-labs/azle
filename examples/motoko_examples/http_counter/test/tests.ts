import { Test } from 'azle/test';
import { execSync } from 'child_process';
import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

const skip = true;

export function getTests(): Test[] {
    return [
        {
            name: 'init get count',
            test: async () => {
                return {
                    Ok: (await getCount()) === getExpectedGetCountResult(0)
                };
            }
        },
        {
            name: 'first increment',
            test: async () => {
                return {
                    Ok: (await count()) === getExpectedCountResult(1)
                };
            }
        },
        {
            name: 'second increment',
            test: async () => {
                return {
                    Ok: (await count()) === getExpectedCountResult(2)
                };
            }
        },
        {
            name: 'get count',
            test: async () => {
                return {
                    Ok: (await getCount()) === getExpectedGetCountResult(2)
                };
            }
        },
        {
            name: 'gzipped increment',
            test: async () => {
                return {
                    Ok: (await countGzip()) === 'update'
                };
            }
        },
        {
            name: 'get gzipped count',
            test: async () => {
                return {
                    Ok: (await getCountGzip()) === 'query'
                };
            }
        },
        {
            name: 'get streaming count',
            test: async () => {
                return {
                    Ok:
                        (await getCountStream()) ===
                        getExpectedGetCountStreamResult(3)
                };
            }
        },
        {
            name: 'final get count',
            test: async () => {
                return {
                    Ok: (await getCount()) === getExpectedGetCountResult(3)
                };
            }
        }
    ];
}

function getCanisterID(): string {
    return execSync(`dfx canister id http_counter`).toString().trim();
}

function getUrl(): string {
    const canister_id = getCanisterID();
    return `http://${canister_id}.localhost:8000/`;
}

async function count(): Promise<string> {
    const response = await fetch(getUrl(), {
        method: 'POST',
        headers: [['accept-encoding', '']]
    });
    return (await response.text()).trim();
}

async function countGzip(): Promise<string> {
    const response = await fetch(getUrl(), {
        method: 'POST'
    });
    return (await response.text()).trim();
}

async function getCount(): Promise<string> {
    const response = await fetch(getUrl(), {
        headers: [['accept-encoding', '']]
    });
    return (await response.text()).trim();
}

async function getCountStream(): Promise<string> {
    const streamUrl = `${getUrl()}stream`;
    const response = await fetch(streamUrl, {
        headers: [['accept-encoding', '']]
    });
    return (await response.text()).trim();
}

async function getCountGzip(): Promise<string> {
    const response = await fetch(getUrl());
    return (await response.text()).trim();
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
