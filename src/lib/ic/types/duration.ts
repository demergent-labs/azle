import { AzleNat64, nat64 } from '../../candid/types/primitive/nats/nat64';

/**
 * Represents a duration of time in seconds.
 */
export const Duration = AzleNat64;
export type Duration = nat64; // TODO: Consider modeling this after the corresponding struct in Rust
