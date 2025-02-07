import { call, IDL, msgReply } from 'azle';
import {
    Canister,
    Manual,
    nat,
    query,
    serialize,
    text,
    update
} from 'azle/experimental';

let counter: nat = 0n;

export default Canister({
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
            const encoded = new Uint8Array(
                IDL.encode(
                    [text.getIdlType()],
                    ['Hello from Canister 2 manual query']
                )
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    deepQuery: query([], text, async () => {
        const canister3Principal = getCanister3Principal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${canister3Principal}/deepQuery`,
                {
                    body: serialize({
                        candidPath: `/candid/canister3.did`
                    })
                }
            );

            return await response.json();
        } else {
            return await call<undefined, string>(
                canister3Principal,
                'deepQuery',
                {
                    returnIdlType: text.getIdlType()
                }
            );
        }
    })
});

function getCanister3Principal(): string {
    if (process.env.CANISTER3_PRINCIPAL !== undefined) {
        return process.env.CANISTER3_PRINCIPAL;
    }

    throw new Error(`process.env.CANISTER3_PRINCIPAL is not defined`);
}
