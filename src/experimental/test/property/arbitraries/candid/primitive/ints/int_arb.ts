import fc from 'fast-check';

import { Context } from '../../../types';
import {
    IntCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValues } from '../../candid_values_arb';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';

export function IntArb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<bigint>> {
    return CandidValueAndMetaArbGenerator(
        context,
        IntDefinitionArb(context),
        IntValueArb
    );
}

export function IntDefinitionArb(
    context: Context
): WithShapesArb<IntCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'int');
}

export function IntValueArb(): fc.Arbitrary<CandidValues<bigint>> {
    return SimpleCandidValuesArb(
        fc.bigInt(-1000000000000000000n, 1000000000000000000n), // TODO Remove min and max once https://github.com/second-state/wasmedge-quickjs/issues/125
        bigintToSrcLiteral
    );
}
