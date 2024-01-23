import fc from 'fast-check';
import { CorrespondingJSType } from './corresponding_js_type';
import { CandidDefinition, WithShapes } from './candid_definition_arb/types';
import { CandidValueAndMeta } from './candid_value_and_meta_arb';
import { CandidValueConstraints, CandidValues } from './candid_values_arb';
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
        constraints?: CandidValueConstraints
    ) => fc.Arbitrary<V>,
    valueConstraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<any>> {
    return DefinitionArb.chain((candidDefinitionAndShapes) => {
        const candidDefinition = candidDefinitionAndShapes.definition;
        const recursiveShapes = candidDefinitionAndShapes.recursiveShapes;
        return fc.tuple(
            fc.constant(candidDefinition),
            ValueArb(candidDefinition, recursiveShapes, valueConstraints)
        );
    }).map(([definition, value]) => {
        return definitionAndValueToValueAndMeta(definition, value);
    });
}

export function definitionAndValueToValueAndMeta(
    definition: CandidDefinition,
    value: CandidValues<CorrespondingJSType>
): CandidValueAndMeta<CorrespondingJSType> {
    const {
        candidTypeAnnotation,
        candidTypeObject,
        imports,
        variableAliasDeclarations,
        runtimeCandidTypeObject
    } = definition.candidMeta;
    const { valueLiteral, agentArgumentValue, agentResponseValue } = value;
    return {
        src: {
            candidTypeAnnotation,
            candidTypeObject,
            imports,
            valueLiteral,
            variableAliasDeclarations
        },
        value: {
            agentArgumentValue,
            agentResponseValue,
            runtimeCandidTypeObject
        }
    };
}
