mod quicksort;

#[ic_cdk_macros::query]
fn sort(xs: Vec<i128>) -> Vec<i128> {
    quicksort::sort_by(xs)
}
