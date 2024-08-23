import fc from 'fast-check';

import { Context } from '../../../types';
import {
    FloatCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValues } from '../../candid_values_arb';
import { RecursiveShapes } from '../../recursive';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';

export interface Float32Constraints extends fc.Float32ArrayConstraints {
    noNegativeZero?: boolean;
}

export function Float32Arb(
    context: Context<Float32Constraints>
): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        context,
        Float32DefinitionArb({ ...context, constraints: {} }),
        Float32ValueArb
    );
}

export function Float32DefinitionArb(
    context: Context
): WithShapesArb<FloatCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'float32');
}

export function Float32ValueArb<C extends Float32Constraints>(
    context: Context<C>,
    _?: FloatCandidDefinition,
    _recShapes?: RecursiveShapes
): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(
        float32(context.constraints),
        floatToSrcLiteral
    );
}

function float32(constraints?: Float32Constraints): fc.Arbitrary<number> {
    return fc
        .float32Array({ ...constraints, maxLength: 1, minLength: 1 })
        .map((sample) => {
            if (constraints?.noNegativeZero) {
                return sample[0] === 0 ? 0 : sample[0];
            }
            return sample[0];
        });
}
