import fc from 'fast-check';
import { CorrespondingJSType } from './corresponding_js_type';
import { CandidDefinition, WithShapes } from './candid_definition_arb/types';
import { CandidValueAndMeta } from './candid_value_and_meta_arb';
import { CandidValues } from './candid_values_arb';
import { RecursiveShapes } from './recursive';

export function CandidValueAndMetaArbGenerator<
    T extends CorrespondingJSType,
    D extends CandidDefinition,
    V extends CandidValues<T>
>(
    DefinitionArb: fc.Arbitrary<WithShapes<D>>,
    ValueArb: (
        arb: D,
        recursiveShapes: RecursiveShapes,
        constraints?: any
    ) => fc.Arbitrary<V>,
    valueConstraints?: any
): fc.Arbitrary<CandidValueAndMeta<any>> {
    return DefinitionArb.chain((candidDefinitionAndShapes) => {
        const candidDefinition = candidDefinitionAndShapes.definition;
        const recursiveShape = candidDefinitionAndShapes.recursiveShapes;
        return fc.tuple(
            fc.constant(candidDefinition),
            ValueArb(candidDefinition, recursiveShape, valueConstraints)
        );
    }).map(
        ([
            {
                candidMeta: {
                    candidTypeAnnotation,
                    candidTypeObject,
                    runtimeCandidTypeObject,
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
                value: {
                    agentArgumentValue,
                    agentResponseValue,
                    runtimeCandidTypeObject
                }
            };
        }
    );
}
