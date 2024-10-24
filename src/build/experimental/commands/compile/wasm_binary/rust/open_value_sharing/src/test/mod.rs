// most basic way to run the tests: from azle/src/compiler/rust/open_value_sharing: cargo test -- --nocapture

// TODO the tests should probably be in this crate standalone
// TODO should we have unit tests for the node side as well?
// TODO maybe we do that later?
// TODO it shouldn't be too hard to write some property tests
// TODO for the two math functions here

// TODO total individual payments should never be more than the sharing percentage
// TODO properties: individual payments equal total payment, test weights with arbitrary multiplier

// TODO test name, platform, asset changing I guess

// TODO same dependency different names should be the same
// TODO same dependency different assets, etc should be the same

// TODO dependencies must: not have 0 weight, depth_weights must be the sum of the dependency weights for a level...
// TODO maybe we shouldn't pass in the depth weights?
// TODO maybe the depth weights should just be calculated in Rust?
// TODO this will make it a tiny bit easier for the implementer of the data structure

use std::cell::RefCell;

thread_local! {
    static TEST_RUNNER: RefCell<TestRunner> = RefCell::new(TestRunner::new(Config {
        cases: 100,
        max_shrink_iters: 0,
        ..Config::default()
    }));
}

use std::collections::{BTreeMap, HashMap};

use proptest::prelude::prop_oneof;
use proptest::prelude::Just;
use proptest::string::string_regex;
use proptest::test_runner::{Config, TestRunner};
use proptest::{
    prelude::{any, Arbitrary, BoxedStrategy},
    strategy::Strategy,
};

use crate::calculate_payment_amount;
use crate::calculate_total_amount;

use super::{Dependency, DepthWeights};

impl Arbitrary for Dependency {
    type Parameters = ();
    type Strategy = BoxedStrategy<Self>;

    fn arbitrary_with(_args: Self::Parameters) -> Self::Strategy {
        (
            valid_npm_package_name_arb(),
            0u32..=10u32,
            1u32..=100u32,
            Just("icp".to_string()),
            Just("cycles".to_string()),
            prop_oneof![
                Just("wallet_receive".to_string()),
                Just("deposit_cycles".to_string()),
                Just("icrc1_transfer".to_string())
            ],
            custom_config_arb(),
        )
            .prop_map(
                |(name, depth, weight, platform, asset, payment_mechanism, custom)| Dependency {
                    name,
                    depth,
                    weight,
                    platform,
                    asset,
                    payment_mechanism,
                    custom,
                },
            )
            .boxed()
    }
}

fn valid_npm_package_name_arb() -> impl Strategy<Value = String> {
    string_regex("[a-z]+([-_][a-z]+)*")
        .unwrap()
        .prop_map(|string| string[..20.min(string.len())].to_string())
}

fn custom_config_arb() -> impl Strategy<Value = HashMap<String, serde_json::Value>> {
    principal_arb().prop_map(|principal| {
        let mut map = HashMap::new();
        map.insert(
            "principal".to_string(),
            serde_json::Value::String(principal.to_text()),
        );
        map
    })
}

fn principal_arb() -> impl Strategy<Value = candid::Principal> {
    proptest::collection::vec(any::<u8>(), 0..=29)
        .prop_map(|bytes| candid::Principal::from_slice(&bytes))
}

fn dependency_and_depth_weights_arb() -> impl Strategy<Value = (Dependency, DepthWeights)> {
    any::<Dependency>().prop_flat_map(|dependency| {
        proptest::collection::vec(dependency.weight..=1_000, 11).prop_map(move |weights| {
            let mut depth_weights = BTreeMap::new();
            for (i, w) in weights.into_iter().enumerate() {
                depth_weights.insert(i as u32, w);
            }

            (dependency.clone(), depth_weights)
        })
    })
}

// fn depth_weights_arb(dependency: &Dependency) -> impl Strategy<Value = DepthWeights> {
//     // let mut weights = HashMap::new();

//     (0u32..=1_000u32)
// }

// TODO test full dependency tree...or just a bunch of dependencies total_amount should equal the sum of the payment_amounts

