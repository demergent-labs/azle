import fc from 'fast-check';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import {
    FloatCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValues } from '../../candid_values_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { RecursiveShapes } from '../../recursive';

export interface Float64Constraints extends fc.Float64ArrayConstraints {
    noNegativeZero?: boolean;
}

export function Float64Arb(
    constraints?: Float64Constraints
): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        Float64DefinitionArb(),
        Float64ValueArb,
        constraints
    );
}

export function Float64DefinitionArb(): WithShapesArb<FloatCandidDefinition> {
    return SimpleCandidDefinitionArb('float64');
}

export function Float64ValueArb<C extends Float64Constraints>(
    _?: FloatCandidDefinition,
    _recShapes?: RecursiveShapes,
    constraints?: C
): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(float64(constraints), floatToSrcLiteral);
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
