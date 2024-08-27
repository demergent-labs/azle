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

export interface Float64Constraints extends fc.Float64ArrayConstraints {
    noNegativeZero?: boolean;
}

export function Float64Arb(
    context: Context<Float64Constraints>
): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        context,
        Float64DefinitionArb({ ...context, constraints: {} }),
        Float64ValueArb
    );
}

export function Float64DefinitionArb(
    context: Context
): WithShapesArb<FloatCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'float64');
}

export function Float64ValueArb<C extends Float64Constraints>(
    context: Context<C>,
    _?: FloatCandidDefinition,
    _recShapes?: RecursiveShapes
): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(
        float64(context.constraints),
        floatToSrcLiteral
    );
}

function float64(constraints?: Float64Constraints): fc.Arbitrary<number> {
    return fc
        .float64Array({ ...constraints, maxLength: 1, minLength: 1 })
        .map((sample) => {
            if (constraints?.noNegativeZero) {
                return sample[0] === 0 ? 0 : sample[0];
            }
            return sample[0];
        });
}
