import { nat64, AzleNat64 } from '../../candid/types/primitive/nats/nat64';

/**
 * Represents a duration of time in seconds.
 */
export type Duration = nat64; // TODO: Consider modeling this after the corresponding struct in Rust
export const Duration: AzleNat64 = AzleNat64 as any;
