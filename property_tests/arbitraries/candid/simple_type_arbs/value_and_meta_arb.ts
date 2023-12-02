import fc from 'fast-check';
import { CorrespondingJSType } from '../corresponding_js_type';
import { SimpleCandidType } from '../candid_type';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { SimpleCandidDefinitionArb } from './definition_arb';
import { SimpleCandidValuesArb } from './values_arb';

export function SimpleCandidValueAndMetaArb<T extends CorrespondingJSType>(
    jsValueArb: fc.Arbitrary<T>,
    candidType: SimpleCandidType,
    toLiteral: (value: T) => string
): fc.Arbitrary<CandidValueAndMeta<T>> {
    return fc
        .tuple(
            SimpleCandidDefinitionArb(candidType),
            SimpleCandidValuesArb(jsValueArb, toLiteral)
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
