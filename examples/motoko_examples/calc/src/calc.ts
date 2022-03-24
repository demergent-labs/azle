import {
    Update,
    Opt,
    int32
} from 'azle';

// TODO cell should be a nat64: https://github.com/demergent-labs/azle/issues/20
let cell: int32 = 0;

export function add(n: int32): Update<int32> {
    cell += n;
    return cell;
}

export function sub(n: int32): Update<int32> {
    cell -= n;
    return cell;
}

export function mul(n: int32): Update<int32> {
    cell *= n;
    return cell;
}

export function div(n: int32): Update<Opt<int32>> {
    if (n == 0) {
        return null;
    }
    else {
        cell /= n;
        return cell;
    }
}

export function clearall(): Update<void> {
    cell = 0;
}