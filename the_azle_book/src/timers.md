# Timers

This chapter is a work in progress.

```typescript
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
import { managementCanister } from 'azle/canisters/management';

type StatusReport = Record<{
    single: boolean;
    inline: int8;
    capture: string;
    repeat: int8;
    singleCrossCanister: blob;
    repeatCrossCanister: blob;
}>;

type TimerIds = Record<{
    single: TimerId;
    inline: TimerId;
    capture: TimerId;
    repeat: TimerId;
    singleCrossCanister: TimerId;
    repeatCrossCanister: TimerId;
}>;

let status: StatusReport = {
    single: false,
    inline: 0,
    capture: '',
    repeat: 0,
    singleCrossCanister: Uint8Array.from([]),
    repeatCrossCanister: Uint8Array.from([])
};

$update;
export function clearTimer(timerId: TimerId): void {
    ic.clearTimer(timerId);
    console.log(`timer ${timerId} cancelled`);
}

$update;
export function setTimers(delay: Duration, interval: Duration): TimerIds {
    const capturedValue = '🚩';

    const singleId = ic.setTimer(delay, oneTimeTimerCallback);

    const inlineId = ic.setTimer(delay, () => {
        status.inline = 1;
        console.log('Inline timer called');
    });

    const captureId = ic.setTimer(delay, () => {
        status.capture = capturedValue;
        console.log(`Timer captured value ${capturedValue}`);
    });

    const repeatId = ic.setTimerInterval(interval, () => {
        status.repeat++;
        console.log(`Repeating timer. Call ${status.repeat}`);
    });

    const singleCrossCanisterId = ic.setTimer(
        delay,
        singleCrossCanisterTimerCallback
    );

    const repeatCrossCanisterId = ic.setTimerInterval(
        interval,
        repeatCrossCanisterTimerCallback
    );

    return {
        single: singleId,
        inline: inlineId,
        capture: captureId,
        repeat: repeatId,
        singleCrossCanister: singleCrossCanisterId,
        repeatCrossCanister: repeatCrossCanisterId
    };
}

$query;
export function statusReport(): StatusReport {
    return status;
}

function oneTimeTimerCallback(): void {
    status.single = true;
    console.log('oneTimeTimerCallback called');
}

async function singleCrossCanisterTimerCallback(): Promise<void> {
    console.log('singleCrossCanisterTimerCallback');

    const result = await managementCanister.raw_rand().call();

    match(result, {
        Ok: (ok) => {
            status.singleCrossCanister = ok;
        },
        Err: (err) => ic.trap(err)
    });
}

async function repeatCrossCanisterTimerCallback(): Promise<void> {
    console.log('repeatCrossCanisterTimerCallback');

    const result = await managementCanister.raw_rand().call();

    match(result, {
        Ok: (ok) => {
            status.repeatCrossCanister = Uint8Array.from([
                ...status.repeatCrossCanister,
                ...ok
            ]);
        },
        Err: (err) => ic.trap(err)
    });
}
```
