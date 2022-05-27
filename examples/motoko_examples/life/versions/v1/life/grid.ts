import * as State from './state';

export type Grid = {
    size(): number;
    get(i: number, j: number): State.Cell;
    set(i: number, j: number, v: State.Cell): void;
    count(i: number, j: number): number;
    pred(i: number): number;
    succ(i: number): number;
    living(i: number, j: number): number;
    nextCell(i: number, j: number): State.Cell;
    next(dst: Grid): void;
    toText(): string;
    toState(): State.State;
};

export function grid(state: State.State) {
    return ((state: State.State) => {
        let grid = state;
        let n = grid.length;

        return {
            size(): number {
                return n;
            },
            get(i: number, j: number): State.Cell {
                return grid[i][j];
            },
            set(i: number, j: number, v: State.Cell): void {
                grid[i][j] = v;
            },
            count(i: number, j: number): number {
                return grid[i][j] ? 1 : 0;
            },
            pred(i: number): number {
                return (n + i - 1) % n;
            },
            succ(i: number): number {
                return (i + 1) % n;
            },
            living(i: number, j: number): number {
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
            },
            nextCell(i: number, j: number): State.Cell {
                const l: number = this.living(i, j);
                if (this.get(i, j)) {
                    return l === 2 || l === 3;
                } else {
                    return l === 3;
                }
            },
            next(dst: Grid): void {
                grid.forEach((row, i) => {
                    row.forEach((_, j) => {
                        dst.set(i, j, this.nextCell(i, j));
                    });
                });
            },
            toText(): string {
                let t = '';
                grid.forEach((row, i) => {
                    row.forEach((_, j) => {
                        t += this.get(i, j) ? '1' : ' ';
                    });
                    if (i + 1 < n) {
                        t += '\n';
                    }
                });
                return t;
            },
            toState(): State.State {
                return grid;
            }
        };
    })(state);
}
