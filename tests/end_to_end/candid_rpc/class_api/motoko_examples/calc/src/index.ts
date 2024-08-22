import { IDL, update } from 'azle';

let cell: bigint = 0n;

export default class {
    @update([IDL.Int], IDL.Int)
    add(n: bigint): bigint {
        cell += n;

        return cell;
    }

    @update([IDL.Int], IDL.Int)
    sub(n: bigint): bigint {
        cell -= n;

        return cell;
    }

    @update([IDL.Int], IDL.Int)
    mul(n: bigint): bigint {
        cell *= n;

        return cell;
    }

    @update([IDL.Int], IDL.Opt(IDL.Int))
    div(n: bigint): [bigint] | [] {
        if (n === 0n) {
            return [];
        } else {
            cell /= n;
            return [cell];
        }
    }

    @update([])
    clearall(): void {
        cell = 0n;
    }
}
