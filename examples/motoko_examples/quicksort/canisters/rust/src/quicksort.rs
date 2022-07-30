use ic_cdk::export::candid::Int;
use std::{cmp::Ordering, convert::TryInto};

trait AbsoluteValue {
    fn abs(&self) -> usize;
}

impl AbsoluteValue for Int {
    fn abs(&self) -> usize {
        let positive_int = if self > &Int::from(0i8) {
            *self
        } else {
            *self * Int::from(-1i8)
        };
        positive_int.0.try_into().unwrap()
    }
}

pub fn sort_by<X: Clone + Copy + Ord, T: Fn(&X, &X) -> Ordering>(xs: Vec<X>, f: &T) -> Vec<X> {
    let n = xs.len();
    if n < 2 {
        return xs;
    } else {
        let mut result = xs.clone();
        sort_by_helper(&mut result, Int::from(0 as usize), Int::from(n - 1), f);
        result
    }
}

fn sort_by_helper<X: Copy + Ord, T: Fn(&X, &X) -> Ordering>(
    xs: &mut Vec<X>,
    l: Int,
    r: Int,
    f: &T,
) -> () {
    if l < r {
        let mut i = l;
        let mut j = r;
        let mut swap = xs[0];
        let new_index = (l + r).abs() / Int::from(2i8);
        let new_index_usize: usize = new_index.0.try_into().unwrap();
        let pivot = xs[new_index_usize];
        while i <= j {
            while f(&xs[i.abs()], &pivot).is_lt() {
                i += 1;
            }
            while f(&xs[j.abs()], &pivot).is_gt() {
                j -= 1;
            }
            if i <= j {
                swap = xs[i.abs()];
                xs[i.abs()] = xs[j.abs()];
                xs[j.abs()] = swap;
                i += 1;
                j -= 1;
            }
        }
        if l < j {
            sort_by_helper(xs, l, j, f);
        }
        if i < r {
            sort_by_helper(xs, i, r, f);
        }
    }
}
