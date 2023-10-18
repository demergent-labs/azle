import { nat64, AzleNat64 } from '../../candid/types/primitive/nats/nat64';

/**
 * Type returned by the {@link ic.setTimer} and {@link ic.setTimerInterval}
 * functions. Pass to {@link ic.clearTimer} to remove the timer.
 */
export type TimerId = nat64; // TODO: Consider modeling this after the corresponding struct in Rust
export const TimerId: AzleNat64 = AzleNat64 as any;
