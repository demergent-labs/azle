import fc from 'fast-check';
import { CorrespondingJSType } from './corresponding_js_type';
import { CandidDefinition } from './definition_arb/types';
import { CandidValueAndMeta } from './value_and_meta_arb';
import { CandidValues } from './values';

export function CandidArb<
    T extends CorrespondingJSType,
    D extends CandidDefinition,
    V extends CandidValues<T>
>(
    DefinitionArb: (
        candidTypeArb: fc.Arbitrary<CandidDefinition>
    ) => fc.Arbitrary<D>,
    ValueArb: (arb: D) => fc.Arbitrary<V>,
    innerDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<any>> {
    return DefinitionArb(innerDefinitionArb)
        .chain((tupleDefinition) =>
            fc.tuple(fc.constant(tupleDefinition), ValueArb(tupleDefinition))
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
