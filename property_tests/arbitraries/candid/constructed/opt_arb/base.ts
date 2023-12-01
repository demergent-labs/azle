import fc from 'fast-check';
import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { Opt } from './index';
import { CandidDefinition } from '../../definition_arb/types';
import { OptDefinitionArb } from './definition_arb';
import { OptValuesArb } from './values_arb';

export function OptArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Opt>> {
    return OptDefinitionArb(candidTypeArb)
        .chain((optDefinition) =>
            fc.tuple(fc.constant(optDefinition), OptValuesArb(optDefinition))
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
