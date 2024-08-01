import { chunk, IDL, performanceCounter, update } from 'azle';

export default class {
    @update([IDL.Nat32, IDL.Bool], IDL.Nat64)
    async measureSum(loops: number, shouldChunk: boolean): Promise<bigint> {
        let _sum = 0;

        for (let i = 0; i < loops; i++) {
            _sum += (i % 100) * (i % 100);

            if (shouldChunk && i % 15_000_000 === 0) {
                await chunk();
            }
        }

        return performanceCounter(1);
    }
}
