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
    inline: IDL.Nat32,
    capture: IDL.Text,
    repeat: IDL.Nat32,
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

const initialStatusReport: StatusReport = {
    single: false,
    inline: 0,
    capture: '',
    repeat: 0,
    singleCrossCanister: Uint8Array.from([]),
    repeatCrossCanister: Uint8Array.from([])
};

export default class Canister {
    statusReport: StatusReport = initialStatusReport;

    @update([IDL.Nat64])
    clearTimer(timerId: bigint): void {
        clearTimer(timerId);
        console.info(`timer ${timerId} cancelled`);
    }

    @update([IDL.Nat32, IDL.Nat32], TimerIds)
    setTimers(delay: number, interval: number): TimerIds {
        const capturedValue = '🚩';

        const singleId = setTimer(delay, () => oneTimeTimerCallback(this));

        const inlineId = setTimer(delay, () => {
            this.statusReport.inline = 1;
            console.info('Inline timer called');
        });

        const captureId = setTimer(delay, () => {
            this.statusReport.capture = capturedValue;
            console.info(`Timer captured value ${capturedValue}`);
        });

        const repeatId = setTimerInterval(interval, () => {
            this.statusReport.repeat++;
            console.info(`Repeating timer. Call ${this.statusReport.repeat}`);

            if (this.statusReport.repeat >= 2) {
                clearTimer(repeatId);
            }
        });

        const singleCrossCanisterId = setTimer(delay, () =>
            singleCrossCanisterTimerCallback(this)
        );

        const repeatCrossCanisterId = setTimerInterval(interval, async () => {
            await repeatCrossCanisterTimerCallback(this);

            if (this.statusReport.repeatCrossCanister.length >= 64) {
                clearTimer(repeatCrossCanisterId);
            }
        });

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
    getStatusReport(): StatusReport {
        return this.statusReport;
    }

    @update
    clearStatusReport(): void {
        this.statusReport = initialStatusReport;
    }
}

function oneTimeTimerCallback(canister: Canister): void {
    canister.statusReport.single = true;
    console.info('oneTimeTimerCallback called');
}

async function singleCrossCanisterTimerCallback(
    canister: Canister
): Promise<void> {
    console.info('singleCrossCanisterTimerCallback');

    canister.statusReport.singleCrossCanister = await getRandomness();
}

async function repeatCrossCanisterTimerCallback(
    canister: Canister
): Promise<void> {
    console.info('repeatCrossCanisterTimerCallback');

    if (canister.statusReport.repeatCrossCanister.length < 64) {
        canister.statusReport.repeatCrossCanister = Uint8Array.from([
            ...canister.statusReport.repeatCrossCanister,
            ...(await getRandomness())
        ]);
    }
}

async function getRandomness(): Promise<Uint8Array> {
    return await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
        returnIdlType: IDL.Vec(IDL.Nat8)
    });
}
