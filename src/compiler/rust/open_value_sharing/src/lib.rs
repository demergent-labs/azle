// TODO let's go rename everything and clean up all names
// TODO then let's make all code very clean and declarative
// TODO then let's clean up TODOs
// TODO then let's write documentation/spec

// TODO BURNED_WEIGHTED_HALVING we aren't really checking the heuristic in here
// TODO we should check and fail if it is wrong

// TODO this crate must be of the highest quality so that it can get
// TODO incorporated into the Rust CDK and icpp
// TODO write good tests, possibly in Rust?
// TODO the tests should probably be in this crate standalone
// TODO unwraps, declarativeness, data structures should be impeccable
// TODO we should also put the Demergent Labs .openvaluesharing.json file in here
// TODO we should also write a way to get the dependencies for Rust out

// TODO how do we deal with multiple instances of open_value_sharing_periodic_payment existing?
// TODO right now for example, azle automatically pulls it in
// TODO I suppose the CDK would need to do this?
// TODO maybe it could do it itself if it could check if
// TODO the method already exists in the canister?

// TODO should we also do unit tests for the Rust and TypeScript portions?

use std::cell::RefCell;
use std::collections::BTreeMap;

thread_local! {
    pub static CYCLE_BALANCE_PREVIOUS: RefCell<u128> = RefCell::new(0);
    pub static PERIODIC_BATCHES: RefCell<BTreeMap<u64, PeriodicBatch>> = RefCell::new(BTreeMap::new());
}

#[derive(candid::CandidType, Clone)]
pub struct PeriodicBatch {
    pub time_start: u64,
    pub time_end: u64,
    pub total_amount: u128,
    pub payments: Vec<Payment>,
}

