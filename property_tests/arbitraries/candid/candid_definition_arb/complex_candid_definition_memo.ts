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
import { CandidDefinitionMemo, RecursiveCandidDefinition } from './types';

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
export const COMPLEX_ARB_COUNT = 9; // TODO change this to 8 after we debug the current issue

export function complexCandidDefinitionMemo(
    parents: RecursiveCandidDefinition[],
    weights: ComplexDefinitionWeights = {}
): CandidDefinitionMemo {
    return fc.memo((n) => {
        return fc.oneof(
            {
                arbitrary: BlobDefinitionArb(),
                weight: weights.blob ?? 1
            },
            {
                arbitrary: FuncDefinitionArb(candidDefinitionMemo([])(n)),
                weight: weights.func ?? 1
            },
            {
                arbitrary: OptDefinitionArb(candidDefinitionMemo, parents, n),
                weight: weights.opt ?? 1
            },
            {
                arbitrary: RecordDefinitionArb(candidDefinitionMemo([])(n)),
                weight: weights.record ?? 1
            },
            {
                arbitrary: TupleDefinitionArb(candidDefinitionMemo([])(n)),
                weight: weights.tuple ?? 1
            },
            {
                arbitrary: VariantDefinitionArb(
                    candidDefinitionMemo,
                    parents,
                    n
                ),
                weight: weights.variant ?? 1
            },
            {
                arbitrary: VecDefinitionArb(candidDefinitionMemo, parents, n),
                weight: weights.vec ?? 1
            },
            {
                arbitrary: ServiceDefinitionArb(candidDefinitionMemo([])(n)),
                weight: weights.service ?? 0
                // TODO Service is disabled until it is more refined. Maybe the
                // only thing missing is deepEquals
            }
        );
    });
}
