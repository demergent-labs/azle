import fc from 'fast-check';

import { CandidType as RuntimeCandidType } from '#experimental/lib/index';

import { Context } from '../types';
import { CandidValueConstraints } from './candid_values_arb';
import { CorrespondingJSType } from './corresponding_js_type';
import { Float32Arb } from './primitive/floats/float32_arb';
import { Float64Arb } from './primitive/floats/float64_arb';
import { IntArb } from './primitive/ints/int_arb';
import { Int32Arb } from './primitive/ints/int32_arb';
import { Int64Arb } from './primitive/ints/int64_arb';
import { NatArb } from './primitive/nats/nat_arb';
import { Nat32Arb } from './primitive/nats/nat32_arb';
import { Nat64Arb } from './primitive/nats/nat64_arb';

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
        Float32Arb(context),
        Float64Arb(context),
        IntArb(noConstraints),
        Int32Arb(noConstraints),
        Int64Arb(noConstraints),
        NatArb(noConstraints),
        Nat32Arb(noConstraints),
        Nat64Arb(noConstraints)
    );
}

// TODO: This needs to support service.
