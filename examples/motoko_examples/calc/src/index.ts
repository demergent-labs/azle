import { int, update, Opt, Void, Some, None, Service } from 'azle';

export default class extends Service {
    cell: int = 0n;

    @update([int], int)
    add(n: int): int {
        this.cell += n;

        return this.cell;
    }

    @update([int], int)
    sub(n: int): int {
        this.cell -= n;

        return this.cell;
    }

    @update([int], int)
    mul(n: int): int {
        this.cell *= n;

        return this.cell;
    }

    @update([int], Opt(int))
    div(n: int) {
        if (n === 0n) {
            return None;
        } else {
            this.cell /= n;
            return Some(this.cell);
        }
    }

    @update([], Void)
    clearall(): void {
        this.cell = 0n;
    }
}
