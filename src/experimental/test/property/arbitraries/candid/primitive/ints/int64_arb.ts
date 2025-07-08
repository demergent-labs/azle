import '#experimental/build/assert_experimental';

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

export function Int64Arb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<bigint>> {
    return CandidValueAndMetaArbGenerator(
        context,
        Int64DefinitionArb(),
        Int64ValueArb
    );
}

export function Int64DefinitionArb(): WithShapesArb<IntCandidDefinition> {
    return SimpleCandidDefinitionArb('int64');
}

export function Int64ValueArb(): fc.Arbitrary<CandidValues<bigint>> {
    const isExperimental = process.env.AZLE_EXPERIMENTAL === 'true';
    const exponent = isExperimental ? 59 : 63; // TODO remove once experimental mode no longer relies on wasmedge-quickjs
    return SimpleCandidValuesArb(
        fc.bigInt({
            min: -(2n ** BigInt(exponent)),
            max: 2n ** BigInt(exponent) - 1n
        }),
        bigintToSrcLiteral
    );
}
