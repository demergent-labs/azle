import fc from 'fast-check';
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
import { PrincipalValueArb } from './reference/principal_arb';
import { FuncValueArb } from './reference/func_arb/base';
import { VoidValueArb } from './primitive/void';
import { ServiceValueArb } from './reference/service_arb/base';
import {
    CandidDefinition,
    OptCandidDefinition,
    RecordCandidDefinition,
    ServiceCandidDefinition,
    TupleCandidDefinition,
    VariantCandidDefinition,
    VecCandidDefinition
} from './definition_arb/types';
import { BlobValueArb } from './constructed/blob_arb';
import { CorrespondingJSType } from './corresponding_js_type';

export type CandidValues<T extends CorrespondingJSType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    valueLiteral: string;
};

export function CandidValueArb(
    candidTypeMeta: CandidDefinition
): fc.Arbitrary<CandidValues<CorrespondingJSType>> {
    const candidType = candidTypeMeta.candidMeta.candidType;
    if (candidType === CandidType.Blob) {
        return BlobValueArb;
    }
    if (candidType === CandidType.Opt) {
        return OptValueArb(candidTypeMeta as OptCandidDefinition);
    }
    if (candidType === CandidType.Record) {
        return RecordValueArb(candidTypeMeta as RecordCandidDefinition);
    }
    if (candidType === CandidType.Tuple) {
        return TupleValueArb(candidTypeMeta as TupleCandidDefinition);
    }
    if (candidType === CandidType.Variant) {
        return VariantValueArb(candidTypeMeta as VariantCandidDefinition);
    }
    if (candidType === CandidType.Vec) {
        return VecValueArb(candidTypeMeta as VecCandidDefinition);
    }
    if (candidType === CandidType.Bool) {
        return BoolValueArb;
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
    if (candidType === CandidType.Null) {
        return NullValueArb;
    }
    if (candidType === CandidType.Text) {
        return TextValueArb;
    }
    if (candidType === CandidType.Void) {
        return VoidValueArb;
    }
    if (candidType === CandidType.Func) {
        return FuncValueArb;
    }
    if (candidType === CandidType.Principal) {
        return PrincipalValueArb;
    }
    if (candidType === CandidType.Service) {
        return ServiceValueArb(candidTypeMeta as ServiceCandidDefinition);
    }
    throw new Error('Unreachable');
}
