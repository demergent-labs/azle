import {
    Canister,
    ic,
    init,
    nat64,
    None,
    Opt,
    Principal,
    serialize,
    Some,
    text,
    update,
    Vec,
    Void
} from 'azle';
import Canister2 from '../canister2';
import { Account, AccountArgs } from '../canister2/types';

let canister2: typeof Canister2;

export default Canister({
    init: init([], () => {
        canister2 = Canister2(Principal.fromText(getCanister2Principal()));
    }),
    transfer: update([text, text, nat64], nat64, async (from, to, amount) => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/transfer`,
                {
                    body: serialize({
                        candidPath: '/src/canister2/index.did',
                        args: [from, to, amount]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(canister2.transfer, {
                args: [from, to, amount]
            });
        }
    }),
    balance: update([text], nat64, async (id) => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/balance`,
                {
                    body: serialize({
                        candidPath: '/src/canister2/index.did',
                        args: [id]
                    })
                }
            );
            const responseJson = response.json();

            return responseJson;
        } else {
            return await ic.call(canister2.balance, {
                args: [id]
            });
        }
    }),
    account: update([AccountArgs], Opt(Account), async (args) => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/account`,
                {
                    body: serialize({
                        candidPath: '/src/canister2/index.did',
                        args: [args]
                    })
                }
            );
            const responseJson = await response.json();

            if (responseJson.length === 1) {
                return Some(responseJson[0]);
            } else {
                return None;
            }
        } else {
            return await ic.call(canister2.account, {
                args: [args]
            });
        }
    }),
    accounts: update([], Vec(Account), async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/accounts`,
                {
                    body: serialize({
                        candidPath: '/src/canister2/index.did',
                        args: []
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(canister2.accounts, {
                args: []
            });
        }
    }),
    trap: update([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/trap`,
                {
                    body: serialize({
                        candidPath: '/src/canister2/index.did',
                        args: []
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(canister2.trap, {
                args: []
            });
        }
    }),
    sendNotification: update([], Void, () => {
        // TODO for now there seems to be no fetch analogy because notify must be synchronous
        // TODO and fetch must be asynchronous
        return ic.notify(canister2.receiveNotification, {
            args: ['This is the notification'],
            cycles: 10n
        });
    })
});

function getCanister2Principal(): string {
    if (process.env.CANISTER2_PRINCIPAL !== undefined) {
        return process.env.CANISTER2_PRINCIPAL;
    }

    throw new Error(`process.env.CANISTER2_PRINCIPAL is not defined`);
}
