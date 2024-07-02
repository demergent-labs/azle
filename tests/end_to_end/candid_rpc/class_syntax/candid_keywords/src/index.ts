import { IDL, Principal, query } from 'azle';

const MyCanister = IDL.Service({
    query1: IDL.Func([], [IDL.Bool]),
    update1: IDL.Func([], [IDL.Text])
});

const CandidVariant = IDL.Variant({
    query: IDL.Text,
    nat32: IDL.Text,
    service: IDL.Text
});

const Candid = IDL.Rec();

Candid.fill(
    IDL.Record({
        query: IDL.Text,
        text: IDL.Text,
        blob: IDL.Vec(IDL.Nat8),
        nat: IDL.Nat,
        nat64: IDL.Nat64,
        nat32: IDL.Nat32,
        nat16: IDL.Nat16,
        nat8: IDL.Nat8,
        int: IDL.Int,
        int64: IDL.Int64,
        int32: IDL.Int32,
        int16: IDL.Int16,
        int8: IDL.Int8,
        float64: IDL.Float64,
        float32: IDL.Float32,
        bool: IDL.Bool,
        null: IDL.Null,
        vec: IDL.Vec(IDL.Text),
        opt: IDL.Opt(IDL.Nat),
        record: IDL.Record({
            firstName: IDL.Text,
            lastName: IDL.Text,
            age: IDL.Nat8
        }),
        variant: IDL.Variant({
            Tag1: IDL.Null,
            Tag2: IDL.Null,
            Tag3: IDL.Int
        }),
        func: IDL.Func([], [Candid], ['query']),
        service: MyCanister,
        principal: IDL.Principal
    })
);

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
            opt: [],
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
            service: Principal.fromText('aaaaa-aa'),
            principal: Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
        };
    }
}
