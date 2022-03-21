import { Rust } from '../../../../types';

// TODO we could automatically persist across upgrades by writing to stable storage here
export function generateCanisterMethodPostUpgrade(): Rust {
    return `
        #[ic_cdk_macros::post_upgrade]
        fn post_upgrade() {
            init();
        }
    `;
}