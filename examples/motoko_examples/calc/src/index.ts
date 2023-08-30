import { Some, None, update } from 'azle';
import { int, Opt, Void } from 'azle/candid';

let cell: bigint = 0n;

export default class {
    @update([int], [int])
    add(n: bigint): bigint {
        cell += n;

        return cell;
    }

    @update([int], [int])
    sub(n: bigint): bigint {
        cell -= n;

        return cell;
    }

    @update([int], [int])
    mul(n: bigint): bigint {
        cell *= n;

        return cell;
    }

    @update([int], [Opt(int)])
    div(n: bigint) {
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
