import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    clear_timer: ActorMethod<[bigint], undefined>;
    one_time_timer: ActorMethod<[], undefined>;
    repeated_timer: ActorMethod<[], undefined>;
    repeated_timer_call_count: ActorMethod<[], number>;
    single_use_timer_called: ActorMethod<[], boolean>;
    start_timers: ActorMethod<[bigint, bigint], [bigint, bigint]>;
}
