pub fn sort_by<X: Clone + Copy + Ord>(xs: Vec<X>) -> Vec<X> {
    let n = xs.len();
    if n < 2 {
        return xs;
    } else {
        let mut result = xs.clone();
        sort_by_helper(&mut result, 0, n - 1);
        result
    }
}

fn sort_by_helper<X: Copy + Ord>(xs: &mut Vec<X>, l: usize, r: usize) -> () {
    if l < r {
        let mut i = l;
        let mut j = r;
        let mut swap;
        let pivot = xs[(l + r) / 2];
        while i <= j {
            while xs[i] < pivot {
                i += 1;
            }
            while xs[j] > pivot {
                j -= 1;
            }
            if i <= j {
                swap = xs[i];
                xs[i] = xs[j];
                xs[j] = swap;
                i += 1;
                j = if j == 0 { 0 } else { j - 1 };
            }
        }
        if l < j {
            sort_by_helper(xs, l, j);
        }
        if i < r {
            sort_by_helper(xs, i, r);
        }
    }
}
