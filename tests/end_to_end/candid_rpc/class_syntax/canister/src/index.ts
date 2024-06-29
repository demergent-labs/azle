import { call, IDL, Principal, query, update } from 'azle';

import { Canister } from './some_canister';

const Wrapper = IDL.Record({
    someCanister: Canister
});

export default class {
    @query([Canister], Canister)
    canisterParam(someCanister: Canister) {
        return someCanister;
    }

    @query([], Canister)
    canisterReturnType() {
        return Principal.fromText(getCanisterPrincipal());
    }

    @update([], Wrapper)
    canisterNestedReturnType() {
        return {
            someCanister: Principal.fromText(getCanisterPrincipal())
        };
    }

    @update([IDL.Vec(Canister)], IDL.Vec(Canister))
    canisterList(someCanisters: Canister[]) {
        return someCanisters;
    }

    @update([Canister], IDL.Text)
    async canisterCrossCanisterCall(someCanister: Canister) {
        return await call(someCanister, 'update1', { returnIdl: IDL.Text });
    }
}

function getCanisterPrincipal(): string {
    if (process.env.SOME_CANISTER_PRINCIPAL !== undefined) {
        return process.env.SOME_CANISTER_PRINCIPAL;
    }

    throw new Error(`process.env.SOME_CANISTER_PRINCIPAL is not defined`);
}
