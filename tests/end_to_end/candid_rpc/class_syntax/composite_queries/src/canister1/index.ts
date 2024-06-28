import { call, id, IDL, query, reply, update } from 'azle';

const canister2Id = getCanister2Id();

let counter: bigint = 0n;

export default class {
    // Composite query calling a query
    @query([], IDL.Text, {
        composite: true
    })
    async simpleCompositeQuery(): Promise<string> {
        return await call(canister2Id, 'simpleQuery', {
            returnIdl: IDL.Text
        });
    }

    // Composite query calling a manual query
    @query([], IDL.Text, {
        composite: true
    })
    async manualQuery(): Promise<string> {
        return await call(canister2Id, 'manualQuery', {
            returnIdl: IDL.Text
        });
    }

    // Manual composite query calling a manual query
    @query([], IDL.Text, {
        composite: true,
        manual: true
    })
    async totallyManualQuery(): Promise<void> {
        reply(
            await call(canister2Id, 'manualQuery', {
                returnIdl: IDL.Text
            }),
            IDL.Text
        );
    }

    // Composite query calling another composite query
    @query([], IDL.Text, {
        composite: true
    })
    async deepQuery(): Promise<string> {
        return await call(canister2Id, 'deepQuery', {
            returnIdl: IDL.Text
        });
    }

    // Composite query calling an update method. SHOULDN'T WORK
    @query([], IDL.Text, {
        composite: true
    })
    async updateQuery(): Promise<string> {
        return await call(canister2Id, 'updateQuery', {
            returnIdl: IDL.Text
        });
    }

    // Composite query being called by a query method. SHOULDN'T WORK
    @query([], IDL.Text)
    async simpleQuery(): Promise<string> {
        return await call(canister2Id, 'simpleQuery', {
            returnIdl: IDL.Text
        });
    }

    // Composite query being called by an update method. SHOULDN'T WORK
    @update([], IDL.Text)
    async simpleUpdate(): Promise<string> {
        return await call(canister2Id, 'deepQuery', {
            returnIdl: IDL.Text
        });
    }

    // Composite query that modifies the state. Should revert after the call is done
    @query([], IDL.Nat, {
        composite: true
    })
    incCounter(): bigint {
        counter += 1n;

        return counter;
    }

    // Composite query calling queries on the same canister
    @query([], IDL.Nat, {
        composite: true
    })
    async incCanister1(): Promise<bigint> {
        counter += 1n;

        const canister1AResult = await incCanister();
        const canister1BResult = await incCanister();

        return counter + canister1AResult + canister1BResult;
    }

    // Composite query calling queries that modify the state
    @query([], IDL.Nat, {
        composite: true
    })
    async incCanister2(): Promise<bigint> {
        counter += 1n;

        const canister2AResult = await incCanister2();
        const canister2BResult = await incCanister2();

        return counter + canister2AResult + canister2BResult;
    }
}

function getCanister2Id(): string {
    if (process.env.CANISTER2_PRINCIPAL !== undefined) {
        return process.env.CANISTER2_PRINCIPAL;
    }

    if (globalThis._azleInsideCanister === true) {
        return 'PRE_INIT_EXECUTION';
    }

    throw new Error(`process.env.CANISTER2_PRINCIPAL is not defined`);
}

async function incCanister(): Promise<bigint> {
    return await call(id(), 'incCounter', {
        returnIdl: IDL.Nat
    });
}

async function incCanister2(): Promise<bigint> {
    return await call(canister2Id, 'incCounter', {
        returnIdl: IDL.Nat
    });
}
