// TODO we should pull the wallet out into its own repo

import {
    Canister,
    ic,
    nat,
    nat64,
    Opt,
    Principal,
    query,
    Record,
    text,
    update,
    Vec,
    Void
} from 'azle';

let payments: Payment[] = [];

let principalsWhitelist: string[] = [];

const Payment = Record({
    time: nat64,
    amount: nat,
    principal: Principal
});
type Payment = typeof Payment.tsType;

const ReceiveOptions = Record({
    memo: Opt(text)
});

export default Canister({
    add_to_whitelist: update([Principal], Void, (principal) => {
        principalsWhitelist.push(principal.toText());
    }),
    remove_from_whitelist: update([Principal], Void, (principal) => {
        principalsWhitelist = principalsWhitelist.filter(
            (principalTextInList) => principalTextInList !== principal.toText()
        );
    }),
    get_whitelist: query([], Vec(text), () => {
        return principalsWhitelist;
    }),
    get_all_payments: query([], Vec(Payment), () => {
        return payments;
    }),
    wallet_receive: update([Opt(ReceiveOptions)], Void, (_receiveOptions) => {
        console.log('wallet_receive');
        console.log(`cycles available: ${ic.msgCyclesAvailable128()}`);

        const callerInWhitelist = principalsWhitelist.includes(
            ic.caller().toText()
        );

        if (callerInWhitelist) {
            const cyclesAvailable = ic.msgCyclesAvailable128();

            ic.msgCyclesAccept128(cyclesAvailable);

            payments.push({
                time: ic.time(),
                amount: cyclesAvailable,
                principal: ic.caller()
            });
        }
    })
});
