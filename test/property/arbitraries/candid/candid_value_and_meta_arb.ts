import fc from 'fast-check';

import { CandidType as RuntimeCandidType } from '../../../../src/lib/experimental';
import { Context } from '../types';
import { CandidValueConstraints } from './candid_values_arb';
import { BlobArb } from './constructed/blob_arb';
import { OptArb } from './constructed/opt_arb';
import { RecordArb } from './constructed/record_arb';
import { TupleArb } from './constructed/tuple_arb';
import { VariantArb } from './constructed/variant_arb';
import { VecArb } from './constructed/vec_arb';
import { CorrespondingJSType } from './corresponding_js_type';
import { BoolArb } from './primitive/bool';
import { Float32Arb } from './primitive/floats/float32_arb';
import { Float64Arb } from './primitive/floats/float64_arb';
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
import { TextArb } from './primitive/text';
import { FuncArb } from './reference/func_arb';
import { PrincipalArb } from './reference/principal_arb';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type CandidValueAndMeta<T extends CorrespondingJSType, E = T> = {
    value: {
        agentArgumentValue: T;
        agentResponseValue: E;
        runtimeTypeObject: RuntimeCandidType;
    };
    src: {
        typeAnnotation: string;
        typeObject: string;
        variableAliasDeclarations: string[];
        imports: Set<string>;
        valueLiteral: string;
    };
};

/**
 * An arbitrary representing all possible Candid types.
 */
export function CandidValueAndMetaArb(
    context: Context<CandidValueConstraints>
): fc.Arbitrary<CandidValueAndMeta<CorrespondingJSType>> {
    const noConstraints = { ...context, constraints: {} };
    return fc.oneof(
        BlobArb(noConstraints),
        OptArb(context),
        RecordArb(context),
        TupleArb(context),
        VariantArb(context),
        VecArb(context),
        Float32Arb(context),
        Float64Arb(context),
        IntArb(noConstraints),
        Int8Arb(noConstraints),
        Int16Arb(noConstraints),
        Int32Arb(noConstraints),
        Int64Arb(noConstraints),
        NatArb(noConstraints),
        Nat8Arb(noConstraints),
        Nat16Arb(noConstraints),
        Nat32Arb(noConstraints),
        Nat64Arb(noConstraints),
        BoolArb(noConstraints),
        NullArb(noConstraints),
        TextArb(context),
        FuncArb(noConstraints),
        PrincipalArb(noConstraints)
    );
}

// TODO: This needs to support service.
