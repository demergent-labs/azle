import {
    call,
    clearTimer,
    IDL,
    query,
    setTimer,
    setTimerInterval,
    update
} from 'azle';

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
        clearTimer(timerId);
        console.info(`timer ${timerId} cancelled`);
    }

    @update([IDL.Nat64, IDL.Nat64], TimerIds)
    setTimers(delay: bigint, interval: bigint): TimerIds {
        const capturedValue = '🚩';

        const singleId = setTimer(delay, oneTimeTimerCallback);

        const inlineId = setTimer(delay, () => {
            statusReport.inline = 1;
            console.info('Inline timer called');
        });

        const captureId = setTimer(delay, () => {
            statusReport.capture = capturedValue;
            console.info(`Timer captured value ${capturedValue}`);
        });

        const repeatId = setTimerInterval(interval, () => {
            statusReport.repeat++;
            console.info(`Repeating timer. Call ${statusReport.repeat}`);
        });

        const singleCrossCanisterId = setTimer(
            delay,
            singleCrossCanisterTimerCallback
        );

        const repeatCrossCanisterId = setTimerInterval(
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
    statusReport(): StatusReport {
        return statusReport;
    }
}

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

async function getRandomness(): Promise<Uint8Array> {
    return await call('aaaaa-aa', 'raw_rand', {
        returnIdlType: IDL.Vec(IDL.Nat8)
    });
}
