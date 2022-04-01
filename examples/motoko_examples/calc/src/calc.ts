import {
    Update,
    Opt,
    nat64
} from 'azle';

let cell: nat64 = 0n;

export function add(n: nat64): Update<nat64> {
    cell += n;
    return cell;
}

export function sub(n: nat64): Update<nat64> {
    cell -= n;
    return cell;
}

export function mul(n: nat64): Update<nat64> {
    cell *= n;
    return cell;
}

export function div(n: nat64): Update<Opt<nat64>> {
    if (n == 0n) {
        return null;
    }
    else {
        cell /= n;
        return cell;
    }
}

export function clearall(): Update<void> {
    cell = 0n;
}