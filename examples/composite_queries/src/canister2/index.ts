import {
    Canister,
    ic,
    init,
    Manual,
    nat,
    Principal,
    query,
    serialize,
    text,
    update
} from 'azle';
import Canister3 from '../canister3';

let canister3: typeof Canister3;
let counter: nat = 0n;

export default Canister({
    init: init([], () => {
        canister3 = Canister3(Principal.fromText(getCanister3Principal()));
    }),
    // TODO is this supposed to be a query?
    incCounter: query([], nat, () => {
        counter += 1n;
        return counter;
    }),
    simpleQuery: query([], text, () => {
        return 'Hello from Canister 2';
    }),
    updateQuery: update([], text, () => {
        return 'Hello from a Canister 2 update';
    }),
    manualQuery: query(
        [],
        Manual(text),
        () => {
            ic.reply('Hello from Canister 2 manual query', text);
        },
        { manual: true }
    ),
    deepQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister3Principal()}/deepQuery`,
                {
                    body: serialize({
                        candidPath: `/src/canister3.did`
                    })
                }
            );

            return await response.json();
        } else {
            return await ic.call(canister3.deepQuery);
        }
    })
});

function getCanister3Principal(): string {
    if (process.env.CANISTER3_PRINCIPAL !== undefined) {
        return process.env.CANISTER3_PRINCIPAL;
    }

    throw new Error(`process.env.CANISTER3_PRINCIPAL is not defined`);
}
