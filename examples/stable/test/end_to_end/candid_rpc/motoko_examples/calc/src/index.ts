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

        // TODO remove this once this bug in @icp-sdk/core/candid is fixed: https://github.com/dfinity/agent-js/issues/953
        if (Number(this.cell) === Infinity || Number(this.cell) === -Infinity) {
            this.cell = BigInt(Number.MAX_VALUE);
        }

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

    @update
    clearall(): void {
        this.cell = 0n;
    }
}
