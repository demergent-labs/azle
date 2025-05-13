import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Context } from '../../../types';
import {
    IntCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueConstraints, CandidValues } from '../../candid_values_arb';
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

export function IntValueArb(
    context: Context<CandidValueConstraints>
): fc.Arbitrary<CandidValues<bigint>> {
    const isExperimental =
        context.api === 'functional' ||
        process.env.AZLE_EXPERIMENTAL === 'true';
    return SimpleCandidValuesArb(
        isExperimental
            ? fc.bigInt(-1_000_000_000_000_000_000n, 1_000_000_000_000_000_000n) // TODO remove once experimental mode no longer relies on wasmedge-quickjs
            : fc.bigInt(),
        bigintToSrcLiteral
    );
}
