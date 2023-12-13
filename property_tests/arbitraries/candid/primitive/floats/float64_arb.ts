import fc from 'fast-check';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { FloatCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues } from '../../candid_values_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';

export function Float64Arb(): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        Float64DefinitionArb(),
        Float64ValueArb
    );
}

export function Float64DefinitionArb(): fc.Arbitrary<FloatCandidDefinition> {
    return SimpleCandidDefinitionArb('float64');
}

export function Float64ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(float64(), floatToSrcLiteral);
}

// TODO multiplying by zero is to remove -0
// TODO we should open an issue with agent-js
// TODO the agent should encode and decode -0 correctly
function float64(): fc.Arbitrary<number> {
    return fc
        .float64Array({ maxLength: 1, minLength: 1 })
        .map((sample) => (sample[0] === 0 ? sample[0] * 0 : sample[0]));
}
