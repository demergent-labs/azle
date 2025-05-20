import { randSeed } from 'azle';
import {
    blob,
    bool,
    Canister,
    float64,
    query,
    update,
    Void
} from 'azle/experimental';

export default Canister({
    getInitCalled: query([], bool, () => {
        return globalThis._azleInitCalled ?? false;
    }),
    getPostUpgradeCalled: query([], bool, () => {
        return globalThis._azlePostUpgradeCalled ?? false;
    }),
    mathRandom: update([], float64, () => {
        return Math.random();
    }),
    cryptoGetRandomValues: update([], blob, () => {
        let randomness = new Uint8Array(32);

        crypto.getRandomValues(randomness);

        return randomness;
    }),
    seedWith0: update([], Void, () => {
        randSeed(new Uint8Array(32));
    })
});
