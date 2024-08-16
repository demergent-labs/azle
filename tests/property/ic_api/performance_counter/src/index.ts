import { chunk, IDL, performanceCounter, query, update } from 'azle';

export default class {
    @query([IDL.Nat32], IDL.Nat64)
    async queryPerformanceCounter0(loops: number): Promise<bigint> {
        await sum(loops, false);

        return performanceCounter(0);
    }

    @update([IDL.Nat32], IDL.Nat64)
    async updatePerformanceCounter0(loops: number): Promise<bigint> {
        await sum(loops, false);

        return performanceCounter(0);
    }

    @query([IDL.Nat32], IDL.Nat64)
    async queryPerformanceCounter1(loops: number): Promise<bigint> {
        await sum(loops, false);

        return performanceCounter(1);
    }

    @update([IDL.Nat32], IDL.Nat64)
    async updatePerformanceCounter1(loops: number): Promise<bigint> {
        await sum(loops, true);

        return performanceCounter(1);
    }
}

async function sum(loops: number, shouldChunk: boolean): Promise<void> {
    let _sum = 0;

    for (let i = 0; i < loops; i++) {
        _sum += (i % 100) * (i % 100);

        if (shouldChunk && i % 100_000 === 0) {
            await chunk();
        }
    }
}
