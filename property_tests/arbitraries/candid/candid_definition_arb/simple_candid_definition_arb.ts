import fc from 'fast-check';

import { Context } from '../../types';
import { BoolDefinitionArb } from '../primitive/bool';
import { Float32DefinitionArb } from '../primitive/floats/float32_arb';
import { Float64DefinitionArb } from '../primitive/floats/float64_arb';
import { IntDefinitionArb } from '../primitive/ints/int_arb';
import { Int8DefinitionArb } from '../primitive/ints/int8_arb';
import { Int16DefinitionArb } from '../primitive/ints/int16_arb';
import { Int32DefinitionArb } from '../primitive/ints/int32_arb';
import { Int64DefinitionArb } from '../primitive/ints/int64_arb';
import { NatDefinitionArb } from '../primitive/nats/nat_arb';
import { Nat8DefinitionArb } from '../primitive/nats/nat8_arb';
import { Nat16DefinitionArb } from '../primitive/nats/nat16_arb';
import { Nat32DefinitionArb } from '../primitive/nats/nat32_arb';
import { Nat64DefinitionArb } from '../primitive/nats/nat64_arb';
import { NullDefinitionArb } from '../primitive/null';
import { TextDefinitionArb } from '../primitive/text';
import { PrincipalDefinitionArb } from '../reference/principal_arb';
import { PrimitiveDefinition, WithShapesArb } from './types';

export type PrimitiveDefinitionWeights = Partial<{
    bool?: number;
    float32?: number;
    float64?: number;
    int?: number;
    int8?: number;
    int16?: number;
    int32?: number;
    int64?: number;
    nat?: number;
    nat8?: number;
    nat16?: number;
    nat32?: number;
    nat64?: number;
    null?: number;
    text?: number;
    principal?: number;
}>;

// The number of options below (bool, float32, float64, int, nat, etc)
export const PRIM_ARB_COUNT = 16;

export function primitiveCandidDefinitionArb(
    context: Context<PrimitiveDefinitionWeights>
): WithShapesArb<PrimitiveDefinition> {
    const constraints = context.constraints;
    const newContext = { ...context, constraints: {} };
    return fc.oneof(
        {
            arbitrary: BoolDefinitionArb(newContext),
            weight: constraints.bool ?? 1
        },
        {
            arbitrary: Float32DefinitionArb(newContext),
            weight: constraints.float32 ?? 1
        },
        {
            arbitrary: Float64DefinitionArb(newContext),
            weight: constraints.float64 ?? 1
        },
        {
            arbitrary: IntDefinitionArb(newContext),
            weight: constraints.int ?? 1
        },
        {
            arbitrary: Int8DefinitionArb(newContext),
            weight: constraints.int8 ?? 1
        },
        {
            arbitrary: Int16DefinitionArb(newContext),
            weight: constraints.int16 ?? 1
        },
        {
            arbitrary: Int32DefinitionArb(newContext),
            weight: constraints.int32 ?? 1
        },
        {
            arbitrary: Int64DefinitionArb(newContext),
            weight: constraints.int64 ?? 1
        },
        {
            arbitrary: NatDefinitionArb(newContext),
            weight: constraints.nat ?? 1
        },
        {
            arbitrary: Nat8DefinitionArb(newContext),
            weight: constraints.nat8 ?? 1
        },
        {
            arbitrary: Nat16DefinitionArb(newContext),
            weight: constraints.nat16 ?? 1
        },
        {
            arbitrary: Nat32DefinitionArb(newContext),
            weight: constraints.nat32 ?? 1
        },
        {
            arbitrary: Nat64DefinitionArb(newContext),
            weight: constraints.nat64 ?? 1
        },
        {
            arbitrary: NullDefinitionArb(newContext),
            weight: constraints.null ?? 1
        },
        {
            arbitrary: TextDefinitionArb(newContext),
            weight: constraints.text ?? 1
        },
        {
            arbitrary: PrincipalDefinitionArb(newContext),
            weight: constraints.principal ?? 1
        }
    );
}
