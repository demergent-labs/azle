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
import { VariantArb } from './constructed/variant_arb';
import { RecordArb } from './constructed/record_arb';
import { TupleArb } from './constructed/tuple_arb';
import { OptArb } from './constructed/opt_arb';
import { VecArb } from './constructed/vec_arb';
import { FuncArb } from './reference/func_arb';
import { CorrespondingJSType } from './corresponding_js_type';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type CandidValueAndMeta<T extends CorrespondingJSType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    src: {
        candidTypeAnnotation: string;
        candidTypeObject: string;
        variableAliasDeclarations: string[];
        imports: Set<string>;
        valueLiteral: string;
    };
};

/**
 * An arbitrary representing all possible Candid types.
 */
export function CandidValueAndMetaArb(): fc.Arbitrary<
    CandidValueAndMeta<CorrespondingJSType>
> {
    return fc.oneof(
        BlobArb(),
        OptArb(),
        RecordArb(),
        TupleArb(),
        VariantArb(),
        VecArb(),
        Float32Arb(),
        Float64Arb(),
        IntArb(),
        Int8Arb(),
        Int16Arb(),
        Int32Arb(),
        Int64Arb(),
        NatArb(),
        Nat8Arb(),
        Nat16Arb(),
        Nat32Arb(),
        Nat64Arb(),
        BoolArb(),
        NullArb(),
        TextArb(),
        FuncArb(),
        PrincipalArb()
    );
}

// TODO: This needs to support service.
