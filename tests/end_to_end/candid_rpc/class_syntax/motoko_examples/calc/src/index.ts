import { IDL, update } from 'azle';

export default class {
    cell: bigint = 0n;

    @update([IDL.Int], IDL.Int)
    add(n: bigint): bigint {
        this.cell += n;

        return this.cell;
    }

    @update([IDL.Int], IDL.Int)
    sub(n: bigint): bigint {
        this.cell -= n;

        return this.cell;
    }

    @update([IDL.Int], IDL.Int)
    mul(n: bigint): bigint {
        this.cell *= n;

        return this.cell;
    }

    @update([IDL.Int], IDL.Opt(IDL.Int))
    div(n: bigint): [bigint] | [] {
        if (n === 0n) {
            return [];
        } else {
            this.cell /= n;
            return [this.cell];
        }
    }

    @update([])
    clearall(): void {
        this.cell = 0n;
    }
}
