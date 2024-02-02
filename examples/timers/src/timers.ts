import {
    blob,
    bool,
    Canister,
    Duration,
    ic,
    int8,
    query,
    Record,
    serialize,
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
type StatusReport = typeof StatusReport.tsType;

const TimerIds = Record({
    single: TimerId,
    inline: TimerId,
    capture: TimerId,
    repeat: TimerId,
    singleCrossCanister: TimerId,
    repeatCrossCanister: TimerId
});
type TimerIds = typeof TimerIds.tsType;

let statusReport: StatusReport = {
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

    statusReport.singleCrossCanister = await getRandomness();
}

async function repeatCrossCanisterTimerCallback() {
    console.log('repeatCrossCanisterTimerCallback');

    statusReport.repeatCrossCanister = Uint8Array.from([
        ...statusReport.repeatCrossCanister,
        ...(await getRandomness())
    ]);
}

async function getRandomness(): Promise<blob> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(`icp://aaaaa-aa/raw_rand`);
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await ic.call(managementCanister.raw_rand);
    }
}
