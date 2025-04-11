import { IDL, query, randSeed, update } from 'azle';

export default class {
    @query([], IDL.Bool)
    getInitCalled(): boolean {
        return globalThis._azleInitCalled;
    }

    @query([], IDL.Bool)
    getPostUpgradeCalled(): boolean {
        return globalThis._azlePostUpgradeCalled;
    }

    @update([], IDL.Float64)
    mathRandom(): number {
        return Math.random();
    }

    @update([], IDL.Vec(IDL.Nat8))
    cryptoGetRandomValues(): Uint8Array {
        let randomness = new Uint8Array(32);

        crypto.getRandomValues(randomness);

        return randomness;
    }

    @update
    seedWith0(): void {
        randSeed(new Uint8Array(32));
    }
}
