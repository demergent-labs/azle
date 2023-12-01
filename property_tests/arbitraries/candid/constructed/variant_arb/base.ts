import fc from 'fast-check';
import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { Variant } from '.';
import { CandidDefinition } from '../../definition_arb/types';
import { VariantDefinitionArb } from './definition_arbs';
import { VariantValuesArb } from './values_arb';

export function VariantArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Variant>> {
    return VariantDefinitionArb(candidTypeArb)
        .chain((variantDefinition) =>
            fc.tuple(
                fc.constant(variantDefinition),
                VariantValuesArb(variantDefinition)
            )
        )
        .map(
            ([
                {
                    candidMeta: {
                        typeAnnotation,
                        typeAliasDeclarations,
                        imports
                    }
                },
                { agentArgumentValue, agentResponseValue, valueLiteral }
            ]) => {
                return {
                    src: {
                        typeAnnotation,
                        typeAliasDeclarations,
                        imports,
                        valueLiteral
                    },
                    agentArgumentValue,
                    agentResponseValue
                };
            }
        );
}
