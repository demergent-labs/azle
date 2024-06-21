import { IDL, query, update } from 'azle';

let cell: int = 0n;

export default class {
    @update([int], int)
    add(n) {
        cell += n;

        return cell;
    }
    @update([int], int)
    sub(n) {
        cell -= n;

        return cell;
    }
    @update([int], int)
    mul(n) {
        cell *= n;

        return cell;
    }
    @update([int], Opt(int))
    div(n) {
        if (n === 0n) {
            return None;
        } else {
            cell /= n;
            return Some(cell);
        }
    }
    @update([], Void)
    clearall() {
        cell = 0n;
    }
}
