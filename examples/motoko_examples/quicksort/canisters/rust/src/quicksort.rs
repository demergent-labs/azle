use ic_cdk::export::candid::Int;
use std::{cmp::Ordering, convert::TryInto};

trait AbsoluteValue {
    fn abs(&self) -> usize;
}

impl AbsoluteValue for Int {
    fn abs(&self) -> usize {
        let positive_int = if self >= &Int::from(0i8) {
            self.clone()
        } else {
            self.clone() * Int::from(-1i8)
        };
        positive_int.0.try_into().unwrap()
    }
}

pub fn sort_by<X: Clone + Ord, T: Fn(&X, &X) -> Ordering>(xs: Vec<X>, f: &T) -> Vec<X> {
    let n = xs.len();
    if n < 2 {
        return xs;
    } else {
        let mut result = xs.clone();
        sort_by_helper(&mut result, 0.into(), (n - 1).into(), f);
        result
    }
}

fn sort_by_helper<X: Clone + Ord, T: Fn(&X, &X) -> Ordering>(
    xs: &mut Vec<X>,
    l: Int,
    r: Int,
    f: &T,
) -> () {
    if l < r {
        let mut i = l.clone();
        let mut j = r.clone();
        let pivot = xs[(l.clone() + r.clone()).abs() / 2].clone();
        while i <= j {
            while f(&xs[i.abs()], &pivot).is_lt() {
                i += 1;
            }
            while f(&xs[j.abs()], &pivot).is_gt() {
                j -= 1;
            }
            if i <= j {
                xs.swap(i.abs(), j.abs());
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
