import { expect, it, Test } from 'azle/test/jest';
import { execSync } from 'child_process';

export function getTests(): Test {
    return () => {
        it('gets an initial count via http', async () => {
            expect(await getCount()).toBe(getExpectedGetCountResult(0));
        });

        it('increments the counter once via http', async () => {
            expect(await count()).toBe(getExpectedCountResult(1));
        });

        it('increments the counter twice via http', async () => {
            expect(await count()).toBe(getExpectedCountResult(2));
        });

        it("gets the value of the counter via http after it's been incremented", async () => {
            expect(await getCount()).toBe(getExpectedGetCountResult(2));
        });

        it('increments the counter via http with gzipped result', async () => {
            expect(await countGzip()).toBe('update');
        });

        it('gets the value of the counter via http with gzipped result', async () => {
            expect(await getCountGzip()).toBe('query');
        });

        it('streams the value of the counter via http', async () => {
            expect(await getCountStream()).toBe(
                getExpectedGetCountStreamResult(3)
            );
        });

        it('gets the final value of the counter via http', async () => {
            expect(await getCount()).toBe(getExpectedGetCountResult(3));
        });
    };
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
