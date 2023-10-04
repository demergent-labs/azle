# Timers

This chapter is a work in progress.

```typescript
import {
    blob,
    bool,
    Canister,
    Duration,
    ic,
    int8,
    query,
    Record,
    text,
    TimerId,
    update,
    Void
} from 'azle';
import { managementCanister } from 'azle/canisters/management';

const StatusReport = Record({
    single: bool,
    inline: int8,
    capture: text,
    repeat: int8,
    singleCrossCanister: blob,
    repeatCrossCanister: blob
});

const TimerIds = Record({
    single: TimerId,
    inline: TimerId,
    capture: TimerId,
    repeat: TimerId,
    singleCrossCanister: TimerId,
    repeatCrossCanister: TimerId
});

let statusReport: typeof StatusReport = {
    single: false,
    inline: 0,
    capture: '',
    repeat: 0,
    singleCrossCanister: Uint8Array.from([]),
    repeatCrossCanister: Uint8Array.from([])
};

export default Canister({
    clearTimer: update([TimerId], Void, (timerId) => {
        ic.clearTimer(timerId);
        console.log(`timer ${timerId} cancelled`);
    }),
    setTimers: update([Duration, Duration], TimerIds, (delay, interval) => {
        const capturedValue = '🚩';

        const singleId = ic.setTimer(delay, oneTimeTimerCallback);

        const inlineId = ic.setTimer(delay, () => {
            statusReport.inline = 1;
            console.log('Inline timer called');
        });

        const captureId = ic.setTimer(delay, () => {
            statusReport.capture = capturedValue;
            console.log(`Timer captured value ${capturedValue}`);
        });

        const repeatId = ic.setTimerInterval(interval, () => {
            statusReport.repeat++;
            console.log(`Repeating timer. Call ${statusReport.repeat}`);
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
    }),
    statusReport: query([], StatusReport, () => {
        return statusReport;
    })
});

function oneTimeTimerCallback() {
    statusReport.single = true;
    console.log('oneTimeTimerCallback called');
}

async function singleCrossCanisterTimerCallback() {
    console.log('singleCrossCanisterTimerCallback');

    statusReport.singleCrossCanister = await ic.call(
        managementCanister.raw_rand
    );
}

async function repeatCrossCanisterTimerCallback() {
    console.log('repeatCrossCanisterTimerCallback');

    statusReport.repeatCrossCanister = Uint8Array.from([
        ...statusReport.repeatCrossCanister,
        ...(await ic.call(managementCanister.raw_rand))
    ]);
}
```
