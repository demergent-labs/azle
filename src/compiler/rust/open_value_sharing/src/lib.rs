// TODO how do we deal with multiple instances of open_value_sharing_periodic_payment existing?
// TODO right now for example, azle automatically pulls it in
// TODO I suppose the CDK would need to do this?
// TODO maybe it could do it itself if it could check if
// TODO the method already exists in the canister?

use std::cell::RefCell;
use std::collections::BTreeMap;

thread_local! {
    pub static CYCLE_BALANCE_PREVIOUS: RefCell<u128> = RefCell::new(0);
    pub static PERIODIC_PAYOUTS: RefCell<BTreeMap<u64, PeriodicPayout>> = RefCell::new(BTreeMap::new());
}

#[derive(candid::CandidType, Clone)]
pub struct PeriodicPayout {
    pub time_started: u64,
    pub time_completed: u64,
    pub total_amount: u128,
    pub individual_payouts: Vec<IndividualPayout>,
}

#[derive(candid::CandidType, Clone)]
pub struct IndividualPayout {
    pub time: u64,
    pub amount: u128,
    pub principal: candid::Principal,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct ConsumerConfig {
    #[serde(rename = "killSwitch")]
    pub kill_switch: bool,
    #[serde(rename = "sharedPercentage")]
    pub shared_percentage: u32,
    #[serde(rename = "period")]
    pub period: u32,
    #[serde(rename = "sharingHeuristic")]
    pub sharing_heuristic: String,
    #[serde(rename = "dependencyInfos")]
    pub dependency_infos: Vec<DependencyInfo>,
    #[serde(rename = "depthWeights")]
    pub depth_weights: DepthWeights,
}

type DepthWeights = std::collections::HashMap<u32, u32>;

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct DependencyInfo {
    pub name: String,
    pub depth: u32,
    pub weight: u32,
    pub platform: String,
    pub asset: String,
    #[serde(rename = "paymentMechanism")]
    pub payment_mechanism: String,
    pub custom: std::collections::HashMap<String, serde_json::Value>,
}

// TODO we should probably keep a log of payments right?
// TODO so that devs can check that it's been done correctly?
// TODO do we need error handling??
// TODO it is much more scalable without error handling
// TODO also it's quick and nimble if it's just best effort
// TODO we can also just spawn off timers until they are all done
// TODO we need some way to store state...across upgrades
// TODO the timer always needs to be set across upgrades
// TODO notify runs out after 500 because of the canister outgoing queue
// TODO calling wallet_receive seems to have no limit, takes few cycles, at least within the same subnet
// TODO management canister, which might be across subnets as an emulation, takes the longest
// TODO not sure if there's any practical limit though

// TODO what kind of logging should we do here?
// TODO should the dev be able to see what payments were made when and if they were successful?
// TODO implement the optional stuff from ConsumerConfig
// TODO figure out how to get this to work on mainnet and locally well
// TODO must ensure the period never gets shorter than the time it takes for this function to complete
pub async fn open_value_sharing_periodic_payment(consumer_config: &ConsumerConfig) {
    let time_started = ic_cdk::api::time();

    // TODO just for testing
    if ic_cdk::api::id().to_text() == "bw4dl-smaaa-aaaaa-qaacq-cai" {
        return;
    }

    ic_cdk::println!("open_value_sharing_periodic_payment");

    let delay = core::time::Duration::new((consumer_config.period * 60) as u64, 0);

    ic_cdk::println!("delay: {:#?}", delay);

    let cloned_consumer_config = consumer_config.clone();

    ic_cdk_timers::set_timer(delay, || {
        ic_cdk::spawn(async move {
            open_value_sharing_periodic_payment(&cloned_consumer_config).await;
        });
    });

    ic_cdk::println!("open_value_sharing_periodic_payment timer set");

    let total_periodic_payment_amount =
        calculate_total_periodic_payment_amount(&consumer_config).await;

    ic_cdk::println!(
        "total_periodic_payment_amount: {}",
        total_periodic_payment_amount
    );

    if total_periodic_payment_amount == 0 {
        PERIODIC_PAYOUTS.with(|periodic_payouts| {
            let mut periodic_payouts = periodic_payouts.borrow_mut();

            let id = periodic_payouts
                .last_key_value()
                .map(|(&last_key, _)| last_key + 1)
                .unwrap_or(0);

            periodic_payouts.insert(
                id,
                PeriodicPayout {
                    time_started,
                    time_completed: ic_cdk::api::time(),
                    total_amount: total_periodic_payment_amount,
                    individual_payouts: vec![],
                },
            );

            if periodic_payouts.len() > 1_000 {
                periodic_payouts.pop_first();
            }
        });

        return;
    }

    let mut individual_payouts: Vec<IndividualPayout> = vec![];

    for dependency_info in &consumer_config.dependency_infos {
        let dependency_periodic_payment_amount = calculate_dependency_periodic_payment_amount(
            dependency_info,
            &consumer_config.depth_weights,
            total_periodic_payment_amount,
            dependency_info.depth == (consumer_config.dependency_infos.len() - 1) as u32,
        );

        if dependency_periodic_payment_amount == 0 {
            continue;
        }

        if dependency_info.platform == "icp" {
            let individual_payout_result =
                handle_icp_platform(&dependency_info, dependency_periodic_payment_amount).await;

            match individual_payout_result {
                Ok(individual_payout) => individual_payouts.push(individual_payout),
                Err(message) => ic_cdk::println!("OpenValueSharing: Payout failed: {}", message),
            };
        }
    }

    PERIODIC_PAYOUTS.with(|periodic_payouts| {
        let mut periodic_payouts = periodic_payouts.borrow_mut();

        let id = periodic_payouts
            .last_key_value()
            .map(|(&last_key, _)| last_key + 1)
            .unwrap_or(0);

        periodic_payouts.insert(
            id,
            PeriodicPayout {
                time_started,
                time_completed: ic_cdk::api::time(),
                total_amount: total_periodic_payment_amount,
                individual_payouts,
            },
        );

        if periodic_payouts.len() > 1_000 {
            periodic_payouts.pop_first();
        }
    });

    ic_cdk::println!("instructions: {}", ic_cdk::api::performance_counter(1));
}

async fn calculate_total_periodic_payment_amount(consumer_config: &ConsumerConfig) -> u128 {
    let cycle_balance = ic_cdk::api::canister_balance128();
    let cycle_balance_previous = CYCLE_BALANCE_PREVIOUS
        .with(|cycle_balance_previous| cycle_balance_previous.borrow().clone());

    ic_cdk::println!("cycle_balance: {}", cycle_balance);
    ic_cdk::println!("cycle_balance_previous: {}", cycle_balance_previous);

    CYCLE_BALANCE_PREVIOUS.with(|cycle_balance_previous| {
        let mut cycle_balance_previous = cycle_balance_previous.borrow_mut();

        *cycle_balance_previous = cycle_balance;
    });

    if cycle_balance >= cycle_balance_previous {
        0
    } else {
        ((cycle_balance_previous - cycle_balance) * consumer_config.shared_percentage as u128) / 100
    }
}

// TODO we also need to take into account the total number of levels
// TODO for example if there is only one level you don't need to cut anything in half
// TODO double-check the weight calculation
fn calculate_dependency_periodic_payment_amount(
    dependency_info: &DependencyInfo,
    depth_weights: &DepthWeights,
    total_periodic_payment_amount: u128,
    bottom: bool,
) -> u128 {
    let adjusted_depth = dependency_info.depth + if bottom { 0 } else { 1 };

    let dependency_level_periodic_payment_amount =
        total_periodic_payment_amount / 2_u128.pow(adjusted_depth as u32);

    let total_dependency_level_weight = *depth_weights.get(&dependency_info.depth).unwrap();

    let dependency_ratio = dependency_info.weight as f64 / total_dependency_level_weight as f64;

    (dependency_level_periodic_payment_amount as f64 * dependency_ratio) as u128
}

async fn handle_icp_platform(
    dependency_info: &DependencyInfo,
    payment_amount: u128,
) -> Result<IndividualPayout, String> {
    if dependency_info.asset == "cycles" {
        return handle_icp_platform_asset_cycles(dependency_info, payment_amount).await;
    }

    Err(format!("asset {} is not supported", dependency_info.asset))
}

async fn handle_icp_platform_asset_cycles(
    dependency_info: &DependencyInfo,
    payment_amount: u128,
) -> Result<IndividualPayout, String> {
    let principal_string = dependency_info
        .custom
        .get("principal")
        .ok_or_else(|| "missing 'principal' key".to_string())?
        .as_str()
        .ok_or_else(|| "'principal' key is not a string".to_string())?
        .to_string();
    let principal =
        candid::Principal::from_text(principal_string).map_err(|err| err.to_string())?;

    if dependency_info.payment_mechanism == "wallet" {
        ic_cdk::api::call::call_with_payment128::<(Option<()>,), ()>(
            principal,
            "wallet_receive",
            (None,),
            payment_amount,
        )
        .await
        .map_err(|err| err.1)?;

        return Ok(IndividualPayout {
            time: ic_cdk::api::time(),
            amount: payment_amount,
            principal,
        });
    }

    if dependency_info.payment_mechanism == "deposit" {
        ic_cdk::api::management_canister::main::deposit_cycles(
            ic_cdk::api::management_canister::main::CanisterIdRecord {
                canister_id: principal,
            },
            payment_amount,
        )
        .await
        .map_err(|err| err.1)?;

        return Ok(IndividualPayout {
            time: ic_cdk::api::time(),
            amount: payment_amount,
            principal,
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
        dependency_info.payment_mechanism
    ))
}
