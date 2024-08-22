import {
    blob,
    bool,
    Canister,
    ic,
    int8,
    nat64,
    query,
    Record,
    text,
    update,
    Void
} from 'azle/experimental';
import { managementCanister } from 'azle/experimental/canisters/management';

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
    single: nat64,
    inline: nat64,
    capture: nat64,
    repeat: nat64,
    singleCrossCanister: nat64,
    repeatCrossCanister: nat64
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
    clearTimer: update([nat64], Void, (timerId) => {
        ic.clearTimer(timerId);
        console.info(`timer ${timerId} cancelled`);
    }),
    setTimers: update([nat64, nat64], TimerIds, (delay, interval) => {
        const capturedValue = '🚩';

        const singleId = ic.setTimer(delay, oneTimeTimerCallback);

        const inlineId = ic.setTimer(delay, () => {
            statusReport.inline = 1;
            console.info('Inline timer called');
        });

        const captureId = ic.setTimer(delay, () => {
            statusReport.capture = capturedValue;
            console.info(`Timer captured value ${capturedValue}`);
        });

        const repeatId = ic.setTimerInterval(interval, () => {
            statusReport.repeat++;
            console.info(`Repeating timer. Call ${statusReport.repeat}`);
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

function oneTimeTimerCallback(): void {
    statusReport.single = true;
    console.info('oneTimeTimerCallback called');
}

async function singleCrossCanisterTimerCallback(): Promise<void> {
    console.info('singleCrossCanisterTimerCallback');

    statusReport.singleCrossCanister = await getRandomness();
}

async function repeatCrossCanisterTimerCallback(): Promise<void> {
    console.info('repeatCrossCanisterTimerCallback');

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
