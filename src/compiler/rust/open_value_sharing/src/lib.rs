pub type DependencyInfo = Vec<DependencyLevel>;

pub type DependencyLevel = Vec<Dependency>;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Dependency {
    pub name: String,
    pub weight: u32,
    pub platform: String,
    pub asset: String,
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

// TODO figure out how to get this to work on mainnet and locally well
pub async fn open_value_sharing_periodic_payment(dependency_info: &DependencyInfo) {
    ic_cdk::println!("open_value_sharing_periodic_payment");

    let total_periodic_payment_amount = calculate_total_periodic_payment_amount().await;

    ic_cdk::println!(
        "total_periodic_payment_amount: {}",
        total_periodic_payment_amount
    );

    for (depth, dependency_level) in dependency_info.iter().enumerate() {
        ic_cdk::println!("depth: {}", depth);
        ic_cdk::println!("dependency_level: {:#?}", dependency_level);

        for dependency in dependency_level {
            ic_cdk::println!("dependency: {:#?}", dependency);

            let dependency_periodic_payment_amount = calculate_dependency_periodic_payment_amount(
                dependency,
                dependency_level,
                depth,
                total_periodic_payment_amount,
                depth == dependency_info.len() - 1,
            );

            if dependency.platform == "icp" {
                handle_icp_platform(dependency, dependency_periodic_payment_amount).await;
            }
        }
    }
}

// TODO do all of the balance and previous calculation stuff here
async fn calculate_total_periodic_payment_amount() -> u128 {
    1_000_000
}

// TODO we also need to take into account the total number of levels
// TODO for example if there is only one level you don't need to cut anything in half
// TODO double-check the weight calculation
fn calculate_dependency_periodic_payment_amount(
    dependency: &Dependency,
    dependency_level: &Vec<Dependency>,
    depth: usize,
    total_periodic_payment_amount: u128,
    bottom: bool,
) -> u128 {
    let adjusted_depth = depth + if bottom { 0 } else { 1 };

    let dependency_level_periodic_payment_amount =
        total_periodic_payment_amount / 2_u128.pow(adjusted_depth as u32);

    ic_cdk::println!(
        "dependency_level_periodic_payment_amount: {}",
        dependency_level_periodic_payment_amount
    );

    let total_dependency_level_weight: u32 = dependency_level
        .iter()
        .map(|dependency| dependency.weight)
        .sum();

    let dependency_ratio = dependency.weight as f64 / total_dependency_level_weight as f64;

    (dependency_level_periodic_payment_amount as f64 * dependency_ratio) as u128
}

async fn handle_icp_platform(dependency: &Dependency, payment_amount: u128) {
    if dependency.asset == "cycles" {
        handle_icp_platform_asset_cycles(dependency, payment_amount).await;
    }
}

async fn handle_icp_platform_asset_cycles(dependency: &Dependency, payment_amount: u128) {
    let principal_string = dependency
        .custom
        .get("principal")
        .unwrap()
        .as_str()
        .unwrap()
        .to_string();
    let principal = candid::Principal::from_text(principal_string).unwrap();

    if dependency.payment_mechanism == "wallet" {
        ic_cdk::println!("wallet");

        ic_cdk::api::call::call_with_payment128::<(Option<()>,), ()>(
            principal,
            "wallet_receive",
            (None,),
            payment_amount,
        ) // TODO do we need to specify None?
        .await
        .unwrap();
    }

    if dependency.payment_mechanism == "deposit" {
        ic_cdk::println!("deposit");

        ic_cdk::api::management_canister::main::deposit_cycles(
            ic_cdk::api::management_canister::main::CanisterIdRecord {
                canister_id: principal,
            },
            payment_amount,
        )
        .await
        .unwrap();
    }

    ic_cdk::println!("successfully sent {} cycles\n\n", payment_amount);

    // TODO add ledger

    // TODO should we error out or just log if this is not supported?
    // ic_cdk::println!(
    //     "payment_mechanism \"{}\" is not supported",
    //     dependency.payment_mechanism
    // );
}
