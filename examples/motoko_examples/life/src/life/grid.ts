import * as State from './state';

export class Grid {
    private grid: State.State;
    private readonly n: number;

    constructor(state: State.State) {
        this.grid = state;
        this.n = this.grid.length;
    }

    public size(): number {
        return this.n;
    }

    public get(i: number, j: number): State.Cell {
        return this.grid[i][j];
    }

    public set(i: number, j: number, v: State.Cell): void {
        this.grid[i][j] = v;
    }

    private count(i: number, j: number): number {
        return this.grid[i][j] ? 1 : 0;
    }

    private pred(i: number): number {
        return (this.n + i - 1) % this.n;
    }

    private succ(i: number): number {
        return (i + 1) % this.n;
    }

    private living(i: number, j: number): number {
        return (
            this.count(this.pred(i), this.pred(j)) +
            this.count(this.pred(i), j) +
            this.count(this.pred(i), this.succ(j)) +
            this.count(i, this.pred(j)) +
            this.count(i, this.succ(j)) +
            this.count(this.succ(i), this.pred(j)) +
            this.count(this.succ(i), j) +
            this.count(this.succ(i), this.succ(j))
        );
    }

    private nextCell(i: number, j: number): State.Cell {
        const l: number = this.living(i, j);
        if (this.get(i, j)) {
            return l === 2 ?? l === 3;
        } else {
            return l === 3;
        }
    }

    public next(dst: Grid) {
        this.grid.forEach((row, i) => {
            row.forEach((_, j) => {
                dst.set(i, j, this.nextCell(i, j));
            });
        });
    }

    public toText(): string {
        let t = '';
        this.grid.forEach((row, i) => {
            row.forEach((_, j) => {
                t += this.get(i, j) ? '0' : ' ';
            });
            if (i + 1 < this.n) {
                t += '\n';
            }
        });
        return t;
    }
}
