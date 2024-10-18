use anyhow::anyhow;

use crate::{Dependency, Payment};

mod assets;

pub async fn handle_platform_payment(
    dependency: &Dependency,
    amount: u128,
) -> Result<Payment, anyhow::Error> {
    if dependency.asset == "cycles" {
        return assets::cycles::handle_asset_payment(dependency, amount).await;
    }

    Err(anyhow!("asset {} is not supported", dependency.asset))
}
