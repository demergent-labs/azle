use anyhow::anyhow;

use crate::{get_dependency_principal, Dependency, Payment};

// TODO make the error messages a bit better
pub async fn handle_asset_payment(
    dependency: &Dependency,
    amount: u128,
) -> Result<Payment, anyhow::Error> {
    let principal = get_dependency_principal(dependency)?;

    if dependency.payment_mechanism == "wallet" {
        ic_cdk::api::call::call_with_payment128::<(Option<()>,), ()>(
            principal,
            "wallet_receive",
            (None,),
            amount,
        )
        .await
        .map_err(|err| anyhow!(err.1))?;

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
        .map_err(|err| anyhow!(err.1))?;

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

    Err(anyhow!(
        "payment mechanism {} is not supported",
        dependency.payment_mechanism
    ))
}
