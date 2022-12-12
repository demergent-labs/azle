import { ic, Query, Duration, TimerId, Update } from 'azle';

let _single_use_timer_called = false;

export function set_timer(delay: Duration): Update<TimerId> {
    return ic.set_timer(delay, one_time_timer);
}

export function set_inline_timer(delay: Duration): Update<TimerId> {
    ic.set_timer(delay, () => {
        console.log('First inline timer in JS');
    });
    return ic.set_timer(delay, () => {
        console.log('Second inline timer in JS');
    });
}

export function clear_timer(timer_id: TimerId): Update<void> {
    ic.clear_timer(timer_id);
    console.log(`timer ${timer_id} cancelled`);
}

export function single_use_timer_called(): Query<boolean> {
    return _single_use_timer_called;
}

function one_time_timer(): void {
    _single_use_timer_called = true;
    console.log('one_time_timer called');
}

function something_else(): void {
    console.log('something_else called');
}
