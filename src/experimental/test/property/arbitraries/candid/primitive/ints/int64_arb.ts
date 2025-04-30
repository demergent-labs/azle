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

export function Int64Arb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<bigint>> {
    return CandidValueAndMetaArbGenerator(
        context,
        Int64DefinitionArb(context),
        Int64ValueArb
    );
}

export function Int64DefinitionArb(
    context: Context
): WithShapesArb<IntCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'int64');
}

export function Int64ValueArb(
    context: Context<CandidValueConstraints>
): fc.Arbitrary<CandidValues<bigint>> {
    const isExperimental =
        context.api === 'functional' ||
        process.env.AZLE_EXPERIMENTAL === 'true';
    const exponent = isExperimental ? 59 : 63; // TODO remove once experimental mode no longer relies on wasmedge-quickjs
    return SimpleCandidValuesArb(
        fc.bigInt({
            min: -(2n ** BigInt(exponent)),
            max: 2n ** BigInt(exponent) - 1n
        }),
        bigintToSrcLiteral
    );
}
