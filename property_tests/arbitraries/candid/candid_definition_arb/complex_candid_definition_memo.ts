import fc from 'fast-check';
import { candidDefinitionMemo } from '.';
import { BlobDefinitionArb } from '../constructed/blob_arb/definition_arb';
import { OptDefinitionArb } from '../constructed/opt_arb/definition_arb';
import { RecordDefinitionArb } from '../constructed/record_arb/definition_arb';
import { TupleDefinitionArb } from '../constructed/tuple_arb/definition_arb';
import { VariantDefinitionArb } from '../constructed/variant_arb/definition_arbs';
import { VecDefinitionArb } from '../constructed/vec_arb/definition_arb';
import { FuncDefinitionArb } from '../reference/func_arb/definition_arb';
import { ServiceDefinitionArb } from '../reference/service_arb/definition_arb';
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
    parents: RecursiveCandidName[],
    constraints: DefinitionConstraints = {}
): CandidDefinitionMemo {
    const weights = constraints.weights ?? {};
    const newConstraints: DefinitionConstraints = {
        depthLevel: constraints.depthLevel,
        weights:
            constraints.recursiveWeights ?? false
                ? constraints.weights ?? {}
                : {},
        recursiveWeights: constraints.recursiveWeights
    };
    return fc.memo((depthLevel) => {
        return fc.oneof(
            {
                arbitrary: BlobDefinitionArb(),
                weight: weights.blob ?? 1
            },
            {
                arbitrary: FuncDefinitionArb(
                    candidDefinitionMemo([], newConstraints)(depthLevel)
                ),
                weight: weights.func ?? 1
            },
            {
                arbitrary: OptDefinitionArb(
                    candidDefinitionMemo,
                    parents,
                    newConstraints
                ),
                weight: weights.opt ?? 1
            },
            {
                arbitrary: RecordDefinitionArb(
                    candidDefinitionMemo([], newConstraints)(depthLevel)
                ),
                weight: weights.record ?? 1
            },
            {
                arbitrary: TupleDefinitionArb(
                    candidDefinitionMemo([], newConstraints)(depthLevel)
                ),
                weight: weights.tuple ?? 1
            },
            {
                arbitrary: VariantDefinitionArb(
                    candidDefinitionMemo,
                    parents,
                    newConstraints
                ),
                weight: weights.variant ?? 1
            },
            {
                arbitrary: VecDefinitionArb(
                    candidDefinitionMemo,
                    parents,
                    constraints
                ),
                weight: weights.vec ?? 1
            },
            {
                arbitrary: ServiceDefinitionArb(
                    candidDefinitionMemo([], newConstraints)(depthLevel)
                ),
                weight: weights.service ?? 0
                // TODO Service is disabled until it is more refined. Maybe the
                // only thing missing is deepEquals
            }
        );
    });
}
