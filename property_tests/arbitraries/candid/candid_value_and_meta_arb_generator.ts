import fc from 'fast-check';
import { CorrespondingJSType } from './corresponding_js_type';
import { CandidDefinition } from './candid_definition_arb/types';
import { CandidValueAndMeta } from './candid_value_and_meta_arb';
import { CandidValues } from './candid_values_arb';

export function CandidValueAndMetaArbGenerator<
    T extends CorrespondingJSType,
    D extends CandidDefinition,
    V extends CandidValues<T>
>(
    DefinitionArb: fc.Arbitrary<D>,
    ValueArb: (arb: D) => fc.Arbitrary<V>
): fc.Arbitrary<CandidValueAndMeta<any>> {
    return DefinitionArb.chain((candidDefinition) =>
        fc.tuple(fc.constant(candidDefinition), ValueArb(candidDefinition))
    ).map(
        ([
            {
                candidMeta: {
                    candidTypeAnnotation,
                    candidTypeObject,
                    variableAliasDeclarations,
                    imports
                }
            },
            { agentArgumentValue, agentResponseValue, valueLiteral }
        ]) => {
            return {
                src: {
                    candidTypeAnnotation,
                    candidTypeObject,
                    variableAliasDeclarations,
                    imports,
                    valueLiteral
                },
                agentArgumentValue,
                agentResponseValue
            };
        }
    );
}
