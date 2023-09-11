import {
    blob,
    bool,
    candid,
    Duration,
    ic,
    int8,
    nat64,
    query,
    Record,
    Service,
    text,
    TimerId,
    update,
    Void
} from 'azle';
import { managementCanister } from 'azle/canisters/management';

class StatusReport extends Record {
    @candid(bool)
    single: bool;

    @candid(int8)
    inline: int8;

    @candid(text)
    capture: text;

    @candid(int8)
    repeat: int8;

    @candid(blob)
    singleCrossCanister: blob;

    @candid(blob)
    repeatCrossCanister: blob;
}

class TimerIds extends Record {
    @candid(nat64)
    single: TimerId;

    @candid(nat64)
    inline: TimerId;

    @candid(nat64)
    capture: TimerId;

    @candid(nat64)
    repeat: TimerId;

    @candid(nat64)
    singleCrossCanister: TimerId;

    @candid(nat64)
    repeatCrossCanister: TimerId;
}

export default class extends Service {
    status: StatusReport = {
        single: false,
        inline: 0,
        capture: '',
        repeat: 0,
        singleCrossCanister: Uint8Array.from([]),
        repeatCrossCanister: Uint8Array.from([])
    };

    @update([nat64], Void)
    clearTimer(timerId: TimerId): Void {
        ic.clearTimer(timerId);
        console.log(`timer ${timerId} cancelled`);
    }

    @update([nat64, nat64], TimerIds)
    setTimers(delay: Duration, interval: Duration): TimerIds {
        const capturedValue = '🚩';

        const singleId = ic.setTimer(delay, this.oneTimeTimerCallback);

        const inlineId = ic.setTimer(delay, () => {
            this.status.inline = 1;
            console.log('Inline timer called');
        });

        const captureId = ic.setTimer(delay, () => {
            this.status.capture = capturedValue;
            console.log(`Timer captured value ${capturedValue}`);
        });

        const repeatId = ic.setTimerInterval(interval, () => {
            this.status.repeat++;
            console.log(`Repeating timer. Call ${this.status.repeat}`);
        });

        const singleCrossCanisterId = ic.setTimer(
            delay,
            this.singleCrossCanisterTimerCallback
        );

        const repeatCrossCanisterId = ic.setTimerInterval(
            interval,
            this.repeatCrossCanisterTimerCallback
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
        return this.status;
    }

    oneTimeTimerCallback(): Void {
        this.status.single = true;
        console.log('oneTimeTimerCallback called');
    }

    async singleCrossCanisterTimerCallback(): Promise<Void> {
        console.log('singleCrossCanisterTimerCallback');

        this.status.singleCrossCanister = await ic.call(
            managementCanister.raw_rand
        );
    }

    async repeatCrossCanisterTimerCallback(): Promise<void> {
        console.log('repeatCrossCanisterTimerCallback');

        this.status.repeatCrossCanister = Uint8Array.from([
            ...this.status.repeatCrossCanister,
            ...(await ic.call(managementCanister.raw_rand))
        ]);
    }
}
