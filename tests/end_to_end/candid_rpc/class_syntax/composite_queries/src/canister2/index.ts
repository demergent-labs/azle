import { call, IDL, query, reply, update } from 'azle';

const canister3Id = getCanister3Id();

let counter: bigint = 0n;

export default class {
    @query([], IDL.Nat)
    incCounter(): bigint {
        counter += 1n;
        return counter;
    }

    @query([], IDL.Text)
    simpleQuery(): string {
        return 'Hello from Canister 2';
    }

    @update([], IDL.Text)
    updateQuery(): string {
        return 'Hello from a Canister 2 update';
    }

    @query([], IDL.Text, {
        manual: true
    })
    manualQuery(): void {
        reply({ data: 'Hello from Canister 2 manual query', idl: IDL.Text });
    }

    @query([], IDL.Text, {
        composite: true
    })
    async deepQuery(): Promise<string> {
        return await call(canister3Id, 'deepQuery', {
            returnIdl: IDL.Text
        });
    }
}

function getCanister3Id(): string {
    if (process.env.CANISTER3_PRINCIPAL !== undefined) {
        return process.env.CANISTER3_PRINCIPAL;
    }

    if (globalThis._azleInsideCanister === true) {
        return 'PRE_INIT_EXECUTION';
    }

    throw new Error(`process.env.CANISTER3_PRINCIPAL is not defined`);
}
