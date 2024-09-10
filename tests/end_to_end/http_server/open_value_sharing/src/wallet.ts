// TODO we should pull the wallet out into its own repo

import {
    caller,
    IDL,
    msgCyclesAccept,
    msgCyclesAvailable,
    Principal,
    query,
    time,
    update
} from 'azle';

const Payment = IDL.Record({
    time: IDL.Nat64,
    amount: IDL.Nat,
    principal: IDL.Principal
});
type Payment = {
    time: bigint;
    amount: bigint;
    principal: Principal;
};

const ReceiveOptions = IDL.Record({
    memo: IDL.Opt(IDL.Text)
});

export default class {
    payments: Payment[] = [];
    principalsWhitelist: string[] = [];

    @update([IDL.Principal])
    add_to_whitelist(principal: Principal): void {
        this.principalsWhitelist.push(principal.toText());
    }

    @update([IDL.Principal])
    remove_from_whitelist(principal: Principal): void {
        this.principalsWhitelist = this.principalsWhitelist.filter(
            (principalTextInList) => principalTextInList !== principal.toText()
        );
    }

    @query([], IDL.Vec(IDL.Text))
    get_whitelist(): string[] {
        return this.principalsWhitelist;
    }

    @query([], IDL.Vec(Payment))
    get_all_payments(): Payment[] {
        return this.payments;
    }

    @update([IDL.Opt(ReceiveOptions)])
    wallet_receive(_receiveOptions: [{ memo: [string] | [] }] | []): void {
        console.info('wallet_receive');
        console.info(`cycles available: ${msgCyclesAvailable()}`);

        const callerInWhitelist = this.principalsWhitelist.includes(
            caller().toText()
        );

        if (callerInWhitelist) {
            const cyclesAvailable = msgCyclesAvailable();

            msgCyclesAccept(cyclesAvailable);

            this.payments.push({
                time: time(),
                amount: cyclesAvailable,
                principal: caller()
            });
        }
    }
}
