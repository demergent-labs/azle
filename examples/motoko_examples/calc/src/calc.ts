import {
    ic,
    Update,
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

// TODO we do not have a maybe type
export function div(n: float64): Update<float64> {
    if (n == 0) {
        ic.trap('cannot divide by 0');
    }
    else {
        cell /= n;
        return cell;
    }
}

// TODO we do not have a void type
export function clearall(): Update<boolean> {
    cell = 0;
    return true;
}