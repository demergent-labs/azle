import fc from 'fast-check';

import { Context } from '../../types';
import { BlobDefinitionArb } from '../constructed/blob_arb/definition_arb';
import { OptDefinitionArb } from '../constructed/opt_arb/definition_arb';
import { RecordDefinitionArb } from '../constructed/record_arb/definition_arb';
import { TupleDefinitionArb } from '../constructed/tuple_arb/definition_arb';
import { VariantDefinitionArb } from '../constructed/variant_arb/definition_arbs';
import { VecDefinitionArb } from '../constructed/vec_arb/definition_arb';
import { FuncDefinitionArb } from '../reference/func_arb/definition_arb';
import { ServiceDefinitionArb } from '../reference/service_arb/definition_arb';
import { candidDefinitionMemo } from '.';
import {
    CandidDefinitionMemo,
    DefinitionConstraints,
    RecursiveCandidName
} from './types';

export type ComplexDefinitionWeights = Partial<{
    blob: number;
    opt: number;
    record: number;
    tuple: number;
    variant: number;
    vec: number;
    func: number;
    service: number;
}>;

// The number of options below (blob, func, opt, etc)
export const COMPLEX_ARB_COUNT = 8;

export function complexCandidDefinitionMemo(
    context: Context<DefinitionConstraints>,
    parents: RecursiveCandidName[]
): CandidDefinitionMemo {
    const constraints = context.constraints;
    const weights = constraints.weights ?? {};
    const newConstraints: DefinitionConstraints = {
        depthLevel: constraints.depthLevel,
        weights:
            constraints.recursiveWeights ?? false
                ? constraints.weights ?? {}
                : {},
        recursiveWeights: constraints.recursiveWeights,
        forceInline: constraints.forceInline
    };
    const newContext = {
        api: context.api,
        constraints: newConstraints
    };
    return fc.memo((depthLevel) => {
        return fc.oneof(
            {
                arbitrary: BlobDefinitionArb({ ...context, constraints: {} }),
                weight: weights.blob ?? 1
            },
            {
                arbitrary: FuncDefinitionArb(
                    { ...context, constraints: {} },
                    candidDefinitionMemo(newContext, [])(depthLevel)
                ),
                weight: weights.func ?? 1
            },
            {
                arbitrary: OptDefinitionArb(
                    newContext,
                    candidDefinitionMemo,
                    parents
                ),
                weight: weights.opt ?? 1
            },
            {
                arbitrary: RecordDefinitionArb(
                    { ...context, constraints: {} },
                    candidDefinitionMemo(newContext, [])(depthLevel)
                ),
                weight: weights.record ?? 1
            },
            {
                arbitrary: TupleDefinitionArb(
                    { ...context, constraints: {} },
                    candidDefinitionMemo(newContext, [])(depthLevel)
                ),
                weight: weights.tuple ?? 1
            },
            {
                arbitrary: VariantDefinitionArb(
                    { ...context, constraints: newConstraints },
                    candidDefinitionMemo,
                    parents
                ),
                weight: weights.variant ?? 1
            },
            {
                arbitrary: VecDefinitionArb(
                    context,
                    candidDefinitionMemo,
                    parents
                ),
                weight: weights.vec ?? 1
            },
            {
                arbitrary: ServiceDefinitionArb(
                    { ...context, constraints: {} },
                    candidDefinitionMemo(newContext, [])(depthLevel)
                ),
                weight: weights.service ?? 0
                // TODO Service is disabled until it is more refined. Maybe the
                // only thing missing is deepEquals
            }
        );
    });
}
