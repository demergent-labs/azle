import {
    Update,
    opt,
    float64
} from 'azle';

// TODO cell should be a nat64: https://github.com/demergent-labs/azle/issues/98
let cell: float64 = 0;

export function add(n: float64): Update<float64> {
    cell += n;
    return cell;
}

export function sub(n: float64): Update<float64> {
    cell -= n;
    return cell;
}

export function mul(n: float64): Update<float64> {
    cell *= n;
    return cell;
}

export function div(n: float64): Update<opt<float64>> {
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