import { call, IDL, msgReply, query, update } from 'azle';

export default class {
    counter: bigint = 0n;

    @query([], IDL.Nat)
    incCounter(): bigint {
        this.counter += 1n;
        return this.counter;
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
        const encoded = new Uint8Array(
            IDL.encode([IDL.Text], ['Hello from Canister 2 manual query'])
        );

        msgReply(encoded);
    }

    @query([], IDL.Text, {
        composite: true
    })
    async deepQuery(): Promise<string> {
        return await call<undefined, string>(getCanister3Id(), 'deepQuery', {
            returnIdlType: IDL.Text
        });
    }
}

function getCanister3Id(): string {
    if (process.env.CANISTER3_PRINCIPAL !== undefined) {
        return process.env.CANISTER3_PRINCIPAL;
    }

    throw new Error(`process.env.CANISTER3_PRINCIPAL is not defined`);
}
