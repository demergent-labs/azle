import { Variant } from 'azle';

export type Cell = boolean;
export type V1State = boolean[][];
export type State = Variant<{
    // v1: V1State; // TODO: See https://github.com/demergent-labs/azle/issues/366
    v1: boolean[][];
}>;

export function create(size: number, f: (i: number, j: number) => Cell): State {
    return {
        v1: tabulate(size, (i: number): Cell[] => {
            return Array.from({ length: size }, (_, j) => f(i, j));
        })
    };
}

// Initialize an immutable array of the given size, and use the gen function to
// produce the initial value for every index.
function tabulate<T>(size: number, gen: (i: number) => T): T[] {
    return Array.from({ length: size }, (_, i) => gen(i));
}
