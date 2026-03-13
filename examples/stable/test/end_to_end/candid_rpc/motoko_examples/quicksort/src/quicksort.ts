import { Int, Order, OrderType } from './comparison';

export function sortBy<X>(xs: X[], f: (a: X, b: X) => OrderType): X[] {
    const n = xs.length;
    if (n < 2) {
        return xs;
    } else {
        let result = [...xs];
        sortByHelper(result, 0, n - 1, f);
        return result;
    }
}

function sortByHelper<X>(
    xs: X[],
    l: number,
    r: number,
    f: (a: X, b: X) => OrderType
): void {
    if (l < r) {
        let i = l;
        let j = r;
        const pivot = xs[Math.round(Int.abs(l + r) / 2)];
        while (i <= j) {
            while (Order.isLess(f(xs[Int.abs(i)], pivot))) {
                i += 1;
            }
            while (Order.isGreater(f(xs[Int.abs(j)], pivot))) {
                j -= 1;
            }
            if (i <= j) {
                const leftIndex = Int.abs(i);
                const rightIndex = Int.abs(j);
                const swap = xs[leftIndex];

                xs[leftIndex] = xs[rightIndex];
                xs[rightIndex] = swap;
                i += 1;
                j -= 1;
            }
        }
        if (l < j) {
            sortByHelper<X>(xs, l, j, f);
        }
        if (i < r) {
            sortByHelper<X>(xs, i, r, f);
        }
    }
}
