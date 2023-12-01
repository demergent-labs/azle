import fc from 'fast-check';
import { CorrespondingJSType } from './corresponding_js_type';
import { CandidDefinition } from './definition_arb/types';
import { CandidValueAndMeta } from './value_and_meta_arb';
import { CandidValues } from './values';

export function ComplexCandidValueAndMetaArb<
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
                candidMeta: { typeAnnotation, typeAliasDeclarations, imports }
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
