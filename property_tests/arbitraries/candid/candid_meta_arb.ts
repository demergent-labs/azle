import fc from 'fast-check';
import { CorrespondingJSType } from './candid_type_arb';
import { RecordValueArb } from './constructed/record_arb/base';
import { BoolValueArb } from './primitive/bool';
import { VecValueArb } from './constructed/vec_arb/base';
import { CandidType } from './candid_type';
import { TextValueArb } from './primitive/text';
import { NullValueArb } from './primitive/null';
import { Float32ValueArb } from './primitive/floats/float32_arb';
import { Float64ValueArb } from './primitive/floats/float64_arb';
import { IntValueArb } from './primitive/ints/int_arb';
import { Int8ValueArb } from './primitive/ints/int8_arb';
import { Int16ValueArb } from './primitive/ints/int16_arb';
import { Int32ValueArb } from './primitive/ints/int32_arb';
import { Int64ValueArb } from './primitive/ints/int64_arb';
import { NatValueArb } from './primitive/nats/nat_arb';
import { Nat8ValueArb } from './primitive/nats/nat8_arb';
import { Nat16ValueArb } from './primitive/nats/nat16_arb';
import { Nat32ValueArb } from './primitive/nats/nat32_arb';
import { Nat64ValueArb } from './primitive/nats/nat64_arb';
import { VariantValueArb } from './constructed/variant_arb/base';
import { TupleValueArb } from './constructed/tuple_arb/base';
import { OptValueArb } from './constructed/opt_arb/base';

export type CandidMeta = {
    typeAnnotation: string; // Either a type reference or type literal
    typeAliasDeclarations: string[];
    imports: Set<string>;
    candidType: CandidType;
};

export type CandidValues<T extends CorrespondingJSType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    valueLiteral: string;
};

export type CandidDefinition =
    | MultiTypeConstructedDefinition
    | SingleTypeConstructedDefinition
    | PrimitiveDefinition
    | UnnamedMultiTypeConstructedDefinition
    | FuncCandidDefinition
    | ServiceCandidDefinition;

export type MultiTypeConstructedDefinition = {
    candidMeta: CandidMeta;
    innerTypes: [string, CandidDefinition][];
};

export type UnnamedMultiTypeConstructedDefinition = {
    candidMeta: CandidMeta;
    innerTypes: CandidDefinition[];
};

export type SingleTypeConstructedDefinition = {
    candidMeta: CandidMeta;
    innerType: CandidDefinition;
};

export type PrimitiveDefinition = {
    candidMeta: CandidMeta;
};

// Constructed
export type OptCandidMeta = SingleTypeConstructedDefinition;
export type VecCandidMeta = SingleTypeConstructedDefinition;
export type RecordCandidMeta = MultiTypeConstructedDefinition;
export type VariantCandidMeta = MultiTypeConstructedDefinition;
export type TupleCandidMeta = UnnamedMultiTypeConstructedDefinition;
export type BlobCandidMeta = VecCandidMeta;

// Primitives
export type FloatCandidMeta = PrimitiveDefinition;
export type IntCandidMeta = PrimitiveDefinition;
export type NatCandidMeta = PrimitiveDefinition;
export type BoolCandidMeta = PrimitiveDefinition;
export type NullCandidMeta = PrimitiveDefinition;
export type TextCandidMeta = PrimitiveDefinition;

// Reference
export type FuncCandidDefinition = {
    candidMeta: CandidMeta;
    paramCandidMeta: CandidDefinition[];
    returnCandidMeta: CandidDefinition;
};
export type PrincipalCandidMeta = PrimitiveDefinition;
export type ServiceCandidDefinition = {
    candidMeta: CandidMeta;
    funcs: FuncCandidDefinition[];
};

export function CandidValueArb(
    candidTypeMeta: CandidDefinition
): fc.Arbitrary<CandidValues<CorrespondingJSType>> {
    const candidType = candidTypeMeta.candidMeta.candidType;
    if (candidType === CandidType.Record) {
        return RecordValueArb(candidTypeMeta as RecordCandidMeta);
    }
    if (candidType === CandidType.Variant) {
        return VariantValueArb(candidTypeMeta as VariantCandidMeta);
    }
    if (candidType === CandidType.Tuple) {
        return TupleValueArb(candidTypeMeta as TupleCandidMeta);
    }
    if (candidType === CandidType.Opt) {
        return OptValueArb(candidTypeMeta as OptCandidMeta);
    }
    if (candidType === CandidType.Bool) {
        return BoolValueArb;
    }
    if (candidType === CandidType.Vec) {
        return VecValueArb(candidTypeMeta as VecCandidMeta);
    }
    if (candidType === CandidType.Text) {
        return TextValueArb;
    }
    if (candidType === CandidType.Null) {
        return NullValueArb;
    }
    if (candidType === CandidType.Float32) {
        return Float32ValueArb;
    }
    if (candidType === CandidType.Float64) {
        return Float64ValueArb;
    }
    if (candidType === CandidType.Int) {
        return IntValueArb;
    }
    if (candidType === CandidType.Int8) {
        return Int8ValueArb;
    }
    if (candidType === CandidType.Int16) {
        return Int16ValueArb;
    }
    if (candidType === CandidType.Int32) {
        return Int32ValueArb;
    }
    if (candidType === CandidType.Int64) {
        return Int64ValueArb;
    }
    if (candidType === CandidType.Nat) {
        return NatValueArb;
    }
    if (candidType === CandidType.Nat8) {
        return Nat8ValueArb;
    }
    if (candidType === CandidType.Nat16) {
        return Nat16ValueArb;
    }
    if (candidType === CandidType.Nat32) {
        return Nat32ValueArb;
    }
    if (candidType === CandidType.Nat64) {
        return Nat64ValueArb;
    }
    // etc
    throw 'Type cannot be converted to CandidValue yet';
}
