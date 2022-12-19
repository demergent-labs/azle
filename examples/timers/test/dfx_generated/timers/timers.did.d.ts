import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface StatusReport {
    repeat: number;
    inline: number;
    capture: string;
    single: boolean;
}
export interface TimerIds {
    repeat: bigint;
    inline: bigint;
    capture: bigint;
    single: bigint;
}
export interface _SERVICE {
    clear_timer: ActorMethod<[bigint], undefined>;
    set_timers: ActorMethod<[bigint, bigint], TimerIds>;
    status_report: ActorMethod<[], StatusReport>;
}
