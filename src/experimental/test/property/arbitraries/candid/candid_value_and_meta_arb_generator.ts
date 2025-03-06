import fc from 'fast-check';

import { Context } from '../types';
import { CandidDefinition, WithShapes } from './candid_definition_arb/types';
import { CandidValueAndMeta } from './candid_value_and_meta_arb';
import { CandidValueConstraints, CandidValues } from './candid_values_arb';
import { CorrespondingJSType } from './corresponding_js_type';
import { RecursiveShapes } from './recursive';

export function CandidValueAndMetaArbGenerator<
    T extends CorrespondingJSType,
    D extends CandidDefinition,
    V extends CandidValues<T>
>(
    valueContext: Context<CandidValueConstraints>,
    DefinitionArb: fc.Arbitrary<WithShapes<D>>,
    ValueArb: (
        context: Context<CandidValueConstraints>,
        arb: D,
        recursiveShapes: RecursiveShapes
    ) => fc.Arbitrary<V>
): fc.Arbitrary<CandidValueAndMeta<any>> {
    return DefinitionArb.chain((candidDefinitionAndShapes) => {
        const candidDefinition = candidDefinitionAndShapes.definition;
        const recursiveShapes = candidDefinitionAndShapes.recursiveShapes;
        return fc.tuple(
            fc.constant(candidDefinition),
            ValueArb(valueContext, candidDefinition, recursiveShapes)
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
        typeAnnotation,
        typeObject,
        imports,
        variableAliasDeclarations,
        runtimeTypeObject
    } = definition.candidMeta;
    const { valueLiteral, agentArgumentValue, agentResponseValue } = value;
    return {
        src: {
            typeAnnotation,
            typeObject,
            imports,
            valueLiteral,
            variableAliasDeclarations
        },
        value: {
            agentArgumentValue,
            agentResponseValue,
            runtimeTypeObject
        }
    };
}
