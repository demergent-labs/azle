// TODO add tests that we can use for fuzzing and have acceptance tests
// TODO for traps after awaits and in timers

import { call, IDL, setTimer, update } from 'azle';

export default class {
    @update
    test(): void {}

    @update([IDL.Vec(IDL.Nat8)])
    testTimerFailure(bytes: Uint8Array): void {
        setTimer(0, () => {
            bytes.reverse();

            throw new Error(`will this cause a memory leak? ${new Date()}`);
        });
    }

    @update([IDL.Vec(IDL.Nat8)], IDL.Vec(IDL.Nat8))
    async test0(bytes: Uint8Array): Promise<Uint8Array> {
        const randomness = await call<[Uint8Array], Uint8Array>(
            'bd3sg-teaaa-aaaaa-qaaba-cai',
            'test',
            {
                paramIdlTypes: [IDL.Vec(IDL.Nat8)],
                returnIdlType: IDL.Vec(IDL.Nat8),
                args: [bytes]
            }
        );

        console.log('***********************about to throw and thus trap');
        throw new Error('will this cause a memory leak?');

        return Uint8Array.from([...bytes, ...randomness]);
    }

    @update([IDL.Vec(IDL.Nat8)], IDL.Vec(IDL.Nat8))
    async test1(bytes: Uint8Array): Promise<Uint8Array> {
        const randomness = await call<[Uint8Array], Uint8Array>(
            'bd3sg-teaaa-aaaaa-qaaba-cai',
            'test',
            {
                paramIdlTypes: [IDL.Vec(IDL.Nat8)],
                returnIdlType: IDL.Vec(IDL.Nat8),
                args: [bytes]
            }
        );

        throw new Error('will this cause a memory leak?');

        return Uint8Array.from([...bytes, ...randomness]);
    }

    @update([IDL.Vec(IDL.Nat8)], IDL.Vec(IDL.Nat8))
    async test2(bytes: Uint8Array): Promise<Uint8Array> {
        const randomness = await call<[Uint8Array], Uint8Array>(
            'bd3sg-teaaa-aaaaa-qaaba-cai',
            'test',
            {
                paramIdlTypes: [IDL.Vec(IDL.Nat8)],
                returnIdlType: IDL.Vec(IDL.Nat8),
                args: [bytes]
            }
        );

        throw new Error('will this cause a memory leak?');

        return Uint8Array.from([...bytes, ...randomness]);
    }

    @update([IDL.Vec(IDL.Nat8)], IDL.Vec(IDL.Nat8))
    async test3(bytes: Uint8Array): Promise<Uint8Array> {
        const randomness = await call<[Uint8Array], Uint8Array>(
            'bd3sg-teaaa-aaaaa-qaaba-cai',
            'test',
            {
                paramIdlTypes: [IDL.Vec(IDL.Nat8)],
                returnIdlType: IDL.Vec(IDL.Nat8),
                args: [bytes]
            }
        );

        throw new Error('will this cause a memory leak?');

        return Uint8Array.from([...bytes, ...randomness]);
    }

    // // TODO let's do errors later
    // @update
    // async testOrdering(): Promise<void> {
    //     let logs: string[] = [];

    //     new Promise<void>((resolve) => {
    //         logs.push('reading from file 0');
    //         resolve();
    //     }).then(() => logs.push('read from file 0'));

    //     new Promise<void>((resolve) => {
    //         logs.push('reading from file 1');
    //         resolve();
    //     }).then(() => logs.push('read from file 1'));

    //     new Promise<void>((resolve) => {
    //         logs.push('reading from file 2');
    //         resolve();
    //     }).then(() => logs.push('read from file 2'));

    //     new Promise<void>((resolve) => {
    //         logs.push('reading from file 3');
    //         resolve();
    //     }).then(() => logs.push('read from file 3'));

    //     logs.push('about to do inter-canister call');

    //     await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
    //         returnIdlType: IDL.Vec(IDL.Nat8)
    //     });

    //     logs.push('randomness complete');
    // }

    // // TODO let's do errors later
    // @update
    // async testOrderingAwait(): Promise<void> {
    //     await new Promise<void>((resolve) => {
    //         console.log('reading from file 0');
    //         resolve();
    //     });

    //     console.log('read from file 0');

    //     await new Promise<void>((resolve) => {
    //         console.log('reading from file 1');
    //         resolve();
    //     });

    //     console.log('read from file 1');

    //     await new Promise<void>((resolve) => {
    //         console.log('reading from file 2');
    //         resolve();
    //     });

    //     console.log('read from file 2');

    //     console.log('about to do inter-canister call');

    //     await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
    //         returnIdlType: IDL.Vec(IDL.Nat8)
    //     });

    //     console.log('continuation: await call');
    // }

    // @update
    // async testMicrotasks(): Promise<void> {
    //     console.log('JavaScript testMicrotasks start');

    //     await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
    //         returnIdlType: IDL.Vec(IDL.Nat8)
    //     });

    //     console.log('continuation: await call');
    // }

    // @update
    // async testSingle(): Promise<void> {
    //     await new Promise<void>((resolve) => {
    //         console.log('inside promise');

    //         resolve();
    //     });

    //     console.log('continuation: await new Promise<void>');
    // }

    // @update
    // async testAwaitingOrNot(): Promise<void> {
    //     const result = await monkey();

    //     console.log('continuation: await monkey', result);
    // }
}

// async function monkey(): Promise<string> {
//     return await chunkey();
// }

// async function chunkey(): Promise<string> {
//     return 'times';
// }
