import { int, update, Opt, Void, Some, None } from 'azle';

let cell: int = 0n;

export default class {
    @update([int], int)
    add(n: int): int {
        cell += n;

        return cell;
    }

    @update([int], int)
    sub(n: int): int {
        cell -= n;

        return cell;
    }

    @update([int], int)
    mul(n: int): int {
        cell *= n;

        return cell;
    }

    @update([int], Opt(int))
    div(n: int) {
        if (n === 0n) {
            return None;
        } else {
            cell /= n;
            return Some(cell);
        }
    }

    @update([], Void)
    clearall(): void {
        cell = 0n;
    }
}
