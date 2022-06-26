#[ic_cdk_macros::query]
fn query_empty() -> u64 {
    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::query]
fn query_string_initialize() -> u64 {
    let string: String = "hello there sir".to_string();

    ic_cdk::api::print(string);

    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::query]
fn query_nat64_add_one() -> u64 {
    let mut num: u64 = 0;

    num += 1;

    ic_cdk::api::print(format!("{}", num));

    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::query]
fn query_nat64_add_many() -> u64 {
    let mut num: u64 = 0;

    for i in 0..10_000 {
        num += 1;
    }

    ic_cdk::api::print(format!("{}", num));

    ic_cdk::api::call::performance_counter(0)
}