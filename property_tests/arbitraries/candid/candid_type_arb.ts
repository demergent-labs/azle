import fc from 'fast-check';
import { IntArb } from './primitive/ints/int_arb';
import { Int8Arb } from './primitive/ints/int8_arb';
import { Int16Arb } from './primitive/ints/int16_arb';
import { Int32Arb } from './primitive/ints/int32_arb';
import { Int64Arb } from './primitive/ints/int64_arb';
import { NatArb } from './primitive/nats/nat_arb';
import { Nat8Arb } from './primitive/nats/nat8_arb';
import { Nat16Arb } from './primitive/nats/nat16_arb';
import { Nat32Arb } from './primitive/nats/nat32_arb';
import { Nat64Arb } from './primitive/nats/nat64_arb';
import { NullArb, NullTypeArb } from './primitive/null';
import { BoolArb, BoolTypeArb } from './primitive/bool';
import { Principal } from '@dfinity/principal';
import { PrincipalArb } from './reference/principal_arb';
import { Float32Arb } from './primitive/floats/float32_arb';
import { Float64Arb } from './primitive/floats/float64_arb';
import { TextArb, TextTypeArb } from './primitive/text';
import { BlobArb } from './constructed/blob_arb';
import { CandidValueAndMeta } from './candid_value_and_meta';
import { Func } from './reference/func_arb';
import { Opt } from './constructed/opt_arb';
import { Variant } from './constructed/variant_arb';
import { BaseVariantArb } from './constructed/variant_arb/base';
import { Record } from './constructed/record_arb';
import { Tuple } from './constructed/tuple_arb';
import { RecordArb, RecordTypeArb } from './constructed/record_arb/base';
import { TupleArb } from './constructed/tuple_arb/base';
import { OptArb } from './constructed/opt_arb/base';
import { Vec } from './constructed/vec_arb';
import { VecArb, VecTypeArb } from './constructed/vec_arb/base';
import { FuncArb } from './reference/func_arb/base';
import {
    CandidDefinition,
    RecordCandidMeta,
    VecCandidMeta
} from './candid_meta_arb';

export type CorrespondingJSType =
    | number
    | bigint
    | null
    | boolean
    | Principal
    | Uint8Array
    | string
    | Func
    | Opt
    | Variant
    | Record
    | Tuple
    | undefined
    | Int16Array
    | Int32Array
    | Int8Array
    | BigInt64Array
    | Uint16Array
    | Uint32Array
    | Uint8Array
    | BigUint64Array
    | Vec;

export const CandidDefinitionArb: fc.Arbitrary<CandidDefinition> = fc.letrec(
    (tie) => ({
        CandidType: fc.oneof(
            BoolTypeArb,
            // NullTypeArb, // Must be excluded until https://github.com/demergent-labs/azle/issues/1453 gets resolved
            TextTypeArb,
            tie('Record').map((sample) => sample as RecordCandidMeta),
            tie('Vec').map((sample) => sample as VecCandidMeta)
        ),
        Record: RecordTypeArb(
            tie('CandidType') as fc.Arbitrary<CandidDefinition>
        ),
        Vec: VecTypeArb(tie('CandidType') as fc.Arbitrary<CandidDefinition>)
    })
).CandidType;

/**
 * An arbitrary representing all possible Candid types.
 *
 * **Note:** This currently only supports ints, nats, and null arbitraries
 */
export const CandidValueAndMetaArb: fc.Arbitrary<
    CandidValueAndMeta<CorrespondingJSType>
> = fc.letrec((tie) => ({
    CandidType: fc.oneof(
        BlobArb,
        tie('Opt').map((sample) => sample as CandidValueAndMeta<Opt>),
        tie('Record').map((sample) => sample as CandidValueAndMeta<Record>),
        tie('Tuple').map((sample) => sample as CandidValueAndMeta<Tuple>),
        tie('Variant').map((sample) => sample as CandidValueAndMeta<Variant>),
        tie('Vec').map((sample) => sample as CandidValueAndMeta<Vec>),
        Float32Arb,
        Float64Arb,
        IntArb,
        Int8Arb,
        Int16Arb,
        Int32Arb,
        Int64Arb,
        NatArb,
        Nat8Arb,
        Nat16Arb,
        Nat32Arb,
        Nat64Arb,
        BoolArb,
        NullArb,
        TextArb,
        tie('Func').map((sample) => sample as CandidValueAndMeta<Func>),
        PrincipalArb
    ),
    Func: FuncArb(
        tie('CandidType') as fc.Arbitrary<
            CandidValueAndMeta<CorrespondingJSType>
        >
    ),
    Vec: VecArb(CandidDefinitionArb),
    Opt: OptArb(
        tie('CandidType') as fc.Arbitrary<
            CandidValueAndMeta<CorrespondingJSType>
        >
    ),
    Variant: BaseVariantArb(
        tie('CandidType') as fc.Arbitrary<
            CandidValueAndMeta<CorrespondingJSType>
        >
    ),
    Tuple: TupleArb(
        tie('CandidType') as fc.Arbitrary<
            CandidValueAndMeta<CorrespondingJSType>
        >
    ),
    Record: RecordArb(CandidDefinitionArb)
})).CandidType;

// TODO: This needs to support service.
