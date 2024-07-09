import { IDL, update } from 'azle';

export default class {
    // Calculate the product of all positive integers less than or equal to `n`.
    @update([IDL.Nat], IDL.Nat)
    fac(n: bigint): bigint {
        return go(n);
    }
}

// We implement the recursion in a helper function.
function go(m: bigint): bigint {
    if (m === 0n) {
        return 1n;
    } else {
        return m * go(m - 1n);
    }
}
