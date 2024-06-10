use anyhow::Context;
use std::cell::RefCell;
use std::collections::BTreeMap;

mod platforms;
mod query_methods;

#[cfg(test)]
mod test;

thread_local! {
    static CYCLE_BALANCE_PREVIOUS: RefCell<u128> = RefCell::new(0);
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
    pub payment_mechanism: String,
    pub principal: candid::Principal,
    pub amount: u128,
    pub success: Result<(), String>,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct Consumer {
    #[serde(rename = "killSwitch")]
    pub kill_switch: bool,
    pub platforms: Vec<String>,
    pub assets: Vec<String>,
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

pub async fn init(consumer: &Consumer) {
    if consumer.kill_switch == true {
        return;
    }

    if !consumer.platforms.contains(&"icp".to_string()) {
        ic_cdk::eprintln!("OpenValueSharing: platform \"icp\" is not supported by the consumer");
        return;
    }

    if !consumer.assets.contains(&"cycles".to_string()) {
        ic_cdk::eprintln!("OpenValueSharing: asset \"cycles\" is not supported by the consumer");
        return;
    }

    if consumer.sharing_heuristic != "BURNED_WEIGHTED_HALVING" {
        ic_cdk::eprintln!(
            "OpenValueSharing: heuristic \"{}\" is not supported. Only BURNED_WEIGHTED_HALVING is currently supported",
            consumer.sharing_heuristic
        );
        return;
    }

    if consumer.shared_percentage > 100 {
        ic_cdk::eprintln!("OpenValueSharing: shared percentage cannot be greater than 100");
        return;
    }

    if consumer.period == 0 {
        ic_cdk::eprintln!("OpenValueSharing: period cannot be 0");
        return;
    }

    spawn_next_timer(consumer).await;

    let process_batch_result = process_batch(consumer).await;

    if let Err(err) = process_batch_result {
        ic_cdk::eprintln!("OpenValueSharing: {}", err);
    }
}

async fn spawn_next_timer(consumer: &Consumer) {
    let delay = core::time::Duration::new((consumer.period * 60) as u64, 0);
    let consumer_cloned = consumer.clone();

    ic_cdk_timers::set_timer(delay, || {
        ic_cdk::spawn(async move {
            init(&consumer_cloned).await;
        });
    });
}

async fn process_batch(consumer: &Consumer) -> Result<(), anyhow::Error> {
    let time_start = ic_cdk::api::time();

    let total_amount = calculate_total_amount(&consumer).await;

    if total_amount == 0 {
        record_periodic_batch(time_start, total_amount, vec![]);
        return Ok(());
    }

    // We are keeping this mutation because trying to send out all payment
    // cross-canister calls without awaiting each one sequentially might
    // fill up the canister queue too quickly.
    // This is a conservative and simple way to do it.
    // We could possibly do some kind of async reduce or recursive function
    // but this seems simple enough and seems unlikely to lead to major mutation issues
    let mut payments: Vec<Payment> = vec![];

    for dependency in &consumer.dependencies {
        let amount = calculate_payment_amount(
            dependency,
            &consumer.depth_weights,
            total_amount,
            dependency.depth
                == *consumer
                    .depth_weights
                    .last_key_value()
                    .context("depth_weights does not have a last_key_value")?
                    .0,
        )?;

        if amount == 0 {
            payments.push(Payment {
                name: dependency.name.clone(),
                payment_mechanism: dependency.payment_mechanism.clone(),
                time: ic_cdk::api::time(),
                amount: 0,
                principal: get_dependency_principal(dependency)?,
                success: Ok(()),
            });

            continue;
        }

        if dependency.platform == "icp" {
            let payment_result = platforms::icp::handle_platform_payment(&dependency, amount).await;

            match payment_result {
                Ok(payment) => payments.push(payment),
                Err(err) => {
                    payments.push(Payment {
                        name: dependency.name.clone(),
                        payment_mechanism: dependency.payment_mechanism.clone(),
                        time: ic_cdk::api::time(),
                        amount,
                        principal: get_dependency_principal(dependency)?,
                        success: Err(err.to_string()),
                    });
                }
            };
        }
    }

    record_periodic_batch(time_start, total_amount, payments);

    Ok(())
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

fn record_periodic_batch(time_start: u64, total_amount: u128, payments: Vec<Payment>) {
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

fn calculate_payment_amount(
    dependency: &Dependency,
    depth_weights: &DepthWeights,
    total_amount: u128,
    bottom: bool,
) -> Result<u128, anyhow::Error> {
    let adjusted_depth = dependency.depth + if bottom { 0 } else { 1 };

    let total_amount_for_level = total_amount / 2_u128.pow(adjusted_depth as u32);

    let total_weight_for_level = *depth_weights.get(&dependency.depth).context(format!(
        "depth_weights value for depth {} not found",
        dependency.depth,
    ))?;

    let dependency_ratio =
        dependency.weight as u128 * total_amount / total_weight_for_level as u128;

    Ok(total_amount_for_level * dependency_ratio / total_amount)
}

fn get_dependency_principal(dependency: &Dependency) -> Result<candid::Principal, anyhow::Error> {
    let principal_string = dependency
        .custom
        .get("principal")
        .context("missing 'principal' key")?
        .as_str()
        .context("'principal' key is not a string".to_string())?
        .to_string();
    let principal = candid::Principal::from_text(principal_string)?;

    Ok(principal)
}
