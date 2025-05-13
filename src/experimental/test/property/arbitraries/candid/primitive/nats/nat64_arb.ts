import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Context } from '../../../types';
import {
    NatCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueConstraints, CandidValues } from '../../candid_values_arb';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';

export function Nat64Arb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<bigint>> {
    return CandidValueAndMetaArbGenerator(
        context,
        Nat64DefinitionArb(context),
        Nat64ValueArb
    );
}

export function Nat64DefinitionArb(
    context: Context
): WithShapesArb<NatCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'nat64');
}

export function Nat64ValueArb(
    context: Context<CandidValueConstraints>
): fc.Arbitrary<CandidValues<bigint>> {
    const isExperimental =
        context.api === 'functional' ||
        process.env.AZLE_EXPERIMENTAL === 'true';
    const exponent = isExperimental ? 60 : 64; // TODO remove once experimental mode no longer relies on wasmedge-quickjs
    return SimpleCandidValuesArb(
        fc.bigInt({
            min: 0n,
            max: 2n ** BigInt(exponent) - 1n
        }),
        bigintToSrcLiteral
    );
}