// TODO actually this function is not designed to handle weights of 0
// TODO we filter those out and that must hold it looks like
// TODO or test_Amount cannot be 0
#[test]
fn dependency_last_two_levels() {
    TEST_RUNNER.with(|test_runner| {
        let mut runner = test_runner.borrow_mut();

        runner
            .run(
                &(
                    &dependency_and_depth_weights_arb(),
                    1u128..=1_000_000_000_000_000u128,
                    any::<bool>(),
                ),
                |((dependency, depth_weights), total_amount, bottom)| {
                    let payment_amount_bottom_false =
                        calculate_payment_amount(&dependency, &depth_weights, total_amount, false)
                            .unwrap();

                    let payment_amount_bottom_true =
                        calculate_payment_amount(&dependency, &depth_weights, total_amount, true)
                            .unwrap();

                    eprintln!("dependency.depth: {}", dependency.depth);

                    eprintln!(
                        "payment_amount_bottom_false: {}",
                        payment_amount_bottom_false
                    );

                    eprintln!("payment_amount_bottom_true: {}", payment_amount_bottom_true);

                    // TODO use the dec! macro and normal operators
                    assert_eq!(
                        payment_amount_bottom_false,
                        (payment_amount_bottom_true / 2)
                            - if total_amount % 2 == 0 { 0 } else { 1 }
                    );

                    // assert!(
                    //     payment_amount_bottom_false <= payment_amount_bottom_true / 2
                    //         && payment_amount_bottom_false
                    //             >= payment_amount_bottom_true / 2 - 1,
                    // );

                    Ok(())
                },
            )
            .unwrap();
    });
}

// TODO I am suspicious of the bottom here, shouldn't this cause us some issues?
#[test]
fn dependency_depth() {
    TEST_RUNNER.with(|test_runner| {
        let mut runner = test_runner.borrow_mut();

        runner
            .run(
                &(
                    &dependency_and_depth_weights_arb(),
                    1u128..=1_000_000_000_000_000u128,
                    any::<bool>(),
                ),
                |((dependency, mut depth_weights), total_amount, bottom)| {
                    let payment_amount_depth =
                        calculate_payment_amount(&dependency, &depth_weights, total_amount, bottom)
                            .unwrap();

                    let depth_minus_one = if dependency.depth == 0 {
                        0
                    } else {
                        dependency.depth - 1
                    };

                    let depth_plus_one = if dependency.depth == 10 {
                        10
                    } else {
                        dependency.depth + 1
                    };

                    depth_weights.insert(
                        depth_minus_one,
                        *depth_weights.get(&dependency.depth).unwrap(),
                    );

                    depth_weights.insert(
                        depth_plus_one,
                        *depth_weights.get(&dependency.depth).unwrap(),
                    );

                    let payment_amount_depth_minus_one = calculate_payment_amount(
                        &Dependency {
                            depth: depth_minus_one,
                            ..dependency.clone()
                        },
                        &depth_weights,
                        total_amount,
                        bottom,
                    )
                    .unwrap();

                    let payment_amount_depth_plus_one = calculate_payment_amount(
                        &Dependency {
                            depth: depth_plus_one,
                            ..dependency.clone()
                        },
                        &depth_weights,
                        total_amount,
                        bottom,
                    )
                    .unwrap();

                    if dependency.depth == 0 {
                        assert_eq!(payment_amount_depth, payment_amount_depth_minus_one);
                    } else {
                        // assert!(
                        //     payment_amount_depth <= payment_amount_depth_minus_one / 2 + 1
                        //         && payment_amount_depth
                        //             >= payment_amount_depth_minus_one / 2 - 1
                        // );
                    }

                    if dependency.depth == 10 {
                        assert_eq!(payment_amount_depth, payment_amount_depth_plus_one);
                    } else {
                        // assert!(
                        //     payment_amount_depth <= (payment_amount_depth_plus_one + 1) * 2
                        //         && payment_amount_depth
                        //             >= (payment_amount_depth_plus_one - 1) * 2
                        // );
                    }

                    Ok(())
                },
            )
            .unwrap();
    });
}

#[test]
fn dependency_weight() {
    TEST_RUNNER.with(|test_runner| {
        let mut runner = test_runner.borrow_mut();

        runner
            .run(
                &(
                    &dependency_and_depth_weights_arb(),
                    1u128..=1_000_000_000_000_000u128,
                    any::<bool>(),
                    1u32..=100u32,
                ),
                |((dependency, mut depth_weights), total_amount, bottom, weight)| {
                    let depth_weight = *depth_weights.get(&dependency.depth).unwrap();

                    let weight = if weight > depth_weight {
                        depth_weight
                    } else {
                        weight
                    };

                    let payment_amount =
                        calculate_payment_amount(&dependency, &depth_weights, total_amount, bottom)
                            .unwrap();

                    // let new_depth_weight = depth_weight - dependency.weight + weight;

                    // depth_weights.insert(dependency.depth, new_depth_weight);

                    let payment_amount_new_weight = calculate_payment_amount(
                        &Dependency {
                            weight,
                            ..dependency
                        },
                        &depth_weights,
                        total_amount,
                        bottom,
                    )
                    .unwrap();

                    // TODO we just have some major rounding error issues with this function
                    // TODO and these tests...we need to figure out something better
                    if weight >= dependency.weight {
                        let delta = weight as f64 / dependency.weight as f64;

                        // assert_eq!(
                        //     payment_amount as f64 * delta,
                        //     payment_amount_new_weight as f64
                        // );
                    } else {
                    }

                    Ok(())
                },
            )
            .unwrap();
    });
}
