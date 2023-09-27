import { Canister, nat, update } from 'azle';

export default Canister({
    // Calculate the product of all positive integers less than or equal to `n`.
    fac: update([nat], nat, (n) => {
        return go(n);
    })
});

// We implement the recursion in a helper function.
function go(m: nat): nat {
    if (m == 0n) {
        return 1n;
    } else {
        return m * go(m - 1n);
    }
}
