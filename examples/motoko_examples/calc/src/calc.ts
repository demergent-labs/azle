import {
    Update,
    Opt,
    int
} from 'azle';

let cell: int = 0n;

export function add(n: int): Update<int> {
    cell += n;
    return cell;
}

export function sub(n: int): Update<int> {
    cell -= n;
    return cell;
}

export function mul(n: int): Update<int> {
    cell *= n;
    return cell;
}

export function div(n: int): Update<Opt<int>> {
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