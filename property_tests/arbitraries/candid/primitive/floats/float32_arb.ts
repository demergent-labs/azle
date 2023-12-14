import fc from 'fast-check';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { FloatCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues } from '../../candid_values_arb';

export function Float32Arb(): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        Float32DefinitionArb(),
        Float32ValueArb
    );
}

export function Float32DefinitionArb(): fc.Arbitrary<FloatCandidDefinition> {
    return SimpleCandidDefinitionArb('float32');
}

// TODO multiplying by zero is to remove -0
// TODO we should open an issue with agent-js
// TODO the agent should encode and decode -0 correctly
export function Float32ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(
        fc.float().map((sample) => (sample === 0 ? sample * 0 : sample)),
        floatToSrcLiteral
    );
}
