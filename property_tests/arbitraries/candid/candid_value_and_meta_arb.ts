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
import { NullArb } from './primitive/null';
import { BoolArb } from './primitive/bool';
import { PrincipalArb } from './reference/principal_arb';
import { Float32Arb } from './primitive/floats/float32_arb';
import { Float64Arb } from './primitive/floats/float64_arb';
import { TextArb } from './primitive/text';
import { BlobArb } from './constructed/blob_arb';
import { Func } from './reference/func_arb';
import { Opt } from './constructed/opt_arb';
import { Variant } from './constructed/variant_arb';
import { VariantArb } from './constructed/variant_arb/base';
import { Record } from './constructed/record_arb';
import { Tuple } from './constructed/tuple_arb';
import { RecordArb } from './constructed/record_arb/base';
import { TupleArb } from './constructed/tuple_arb/base';
import { OptArb } from './constructed/opt_arb/base';
import { Vec } from './constructed/vec_arb';
import { VecArb } from './constructed/vec_arb/base';
import { FuncArb } from './reference/func_arb/base';
import { CandidDefinitionArb } from './candid_definition_arb';
import { CorrespondingJSType } from './corresponding_js_type';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type CandidValueAndMeta<T extends CorrespondingJSType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    src: {
        typeAnnotation: string;
        typeAliasDeclarations: string[];
        imports: Set<string>;
        valueLiteral: string;
    };
};

/**
 * An arbitrary representing all possible Candid types.
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
        Float32Arb(),
        Float64Arb(),
        IntArb,
        Int8Arb,
        Int16Arb(),
        Int32Arb(),
        Int64Arb,
        NatArb,
        Nat8Arb,
        Nat16Arb,
        Nat32Arb,
        Nat64Arb,
        BoolArb(),
        NullArb,
        TextArb(),
        tie('Func').map((sample) => sample as CandidValueAndMeta<Func>),
        PrincipalArb
    ),
    Func: FuncArb(CandidDefinitionArb),
    Vec: VecArb(CandidDefinitionArb),
    Opt: OptArb(CandidDefinitionArb),
    Variant: VariantArb(CandidDefinitionArb),
    Tuple: TupleArb(CandidDefinitionArb),
    Record: RecordArb(CandidDefinitionArb)
})).CandidType;

// TODO: This needs to support service.