#[derive(candid::CandidType, Clone)]
pub struct Payment {
    pub time: u64,
    pub name: String,
    pub principal: candid::Principal,
    pub amount: u128,
    pub success: Result<(), String>,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct Consumer {
    #[serde(rename = "killSwitch")]
    pub kill_switch: bool,
    #[serde(rename = "sharedPercentage")]
    pub shared_percentage: u32,
    #[serde(rename = "period")]
    pub period: u32,
    #[serde(rename = "sharingHeuristic")]
    pub sharing_heuristic: String,
    #[serde(rename = "depthWeights")]
    pub depth_weights: DepthWeights,
    pub dependencies: Vec<Dependency>,
}

pub type DepthWeights = std::collections::BTreeMap<u32, u32>;

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct Dependency {
    pub name: String,
    pub depth: u32,
    pub weight: u32,
    pub platform: String,
    pub asset: String,
    #[serde(rename = "paymentMechanism")]
    pub payment_mechanism: String,
    pub custom: std::collections::HashMap<String, serde_json::Value>,
}

// TODO we need some way to store state...across upgrades
pub async fn init(consumer: &Consumer) {
    if consumer.kill_switch == true {
        return;
    }

    let time_start = ic_cdk::api::time();

    // TODO just for testing
    // TODO this is actually a major issue that needs to be addressed
    // TODO let's move this stuff to the dfx.json
    // TODO let's introduce a custom/cdk field for all of Azle's stuff
    // TODO CALL IT CUSTOM
    if ic_cdk::api::id().to_text() == "bw4dl-smaaa-aaaaa-qaacq-cai" {
        return;
    }

    ic_cdk::println!("open_value_sharing_periodic_payment");

    let delay = core::time::Duration::new((consumer.period * 60) as u64, 0);

    ic_cdk::println!("delay: {:#?}", delay);

    let cloned_consumer = consumer.clone();

    ic_cdk_timers::set_timer(delay, || {
        ic_cdk::spawn(async move {
            init(&cloned_consumer).await;
        });
    });

    ic_cdk::println!("open_value_sharing_periodic_payment timer set");

    let total_amount = calculate_total_amount(&consumer).await;

    ic_cdk::println!("total_periodic_payment_amount: {}", total_amount);

    if total_amount == 0 {
        PERIODIC_BATCHES.with(|periodic_batches| {
            let mut periodic_batches = periodic_batches.borrow_mut();

            let id = periodic_batches
                .last_key_value()
                .map(|(&last_key, _)| last_key + 1)
                .unwrap_or(0);

            periodic_batches.insert(
                id,
                PeriodicBatch {
                    time_start,
                    time_end: ic_cdk::api::time(),
                    total_amount,
                    payments: vec![],
                },
            );

            if periodic_batches.len() > 1_000 {
                periodic_batches.pop_first();
            }
        });

        return;
    }

    let mut payments: Vec<Payment> = vec![];

    for dependency in &consumer.dependencies {
        let amount = calculate_payment_amount(
            dependency,
            &consumer.depth_weights,
            total_amount,
            dependency.depth == *consumer.depth_weights.last_key_value().unwrap().0,
        );

        if amount == 0 {
            let principal_string = dependency
                .custom
                .get("principal")
                .ok_or_else(|| "missing 'principal' key".to_string())
                .unwrap()
                .as_str()
                .ok_or_else(|| "'principal' key is not a string".to_string())
                .unwrap()
                .to_string();
            let principal = candid::Principal::from_text(principal_string)
                .map_err(|err| err.to_string())
                .unwrap();

            payments.push(Payment {
                name: dependency.name.clone(),
                time: ic_cdk::api::time(),
                amount: 0,
                principal,
                success: Ok(()),
            });

            continue;
        }

        if dependency.platform == "icp" {
            let payment_result = handle_icp_platform(&dependency, amount).await;

            match payment_result {
                Ok(payment) => payments.push(payment),
                Err(message) => {
                    let principal_string = dependency
                        .custom
                        .get("principal")
                        .ok_or_else(|| "missing 'principal' key".to_string())
                        .unwrap()
                        .as_str()
                        .ok_or_else(|| "'principal' key is not a string".to_string())
                        .unwrap()
                        .to_string();
                    let principal = candid::Principal::from_text(principal_string)
                        .map_err(|err| err.to_string())
                        .unwrap();

                    return payments.push(Payment {
                        name: dependency.name.clone(),
                        time: ic_cdk::api::time(),
                        amount,
                        principal,
                        success: Err(message),
                    });
                }
            };
        }
    }

    PERIODIC_BATCHES.with(|periodic_batches| {
        let mut periodic_batches = periodic_batches.borrow_mut();

        let id = periodic_batches
            .last_key_value()
            .map(|(&last_key, _)| last_key + 1)
            .unwrap_or(0);

        periodic_batches.insert(
            id,
            PeriodicBatch {
                time_start,
                time_end: ic_cdk::api::time(),
                total_amount,
                payments,
            },
        );

        if periodic_batches.len() > 1_000 {
            periodic_batches.pop_first();
        }
    });
}

async fn calculate_total_amount(consumer: &Consumer) -> u128 {
    let cycle_balance = ic_cdk::api::canister_balance128();
    let cycle_balance_previous = CYCLE_BALANCE_PREVIOUS
        .with(|cycle_balance_previous| cycle_balance_previous.borrow().clone());

    CYCLE_BALANCE_PREVIOUS.with(|cycle_balance_previous| {
        let mut cycle_balance_previous = cycle_balance_previous.borrow_mut();

        *cycle_balance_previous = cycle_balance;
    });

    if cycle_balance >= cycle_balance_previous {
        0
    } else {
        ((cycle_balance_previous - cycle_balance) * consumer.shared_percentage as u128) / 100
    }
}

fn calculate_payment_amount(
    dependency: &Dependency,
    depth_weights: &DepthWeights,
    total_amount: u128,
    bottom: bool,
) -> u128 {
    let adjusted_depth = dependency.depth + if bottom { 0 } else { 1 };

    let dependency_level_periodic_payment_amount = total_amount / 2_u128.pow(adjusted_depth as u32);

    let total_dependency_level_weight = *depth_weights.get(&dependency.depth).unwrap();

    let dependency_ratio =
        dependency.weight as u128 * total_amount / total_dependency_level_weight as u128;

    dependency_level_periodic_payment_amount * dependency_ratio / total_amount
}

async fn handle_icp_platform(dependency: &Dependency, amount: u128) -> Result<Payment, String> {
    if dependency.asset == "cycles" {
        return handle_icp_platform_asset_cycles(dependency, amount).await;
    }

    Err(format!("asset {} is not supported", dependency.asset))
}

async fn handle_icp_platform_asset_cycles(
    dependency: &Dependency,
    amount: u128,
) -> Result<Payment, String> {
    let principal_string = dependency
        .custom
        .get("principal")
        .ok_or_else(|| "missing 'principal' key".to_string())?
        .as_str()
        .ok_or_else(|| "'principal' key is not a string".to_string())?
        .to_string();
    let principal =
        candid::Principal::from_text(principal_string).map_err(|err| err.to_string())?;

    if dependency.payment_mechanism == "wallet" {
        ic_cdk::api::call::call_with_payment128::<(Option<()>,), ()>(
            principal,
            "wallet_receive",
            (None,),
            amount,
        )
        .await
        .map_err(|err| err.1)?;

        return Ok(Payment {
            name: dependency.name.clone(),
            time: ic_cdk::api::time(),
            amount,
            principal,
            success: Ok(()),
        });
    }

    if dependency.payment_mechanism == "deposit" {
        ic_cdk::api::management_canister::main::deposit_cycles(
            ic_cdk::api::management_canister::main::CanisterIdRecord {
                canister_id: principal,
            },
            amount,
        )
        .await
        .map_err(|err| err.1)?;

        return Ok(Payment {
            name: dependency.name.clone(),
            time: ic_cdk::api::time(),
            amount,
            principal,
            success: Ok(()),
        });
    }

    // ic_cdk::println!("successfully sent {} cycles\n\n", payment_amount);

    // TODO add ledger

    // TODO should we error out or just log if this is not supported?
    // ic_cdk::println!(
    //     "payment_mechanism \"{}\" is not supported",
    //     dependency.payment_mechanism
    // );

    Err(format!(
        "payment mechanism {} is not supported",
        dependency.payment_mechanism
    ))
}
