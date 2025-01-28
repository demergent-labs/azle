import { call, IDL, notify } from 'azle';
import {
    Canister,
    nat64,
    None,
    Opt,
    serialize,
    Some,
    text,
    update,
    Vec,
    Void
} from 'azle/experimental';

import { Account, AccountArgs } from '../canister2/types';

export default Canister({
    transfer: update([text, text, nat64], nat64, async (from, to, amount) => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/transfer`,
                {
                    body: serialize({
                        candidPath: '/candid/canister2.did',
                        args: [from, to, amount]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(getCanister2Principal(), 'transfer', {
                paramIdlTypes: [IDL.Text, IDL.Text, IDL.Nat64],
                returnIdlType: IDL.Nat64,
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
                        candidPath: '/candid/canister2.did',
                        args: [id]
                    })
                }
            );
            const responseJson = response.json();

            return responseJson;
        } else {
            return await call(getCanister2Principal(), 'balance', {
                paramIdlTypes: [IDL.Text],
                returnIdlType: IDL.Nat64,
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
                        candidPath: '/candid/canister2.did',
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
            const AccountIdl = IDL.Record({
                id: IDL.Text,
                balance: IDL.Nat64
            });
            const AccountArgsIdl = IDL.Record({
                id: IDL.Text
            });

            return await call(getCanister2Principal(), 'account', {
                paramIdlTypes: [AccountArgsIdl],
                returnIdlType: IDL.Opt(AccountIdl),
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
                        candidPath: '/candid/canister2.did',
                        args: []
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            const AccountIdl = IDL.Record({
                id: IDL.Text,
                balance: IDL.Nat64
            });

            return await call(getCanister2Principal(), 'accounts', {
                paramIdlTypes: [],
                returnIdlType: IDL.Vec(AccountIdl),
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
                        candidPath: '/candid/canister2.did',
                        args: []
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call(getCanister2Principal(), 'trap', {
                paramIdlTypes: [],
                returnIdlType: IDL.Text,
                args: []
            });
        }
    }),
    sendNotification: update([], Void, () => {
        // TODO for now there seems to be no fetch analogy because notify must be synchronous
        // TODO and fetch must be asynchronous
        return notify(getCanister2Principal(), 'receiveNotification', {
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
