import { ic, nat32, Query, Duration, TimerId, Update } from 'azle';

let single_use_timer_id: TimerId | undefined = undefined;
let repeated_timer_id: TimerId | undefined = undefined;

let _single_use_timer_called = false;
let _repeated_timer_call_count = 0;

export function start_timers(
    delay: Duration,
    interval: Duration
): Update<[TimerId, TimerId]> {
    // TODO: Consider cancelling existing timers first
    single_use_timer_id = 0n;
    repeated_timer_id = 1n;
    // single_use_timer_id = ic.set_timer(delay, one_time_timer); // TODO: Enable this
    // repeated_timer_id = ic.set_timer_interval(interval, repeated_timer); // TODO: Enable this
    console.log('Canister initialized');
    return [single_use_timer_id, repeated_timer_id];
}

export function one_time_timer(): Update<void> {
    _single_use_timer_called = true;
    console.log('one_time_timer called');
}

export function repeated_timer(): Query<void> {
    _repeated_timer_call_count++;
    let time_s = _repeated_timer_call_count === 1 ? 'time' : 'times';
    console.log(
        `repeated_timer called ${_repeated_timer_call_count} ${time_s}`
    );
}

export function clear_timer(timer_id: TimerId): Query<void> {
    // ic.clear_timer(timer_id); // TODO: Enable this
    console.log(`timer ${timer_id} cancelled`);
}

export function single_use_timer_called(): Query<boolean> {
    return _single_use_timer_called;
}

export function repeated_timer_call_count(): Query<nat32> {
    return _repeated_timer_call_count;
}
