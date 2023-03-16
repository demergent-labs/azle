import {
    blob,
    Duration,
    ic,
    int8,
    match,
    $query,
    Record,
    TimerId,
    $update
} from 'azle';
import { management_canister } from 'azle/canisters/management';

type StatusReport = Record<{
    single: boolean;
    inline: int8;
    capture: string;
    repeat: int8;
    single_cross_canister: blob;
    repeat_cross_canister: blob;
}>;

type TimerIds = Record<{
    single: TimerId;
    inline: TimerId;
    capture: TimerId;
    repeat: TimerId;
    single_cross_canister: TimerId;
    repeat_cross_canister: TimerId;
}>;

let status: StatusReport = {
    single: false,
    inline: 0,
    capture: '',
    repeat: 0,
    single_cross_canister: Uint8Array.from([]),
    repeat_cross_canister: Uint8Array.from([])
};

$update;
export function clear_timer(timer_id: TimerId): void {
    ic.clear_timer(timer_id);
    console.log(`timer ${timer_id} cancelled`);
}

$update;
export function set_timers(delay: Duration, interval: Duration): TimerIds {
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

    const single_cross_canister_id = ic.set_timer(
        delay,
        single_cross_canister_timer_callback
    );

    const repeat_cross_canister_id = ic.set_timer_interval(
        interval,
        repeat_cross_canister_timer_callback
    );

    return {
        single: single_id,
        inline: inline_id,
        capture: capture_id,
        repeat: repeat_id,
        single_cross_canister: single_cross_canister_id,
        repeat_cross_canister: repeat_cross_canister_id
    };
}

$query;
export function status_report(): StatusReport {
    return status;
}

function one_time_timer_callback(): void {
    status.single = true;
    console.log('one_time_timer_callback called');
}

async function single_cross_canister_timer_callback(): Promise<void> {
    console.log('single_cross_canister_timer_callback');

    const result = await management_canister.raw_rand().call();

    match(result, {
        ok: (ok) => {
            status.single_cross_canister = ok;
        },
        err: (err) => ic.trap(err)
    });
}

async function repeat_cross_canister_timer_callback(): Promise<void> {
    console.log('repeat_cross_canister_timer_callback');

    const result = await management_canister.raw_rand().call();

    match(result, {
        ok: (ok) => {
            status.repeat_cross_canister = Uint8Array.from([
                ...status.repeat_cross_canister,
                ...ok
            ]);
        },
        err: (err) => ic.trap(err)
    });
}
