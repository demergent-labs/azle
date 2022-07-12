import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface PerformanceStats {
    get_bytes: Array<bigint>;
}
export interface _SERVICE {
    get_bytes: ActorMethod<[Array<number>], Array<number>>;
    get_performance_states: ActorMethod<[], PerformanceStats>;
}
