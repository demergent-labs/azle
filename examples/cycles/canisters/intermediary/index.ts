import { ic, nat, nat64, Principal, query, Service, update, Void } from 'azle';
import Cycles from '../cycles';

export default class extends Service {
    cyclesCanister = new Cycles(
        Principal.fromText(
            process.env.CYCLES_PRINCIPAL ??
                ic.trap('process.env.CYCLES_PRINCIPAL is undefined')
        )
    );

    // Reports the number of cycles returned from the Cycles canister
    @update([], nat64)
    async sendCycles(): Promise<nat64> {
        return await ic.call(this.cyclesCanister.receiveCycles, {
            cycles: 1_000_000n
        });
    }

    @update([], Void)
    sendCyclesNotify(): Void {
        return ic.notify(this.cyclesCanister.receiveCycles, {
            cycles: 1_000_000n
        });
    }

    // Reports the number of cycles returned from the Cycles canister
    @update([], nat)
    async sendCycles128(): Promise<nat> {
        await ic.call(this.cyclesCanister.receiveCycles128, {
            cycles: 1_000_000n
        });

        return ic.msgCyclesRefunded128();
    }

    @update([], Void)
    sendCycles128Notify(): Void {
        return ic.notify(this.cyclesCanister.receiveCycles128, {
            cycles: 1_000_000n
        });
    }

    @query([], nat64)
    getCanisterBalance(): nat64 {
        return ic.canisterBalance();
    }

    @query([], nat)
    getCanisterBalance128(): nat {
        return ic.canisterBalance128();
    }
}
