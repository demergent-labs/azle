import {

    ic,
    Principal,
    query,
    Record,
    serialize,
    text,
    update,
    Vec
} from 'azle';

import SomeCanister from './some_canister';

const Wrapper = Record({
    someCanister: SomeCanister
});

export default class {
@query([SomeCanister], SomeCanister)
    canisterParam(someCanister){
        return someCanister;
    }),
@query([], SomeCanister)
    canisterReturnType(){
        return SomeCanister(Principal.fromText(getSomeCanisterPrincipal()));
    }),
@update([], Wrapper)
    canisterNestedReturnType(){
        return {
            someCanister: SomeCanister(
                Principal.fromText(getSomeCanisterPrincipal())
            )
        };
    }),
    @update([Vec(SomeCanister)], Vec(SomeCanister))
    canisterList(someCanisters){
            return someCanisters;
        }
    ),
    @update([SomeCanister], text)
    async canisterCrossCanisterCall(someCanister) {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${getSomeCanisterPrincipal()}/update1`,
                    {
                        body: serialize({
                            candidPath: `/candid/some_canister.did`
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await ic.call(someCanister.update1);
            }
        }
    )
}

function getSomeCanisterPrincipal(): string {
    if (process.env.SOME_CANISTER_PRINCIPAL !== undefined) {
        return process.env.SOME_CANISTER_PRINCIPAL;
    }

    throw new Error(`process.env.SOME_CANISTER_PRINCIPAL is not defined`);
}
