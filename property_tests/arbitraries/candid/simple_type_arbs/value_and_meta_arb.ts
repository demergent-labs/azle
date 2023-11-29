import fc from 'fast-check';
import { CorrespondingJSType } from '../candid_type_arb';
import { CandidType } from '../candid_type';
import { CandidValueAndMeta } from '../candid_value_and_meta';
import { SimpleCandidShapeArb } from './shape_arb';
import { SimpleCandidValueArb } from './value_arb';

export function SimpleCandidValueAndMetaArb<T extends CorrespondingJSType>(
    jsValueArb: fc.Arbitrary<T>,
    candidType: CandidType,
    toLiteral: (value: T) => string
): fc.Arbitrary<CandidValueAndMeta<T>> {
    return fc
        .tuple(
            SimpleCandidShapeArb(candidType),
            SimpleCandidValueArb(jsValueArb, toLiteral)
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
