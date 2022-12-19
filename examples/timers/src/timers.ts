import { Duration, ic, int8, Query, TimerId, Update } from 'azle';

type StatusReport = {
    single: boolean;
    inline1: int8;
    inline2: int8;
    repeat: int8;
};

type TimerIds = {
    single: TimerId;
    inline1: TimerId;
    inline2: TimerId;
    repeat: TimerId;
};

let status: StatusReport = {
    single: false,
    inline1: 0,
    inline2: 0,
    repeat: 0
};

export function set_timers(
    delay: Duration,
    interval: Duration
): Update<TimerIds> {
    const single_id = ic.set_timer(delay, one_time_timer_callback);
    const inline1_id = ic.set_timer(delay, () => {
        status.inline1 = 1;
        console.log('Inline timer 1 called');
    });
    const inline2_id = ic.set_timer(delay, () => {
        status.inline2 = 2;
        console.log('Inline timer 2 called');
    });
    const repeat_id = ic.set_timer_interval(interval, () => {
        status.repeat++;
        console.log(`Repeating timer. Call ${status.repeat}`);
    });
    return {
        single: single_id,
        inline1: inline1_id,
        inline2: inline2_id,
        repeat: repeat_id
    };
}

export function clear_timer(timer_id: TimerId): Update<void> {
    ic.clear_timer(timer_id);
    console.log(`timer ${timer_id} cancelled`);
}

export function status_report(): Query<StatusReport> {
    return status;
}

function one_time_timer_callback(): void {
    status.single = true;
    console.log('one_time_timer_callback called');
}
