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
import Canister2 from '../canister2';

let canister2: typeof Canister2;
let counter: nat = 0n;

const CompQueryCanister = Canister({
    init: init([], () => {
        canister2 = Canister2(Principal.fromText(getCanister2Principal()));
    }),
    // Composite query calling a query
    simpleCompositeQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/simpleQuery`,
                {
                    body: serialize({
                        candidPath: `/src/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(canister2.simpleQuery);
        }
    }),
    // Composite query calling a manual query
    manualQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/manualQuery`,
                {
                    body: serialize({
                        candidPath: `/src/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return (await ic.call(canister2.manualQuery)) as unknown as string; // TODO is this the best we can do for the types in this situation?
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
                            candidPath: `/src/canister2.did`
                        })
                    }
                );
                const responseJson = await response.json();

                ic.reply(responseJson, text);
            } else {
                ic.reply(await ic.call(canister2.manualQuery), text);
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
                        candidPath: `/src/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(canister2.deepQuery);
        }
    }),
    // Composite query calling an update method. SHOULDN'T WORK
    updateQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/updateQuery`,
                {
                    body: serialize({
                        candidPath: `/src/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(canister2.updateQuery);
        }
    }),
    // Composite query being called by a query method. SHOULDN'T WORK
    simpleQuery: query([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/simpleQuery`,
                {
                    body: serialize({
                        candidPath: `/src/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(canister2.simpleQuery);
        }
    }),
    // Composite query being called by an update method. SHOULDN'T WORK
    simpleUpdate: update([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCanister2Principal()}/deepQuery`,
                {
                    body: serialize({
                        candidPath: `/src/canister2.did`
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(canister2.deepQuery);
        }
    }),
    // Composite query that modifies the state. Should revert after the call is done
    incCounter: query([], nat, async () => {
        counter += 1n;

        return counter;
    }),
    // Composite query calling queries on the same canister
    incCanister1: query([], nat, async () => {
        const self: any = CompQueryCanister(ic.id());

        counter += 1n;

        const canister1AResult = await incCanister1(self);
        const canister1BResult = await incCanister1(self);

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

async function incCanister1(canister1: any) {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(
            `icp://${canister1.principal.toText()}/incCounter`,
            {
                body: serialize({
                    candidPath: `/src/canister1.did`
                })
            }
        );
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await ic.call(canister1.incCounter);
    }
}

async function incCanister2() {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(
            `icp://${getCanister2Principal()}/incCounter`,
            {
                body: serialize({
                    candidPath: `/src/canister2.did`
                })
            }
        );
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await ic.call(canister2.incCounter);
    }
}
