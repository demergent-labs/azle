use anyhow::anyhow;

use crate::{get_dependency_principal, Dependency, Payment};

pub async fn handle_asset_payment(
    dependency: &Dependency,
    amount: u128,
) -> Result<Payment, anyhow::Error> {
    let principal = get_dependency_principal(dependency)?;

    if dependency.payment_mechanism == "wallet_receive" {
        ic_cdk::api::call::call_with_payment128::<(Option<()>,), ()>(
            principal,
            "wallet_receive",
            (None,),
            amount,
        )
        .await
        .map_err(|(rejection_code, message)| {
            anyhow!("RejectionCode {}: {}", rejection_code as i32, message)
        })?;

        let amount_refunded = ic_cdk::api::call::msg_cycles_refunded128();
        let amount_final = amount - amount_refunded;

        return Ok(Payment {
            name: dependency.name.clone(),
            time: ic_cdk::api::time(),
            amount: amount_final,
            principal,
            success: Ok(()),
        });
    }

    if dependency.payment_mechanism == "deposit_cycles" {
        ic_cdk::api::management_canister::main::deposit_cycles(
            ic_cdk::api::management_canister::main::CanisterIdRecord {
                canister_id: principal,
            },
            amount,
        )
        .await
        .map_err(|(rejection_code, message)| {
            anyhow!("RejectionCode {}: {}", rejection_code as i32, message)
        })?;

        return Ok(Payment {
            name: dependency.name.clone(),
            time: ic_cdk::api::time(),
            amount,
            principal,
            success: Ok(()),
        });
    }

    // TODO add cycles ledger support, we are waiting on cycles ledger maturity
    // if dependency.payment_mechanism == "icrc1_transfer" {
    //     let cycles_ledger_canister_id = candid::Principal::from_text("")?;

    //     ic_cdk::api::call::call_with_payment128::<(Option<()>,), ()>(
    //         cycles_ledger_canister_id,
    //         "icrc1_transfer",
    //         (None,), // TODO figure out types
    //         amount,
    //     )
    //     .await
    //     .map_err(|(rejection_code, message)| {
    //         anyhow!("RejectionCode {}: {}", rejection_code as i32, message)
    //     })?;

    //     return Ok(Payment {
    //         name: dependency.name.clone(),
    //         time: ic_cdk::api::time(),
    //         amount,
    //         principal,
    //         success: Ok(()),
    //     });
    // }

    Err(anyhow!(
        "payment mechanism {} is not supported",
        dependency.payment_mechanism
    ))
}
