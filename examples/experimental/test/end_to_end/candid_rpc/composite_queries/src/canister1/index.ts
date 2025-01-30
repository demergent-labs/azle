import { call, id, IDL, msgReply } from 'azle';
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

const CompQueryCanister = Canister({
    // Composite query calling a query
    simpleCompositeQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/simpleQuery`,
                {
                    body: serialize({
                        candidPath: `/candid/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, text>(
                getCanister2Principal(),
                'simpleQuery',
                {
                    returnIdlType: text.getIdlType()
                }
            );
        }
    }),
    // Composite query calling a manual query
    manualQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/manualQuery`,
                {
                    body: serialize({
                        candidPath: `/candid/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, text>(
                getCanister2Principal(),
                'manualQuery',
                {
                    returnIdlType: text.getIdlType()
                }
            );
        }
    }),
    // Manual composite query calling a manual query
    totallyManualQuery: query(
        [],
        Manual(text),
        async () => {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${getCanister2Principal()}/manualQuery`,
                    {
                        body: serialize({
                            candidPath: `/candid/canister2.did`
                        })
                    }
                );
                const responseJson = await response.json();

                const encoded = new Uint8Array(
                    IDL.encode([text.getIdlType()], [responseJson])
                );

                msgReply(encoded);
            } else {
                const result = await call<undefined, text>(
                    getCanister2Principal(),
                    'manualQuery',
                    {
                        returnIdlType: text.getIdlType()
                    }
                );

                const encoded = new Uint8Array(
                    IDL.encode([text.getIdlType()], [result])
                );

                msgReply(encoded);
            }
        },
        { manual: true }
    ),
    // Composite query calling another composite query
    deepQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/deepQuery`,
                {
                    body: serialize({
                        candidPath: `/candid/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, text>(
                getCanister2Principal(),
                'deepQuery',
                {
                    returnIdlType: text.getIdlType()
                }
            );
        }
    }),
    // Composite query calling an update method. SHOULDN'T WORK
    updateQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/updateQuery`,
                {
                    body: serialize({
                        candidPath: `/candid/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, text>(
                getCanister2Principal(),
                'updateQuery',
                {
                    returnIdlType: text.getIdlType()
                }
            );
        }
    }),
    // Composite query being called by a query method. SHOULDN'T WORK
    simpleQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/simpleQuery`,
                {
                    body: serialize({
                        candidPath: `/candid/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, text>(
                getCanister2Principal(),
                'simpleQuery',
                {
                    returnIdlType: text.getIdlType()
                }
            );
        }
    }),
    // Composite query being called by an update method. SHOULDN'T WORK
    simpleUpdate: update([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/deepQuery`,
                {
                    body: serialize({
                        candidPath: `/candid/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<undefined, text>(
                getCanister2Principal(),
                'deepQuery',
                {
                    returnIdlType: text.getIdlType()
                }
            );
        }
    }),
    // Composite query that modifies the state. Should revert after the call is done
    incCounter: query([], nat, async () => {
        counter += 1n;

        return counter;
    }),
    // Composite query calling queries on the same canister
    incCanister1: query([], nat, async () => {
        const self = CompQueryCanister(id());

        counter += 1n;

        const canister1AResult = await incCanister(
            self,
            `/candid/canister1.did`
        );
        const canister1BResult = await incCanister(
            self,
            `/candid/canister1.did`
        );

        return counter + canister1AResult + canister1BResult;
    }),
    // Composite query calling queries that modify the state
    incCanister2: query([], nat, async () => {
        counter += 1n;

        const canister2AResult = await incCanister2();
        const canister2BResult = await incCanister2();

        return counter + canister2AResult + canister2BResult;
    })
});

export default CompQueryCanister;

function getCanister2Principal(): string {
    if (process.env.CANISTER2_PRINCIPAL !== undefined) {
        return process.env.CANISTER2_PRINCIPAL;
    }

    throw new Error(`process.env.CANISTER2_PRINCIPAL is not defined`);
}

async function incCanister(canister: any, candidPath: string): Promise<nat> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(
            `icp://${canister.principal.toText()}/incCounter`,
            { body: serialize({ candidPath }) }
        );
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await call<undefined, nat>(
            canister.principal.toText(),
            'incCounter',
            {
                returnIdlType: nat.getIdlType()
            }
        );
    }
}

async function incCanister2(): Promise<nat> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(
            `icp://${getCanister2Principal()}/incCounter`,
            {
                body: serialize({
                    candidPath: `/candid/canister2.did`
                })
            }
        );
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await call<undefined, nat>(
            getCanister2Principal(),
            'incCounter',
            {
                returnIdlType: nat.getIdlType()
            }
        );
    }
}
