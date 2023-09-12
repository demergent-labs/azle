import { ic, Manual, nat, Principal, query, Service, text, update } from 'azle';
import Canister3 from '../canister3';

export default class extends Service {
    canister3 = new Canister3(
        Principal.fromText(
            process.env.CANISTER3_PRINCIPAL ??
                ic.trap('process.env.CANISTER3_PRINCIPAL is undefined')
        )
    );

    counter: nat = 0n;

    // TODO is this supposed to be a query?
    @query([], nat)
    async incCounter(): Promise<nat> {
        this.counter += 1n;
        return this.counter;
    }

    @query([], text)
    simpleQuery(): text {
        return 'Hello from Canister 2';
    }

    @update([], text)
    updateQuery(): text {
        return 'Hello from a Canister 2 update';
    }

    @query([], text)
    manualQuery(): Manual<text> {
        ic.reply('Hello from Canister 2 manual query', text);
    }

    @query([], text)
    async deepQuery(): Promise<text> {
        return await ic.call(this.canister3.deepQuery);
    }
}
