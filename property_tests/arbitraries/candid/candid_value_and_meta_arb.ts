import fc from 'fast-check';

import { CandidType as RuntimeCandidType } from '../../../src/lib/experimental';
import { Syntax } from '../types';
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
        runtimeCandidTypeObject: RuntimeCandidType;
    };
    src: {
        candidTypeAnnotation: string;
        candidTypeObject: string;
        variableAliasDeclarations: string[];
        imports: Set<string>;
        valueLiteral: string;
        idl: string;
    };
};

/**
 * An arbitrary representing all possible Candid types.
 */
export function CandidValueAndMetaArb(
    syntax: Syntax,
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<CorrespondingJSType>> {
    return fc.oneof(
        BlobArb(syntax),
        OptArb(syntax, constraints),
        RecordArb(syntax, constraints),
        TupleArb(syntax, constraints),
        VariantArb(syntax, constraints),
        VecArb(syntax, constraints),
        Float32Arb(syntax, constraints),
        Float64Arb(syntax, constraints),
        IntArb(syntax),
        Int8Arb(syntax),
        Int16Arb(syntax),
        Int32Arb(syntax),
        Int64Arb(syntax),
        NatArb(syntax),
        Nat8Arb(syntax),
        Nat16Arb(syntax),
        Nat32Arb(syntax),
        Nat64Arb(syntax),
        BoolArb(syntax),
        NullArb(syntax),
        TextArb(syntax, constraints),
        FuncArb(syntax),
        PrincipalArb(syntax)
    );
}

// TODO: This needs to support service.
