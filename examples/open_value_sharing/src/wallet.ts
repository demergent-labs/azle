// TODO we should pull the wallet out into its own repo
// TODO add the whitelist
// TODO add keeping track of incoming payments
// TODO use SQLite

import { Canister, ic, Opt, Record, text, update, Void } from 'azle';

const ReceiveOptions = Record({
    memo: Opt(text)
});

export default Canister({
    wallet_receive: update([Opt(ReceiveOptions)], Void, (_receiveOptions) => {
        console.log('wallet_receive');
        console.log(`cycles available: ${ic.msgCyclesAvailable128()}`);
    })
});
