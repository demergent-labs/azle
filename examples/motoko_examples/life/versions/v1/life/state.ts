export type Cell = boolean;
export type State = Cell[][];

export function create(size: number, f: (i: number, j: number) => Cell): State {
    return tabulate(size, (i: number): Cell[] => {
        return Array.from({ length: size }, (_, j) => f(i, j));
    });
}

// Initialize an immutable array of the given size, and use the gen function to
// produce the initial value for every index.
function tabulate<T>(size: number, gen: (i: number) => T): T[] {
    return Array.from({ length: size }, (_, i) => gen(i));
}
