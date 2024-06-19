import { ic, IDL, query, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

const StatusReport = IDL.Record({
    single: IDL.Bool,
    inline: IDL.Int8,
    capture: IDL.Text,
    repeat: IDL.Int8,
    singleCrossCanister: IDL.Vec(IDL.Nat8),
    repeatCrossCanister: IDL.Vec(IDL.Nat8)
});
type StatusReport = {
    single: boolean;
    inline: number;
    capture: string;
    repeat: number;
    singleCrossCanister: Uint8Array;
    repeatCrossCanister: Uint8Array;
};

const TimerIds = IDL.Record({
    single: IDL.Nat64,
    inline: IDL.Nat64,
    capture: IDL.Nat64,
    repeat: IDL.Nat64,
    singleCrossCanister: IDL.Nat64,
    repeatCrossCanister: IDL.Nat64
});
type TimerIds = {
    single: bigint;
    inline: bigint;
    capture: bigint;
    repeat: bigint;
    singleCrossCanister: bigint;
    repeatCrossCanister: bigint;
};

let statusReport: StatusReport = {
    single: false,
    inline: 0,
    capture: '',
    repeat: 0,
    singleCrossCanister: Uint8Array.from([]),
    repeatCrossCanister: Uint8Array.from([])
};

export default class {
    @update([IDL.Nat64])
    clearTimer(timerId: bigint): void {
        ic.clearTimer(timerId);
        console.log(`timer ${timerId} cancelled`);
    }

    @update([IDL.Nat64, IDL.Nat64], TimerIds)
    setTimers(delay: bigint, interval: bigint): TimerIds {
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
    }

    @query([], StatusReport)
    statusReport() {
        return statusReport;
    }
}

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

async function getRandomness(): Promise<Uint8Array> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(`icp://aaaaa-aa/raw_rand`);
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await ic.call(managementCanister.raw_rand);
    }
}
