import { call, id, IDL, query, reply, update } from 'azle';

export default class Canister {
    canister2Id: string = getCanister2Id();
    counter: bigint = 0n;

    // Composite query calling a query
    @query([], IDL.Text, {
        composite: true
    })
    async simpleCompositeQuery(): Promise<string> {
        return await call(this.canister2Id, 'simpleQuery', {
            returnIdlType: IDL.Text
        });
    }

    // Composite query calling a manual query
    @query([], IDL.Text, {
        composite: true
    })
    async manualQuery(): Promise<string> {
        return await call(this.canister2Id, 'manualQuery', {
            returnIdlType: IDL.Text
        });
    }

    // Manual composite query calling a manual query
    @query([], IDL.Text, {
        composite: true,
        manual: true
    })
    async totallyManualQuery(): Promise<void> {
        reply({
            data: await call(this.canister2Id, 'manualQuery', {
                returnIdlType: IDL.Text
            }),
            idlType: IDL.Text
        });
    }

    // Composite query calling another composite query
    @query([], IDL.Text, {
        composite: true
    })
    async deepQuery(): Promise<string> {
        return await call(this.canister2Id, 'deepQuery', {
            returnIdlType: IDL.Text
        });
    }

    // Composite query calling an update method. SHOULDN'T WORK
    @query([], IDL.Text, {
        composite: true
    })
    async updateQuery(): Promise<string> {
        return await call(this.canister2Id, 'updateQuery', {
            returnIdlType: IDL.Text
        });
    }

    // Composite query being called by a query method. SHOULDN'T WORK
    @query([], IDL.Text)
    async simpleQuery(): Promise<string> {
        return await call(this.canister2Id, 'simpleQuery', {
            returnIdlType: IDL.Text
        });
    }

    // Composite query being called by an update method. SHOULDN'T WORK
    @update([], IDL.Text)
    async simpleUpdate(): Promise<string> {
        return await call(this.canister2Id, 'deepQuery', {
            returnIdlType: IDL.Text
        });
    }

    // Composite query that modifies the state. Should revert after the call is done
    @query([], IDL.Nat, {
        composite: true
    })
    incCounter(): bigint {
        this.counter += 1n;

        return this.counter;
    }

    // Composite query calling queries on the same canister
    @query([], IDL.Nat, {
        composite: true
    })
    async incCanister1(): Promise<bigint> {
        this.counter += 1n;

        const canister1AResult = await incCanister();
        const canister1BResult = await incCanister();

        return this.counter + canister1AResult + canister1BResult;
    }

    // Composite query calling queries that modify the state
    @query([], IDL.Nat, {
        composite: true
    })
    async incCanister2(): Promise<bigint> {
        this.counter += 1n;

        const canister2AResult = await incCanister2(this);
        const canister2BResult = await incCanister2(this);

        return this.counter + canister2AResult + canister2BResult;
    }
}

function getCanister2Id(): string {
    if (process.env.CANISTER2_PRINCIPAL !== undefined) {
        return process.env.CANISTER2_PRINCIPAL;
    }

    throw new Error(`process.env.CANISTER2_PRINCIPAL is not defined`);
}

async function incCanister(): Promise<bigint> {
    return await call(id(), 'incCounter', {
        returnIdlType: IDL.Nat
    });
}

async function incCanister2(canister: Canister): Promise<bigint> {
    return await call(canister.canister2Id, 'incCounter', {
        returnIdlType: IDL.Nat
    });
}
