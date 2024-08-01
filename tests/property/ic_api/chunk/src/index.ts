import { chunk, IDL, performanceCounter, query, setTimer, update } from 'azle';

export default class {
    @update([IDL.Nat32, IDL.Bool], IDL.Nat64)
    async measureSum(loops: number, shouldChunk: boolean): Promise<bigint> {
        await sum(loops, shouldChunk);

        return performanceCounter(1);
    }

    timerStarted: boolean = false;
    timerEnded: boolean = false;
    timerInstructions: bigint = 0n;

    @update([IDL.Nat32, IDL.Bool])
    measureSumTimer(loops: number, shouldChunk: boolean): void {
        setTimer(0n, async () => {
            this.timerStarted = true;

            await sum(loops, shouldChunk);

            this.timerInstructions = performanceCounter(1);

            this.timerEnded = true;
        });
    }

    @query([], IDL.Bool)
    getTimerStarted(): boolean {
        return this.timerStarted;
    }

    @query([], IDL.Bool)
    getTimerEnded(): boolean {
        return this.timerEnded;
    }

    @query([], IDL.Nat64)
    getTimerInstructions(): bigint {
        return this.timerInstructions;
    }
}

async function sum(loops: number, shouldChunk: boolean): Promise<void> {
    let _sum = 0;

    for (let i = 0; i < loops; i++) {
        _sum += (i % 100) * (i % 100);

        if (shouldChunk && i % 15_000_000 === 0) {
            await chunk();
        }
    }
}
