import {
    Canister,
    ic,
    Principal,
    query,
    Record,
    text,
    update,
    Vec
} from 'azle';
import SomeCanister from './some_canister';

const Wrapper = Record({
    someCanister: SomeCanister
});

export default Canister({
    canisterParam: query([SomeCanister], SomeCanister, (someCanister) => {
        return someCanister;
    }),
    canisterReturnType: query([], SomeCanister, () => {
        return SomeCanister(
            Principal.fromText(
                process.env.SOME_CANISTER_PRINCIPAL ??
                    ic.trap('process.env.SOME_CANISTER_PRINCIPAL is undefined')
            )
        );
    }),
    canisterNestedReturnType: update([], Wrapper, () => {
        return {
            someCanister: SomeCanister(
                Principal.fromText(
                    process.env.SOME_CANISTER_PRINCIPAL ??
                        ic.trap(
                            'process.env.SOME_CANISTER_PRINCIPAL is undefined'
                        )
                )
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
    canisterCrossCanisterCall: update(
        [SomeCanister],
        text,
        async (someCanister) => {
            return await ic.call(someCanister.update1);
        }
    )
});
