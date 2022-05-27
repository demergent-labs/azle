import { nat, nat32 } from 'azle';

export type RandomNumberGenerator = {
    next: () => nat32;
};

export function create(): RandomNumberGenerator {
    return (() => {
        const modulus: nat = 0x7fffffffn;
        let state: nat32 = 1;
        return {
            next() {
                state = Number((BigInt(state) * 48271n) % modulus);
                return state;
            }
        };
    })();
}
