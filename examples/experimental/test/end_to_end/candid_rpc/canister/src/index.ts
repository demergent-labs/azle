import { call, IDL } from 'azle';
import {
    Canister,
    Principal,
    query,
    Record,
    serialize,
    text,
    update,
    Vec
} from 'azle/experimental';

import SomeCanister from './some_canister';

const Wrapper = Record({
    someCanister: SomeCanister
});

export default Canister({
    canisterParam: query([SomeCanister], SomeCanister, (someCanister) => {
        return someCanister;
    }),
    canisterReturnType: query([], SomeCanister, () => {
        return SomeCanister(Principal.fromText(getSomeCanisterPrincipal()));
    }),
    canisterNestedReturnType: update([], Wrapper, () => {
        return {
            someCanister: SomeCanister(
                Principal.fromText(getSomeCanisterPrincipal())
            )
        };
    }),
    canisterList: update(
        [Vec(SomeCanister)],
        Vec(SomeCanister),
        (someCanisters) => {
            return someCanisters;
        }
    ),
    canisterCrossCanisterCall: update([SomeCanister], text, async () => {
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
            return await call<undefined, string>(
                getSomeCanisterPrincipal(),
                'update1',
                {
                    returnIdlType: IDL.Text
                }
            );
        }
    })
});

function getSomeCanisterPrincipal(): string {
    if (process.env.SOME_CANISTER_PRINCIPAL !== undefined) {
        return process.env.SOME_CANISTER_PRINCIPAL;
    }

    throw new Error(`process.env.SOME_CANISTER_PRINCIPAL is not defined`);
}
