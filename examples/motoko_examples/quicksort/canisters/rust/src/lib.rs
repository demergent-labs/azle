mod quicksort;
use ic_cdk::export::candid::Int;

#[ic_cdk_macros::query]
fn sort(xs: Vec<Int>) -> Vec<Int> {
    quicksort::sort_by(xs, &Int::cmp)
}
