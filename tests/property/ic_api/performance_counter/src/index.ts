import { chunk, IDL, performanceCounter, query, update } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

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

    @query([IDL.Nat32], IDL.Bool)
    assertTypes(index: number): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof performanceCounter>, bigint>
        >;
        type _AssertParamType = AssertType<
            NotAnyAndExact<Parameters<typeof performanceCounter>[0], number>
        >;
        return (
            typeof index === 'number' &&
            typeof performanceCounter(index) === 'bigint'
        );
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
