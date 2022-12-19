import { Duration, ic, int8, Query, TimerId, Update } from 'azle';

type StatusReport = {
    single: boolean;
    inline: int8;
    capture: string;
    repeat: int8;
};

type TimerIds = {
    single: TimerId;
    inline: TimerId;
    capture: TimerId;
    repeat: TimerId;
};

let status: StatusReport = {
    single: false,
    inline: 0,
    capture: '',
    repeat: 0
};

export function clear_timer(timer_id: TimerId): Update<void> {
    ic.clear_timer(timer_id);
    console.log(`timer ${timer_id} cancelled`);
}

export function set_timers(
    delay: Duration,
    interval: Duration
): Update<TimerIds> {
    const captured_value = '🚩';

    const single_id = ic.set_timer(delay, one_time_timer_callback);

    const inline_id = ic.set_timer(delay, () => {
        status.inline = 1;
        console.log('Inline timer called');
    });

    const capture_id = ic.set_timer(delay, () => {
        status.capture = captured_value;
        console.log(`Timer captured value ${captured_value}`);
    });

    const repeat_id = ic.set_timer_interval(interval, () => {
        status.repeat++;
        console.log(`Repeating timer. Call ${status.repeat}`);
    });

    return {
        single: single_id,
        inline: inline_id,
        capture: capture_id,
        repeat: repeat_id
    };
}

export function status_report(): Query<StatusReport> {
    return status;
}

function one_time_timer_callback(): void {
    status.single = true;
    console.log('one_time_timer_callback called');
}
