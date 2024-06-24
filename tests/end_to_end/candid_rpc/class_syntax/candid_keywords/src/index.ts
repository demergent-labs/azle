import { IDL, query, update } from 'azle';

const MyCanister = Canister({
    query1: query([], IDL.Bool),
    update1: update([], IDL.Text)
});

const CandidVariant = Variant({
    query: IDL.Text,
    nat32: IDL.Text,
    service: IDL.Text
});

const Candid = Record({
    query: IDL.Text,
    text: IDL.Text,
    blob: IDL.Vec(IDL.Nat8),
    nat: IDL.Nat,
    nat64: IDL.Nat64,
    nat32: IDL.Nat32,
    nat16: IDL.Nat16,
    nat8: IDL.Nat8,
    int: int,
    int64: int64,
    int32: int32,
    int16: int16,
    int8: int8,
    float64: float64,
    float32: float32,
    bool: IDL.Bool,
    null: Null,
    vec: IDL.Vec(IDL.Text),
    opt: Opt(IDL.Nat),
    record: Record({
        firstName: IDL.Text,
        lastName: IDL.Text,
        age: IDL.Nat8
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

export default class {
    @query([])
    opt() {}
    @query([], CandidVariant)
    variant() {
        return { query: 'hello' };
    }
    @query([], Candid)
    candidTypes() {
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
    }
}
