import {
    blob,
    bool,
    Canister,
    float32,
    float64,
    Func,
    int,
    int16,
    int32,
    int64,
    int8,
    nat,
    nat16,
    nat32,
    nat64,
    nat8,
    None,
    Null,
    Opt,
    Principal,
    query,
    Record,
    Recursive,
    text,
    update,
    Variant,
    Vec,
    Void
} from 'azle';

const MyCanister = Canister({
    query1: query([], bool),
    update1: update([], text)
});

const CandidVariant = Variant({ query: text, nat32: text, service: text });

const Candid = Record({
    query: text,
    text: text,
    blob: blob,
    nat: nat,
    nat64: nat64,
    nat32: nat32,
    nat16: nat16,
    nat8: nat8,
    int: int,
    int64: int64,
    int32: int32,
    int16: int16,
    int8: int8,
    float64: float64,
    float32: float32,
    bool: bool,
    null: Null,
    vec: Vec(text),
    opt: Opt(nat),
    record: Record({
        firstName: text,
        lastName: text,
        age: nat8
    }),
    variant: Variant({
        Tag1: Null,
        Tag2: Null,
        Tag3: int
    }),
    func: Recursive(() => Func([], Candid, 'query')),
    service: MyCanister,
    principal: Principal
});

export default Canister({
    opt: query([], Void, () => {}),
    variant: query([], CandidVariant, () => {
        return { query: 'hello' };
    }),
    candidTypes: query([], Candid, () => {
        return {
            query: 'query',
            text: 'text',
            blob: Uint8Array.from([]),
            nat: 340_282_366_920_938_463_463_374_607_431_768_211_455n,
            nat64: 18_446_744_073_709_551_615n,
            nat32: 4_294_967_295,
            nat16: 65_535,
            nat8: 255,
            int: 170_141_183_460_469_231_731_687_303_715_884_105_727n,
            int64: 9_223_372_036_854_775_807n,
            int32: 2_147_483_647,
            int16: 32_767,
            int8: 127,
            float64: Math.E,
            float32: Math.PI,
            bool: true,
            null: null,
            vec: ['has one element'],
            opt: None,
            record: {
                firstName: 'John',
                lastName: 'Doe',
                age: 35
            },
            variant: {
                Tag1: null
            },
            func: [
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
                'candidTypes'
            ],
            service: MyCanister(Principal.fromText('aaaaa-aa')),
            principal: Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
        };
    })
});
