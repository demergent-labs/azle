import {
    ic,
    Update,
    i64 // TODO we need to implement Int or i128
} from 'azle';

let cell: i64 = 0;

export function add(n: i64): Update<i64> {
    cell += n;
    return cell;
}

export function sub(n: i64): Update<i64> {
    cell -= n;
    return cell;
}

export function mul(n: i64): Update<i64> {
    cell *= n;
    return cell;
}

// TODO we do not have a maybe type
export function div(n: i64): Update<i64> {
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