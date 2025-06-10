import { expect, it, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

export function getTests(): Test {
    return () => {
        it('gets an initial count via http', async () => {
            if (await wslTest(getCount)) return;
            expect(await getCount()).toBe(getExpectedGetCountResult(0));
        });

        it('increments the counter once via http', async () => {
            if (await wslTest(count)) return;
            expect(await count()).toBe(getExpectedCountResult(1));
        });

        it('increments the counter twice via http', async () => {
            if (await wslTest(count)) return;
            expect(await count()).toBe(getExpectedCountResult(2));
        });

        it("gets the value of the counter via http after it's been incremented", async () => {
            if (await wslTest(getCount)) return;
            expect(await getCount()).toBe(getExpectedGetCountResult(2));
        });

        it('increments the counter via http with gzipped result', async () => {
            if (await wslTest(countGzip)) return;
            expect(await countGzip()).toBe('update');
        });

        it('gets the value of the counter via http with gzipped result', async () => {
            if (await wslTest(getCountGzip)) return;
            expect(await getCountGzip()).toBe('query');
        });

        it('streams the value of the counter via http', async () => {
            if (await wslTest(getCountStream)) return;
            expect(await getCountStream()).toBe(
                getExpectedGetCountStreamResult(3)
            );
        });

        it('gets the final value of the counter via http', async () => {
            if (await wslTest(getCount)) return;
            expect(await getCount()).toBe(getExpectedGetCountResult(3));
        });
    };
}

function getCanisterID(): string {
    return execSync(`dfx canister id http_counter`).toString().trim();
}

function isRunningInWSL(): boolean {
    try {
        // Check if we're in WSL by looking for WSL-specific environment or file
        const isWSL =
            process.env.WSL_DISTRO_NAME !== undefined ||
            execSync(
                'grep -qi microsoft /proc/version 2>/dev/null || echo false'
            )
                .toString()
                .trim() !== 'false';
        return isWSL;
    } catch {
        return false;
    }
}

async function wslTest(testFunction: () => Promise<string>): Promise<boolean> {
    if (process.env.AZLE_TEST_WSL) {
        expect(await testFunction()).toBe(
            'Response verification failed: Certification values not found'
        );
        return true;
    }
    return false;
}

function getUrl(): string {
    const canister_id = getCanisterID();

    // In WSL, subdomain resolution for localhost doesn't work reliably
    // Use the direct IP approach instead
    if (isRunningInWSL()) {
        return `http://127.0.0.1:4943/?canisterId=${canister_id}`;
    }

    return `http://${canister_id}.raw.localhost:4943/`;
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
