import { call, notify } from 'azle';
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
            return await call<[text, text, bigint], bigint>(
                getCanister2Principal(),
                'transfer',
                {
                    paramIdlTypes: [
                        text.getIdlType(),
                        text.getIdlType(),
                        nat64.getIdlType()
                    ],
                    returnIdlType: nat64.getIdlType(),
                    args: [from, to, amount]
                }
            );
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
            return await call<[text], bigint>(
                getCanister2Principal(),
                'balance',
                {
                    paramIdlTypes: [text.getIdlType()],
                    returnIdlType: nat64.getIdlType(),
                    args: [id]
                }
            );
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
            const result = await call<[AccountArgs], [Account] | []>(
                getCanister2Principal(),
                'account',
                {
                    paramIdlTypes: [AccountArgs.getIdlType([])],
                    returnIdlType: Opt(Account).getIdlType([]),
                    args: [args]
                }
            );

            if (result.length === 1) {
                return Some(result[0]);
            } else {
                return None;
            }
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
            return await call<undefined, Account[]>(
                getCanister2Principal(),
                'accounts',
                {
                    returnIdlType: Vec(Account).getIdlType([])
                }
            );
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
            return await call<undefined, string>(
                getCanister2Principal(),
                'trap',
                {
                    returnIdlType: text.getIdlType()
                }
            );
        }
    }),
    sendNotification: update([], Void, () => {
        // TODO for now there seems to be no fetch analogy because notify must be synchronous
        // TODO and fetch must be asynchronous
        // TODO though for azle stable we are going to make notify simply return a resolved promise immediately
        return notify(getCanister2Principal(), 'receiveNotification', {
            paramIdlTypes: [text.getIdlType()],
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
