import fc from 'fast-check';
import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { Vec } from './index';
import { CandidDefinition } from '../../definition_arb/types';
import { VecDefinitionArb } from './definition_arb';
import { VecValuesArb } from './values_arb';
import { CandidArb } from '../../complex_type_arb';

export function VecArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Vec>> {
    return CandidArb(VecDefinitionArb, VecValuesArb, candidDefinitionArb);
}

// export function VecArb(
//     candidDefinitionArb: fc.Arbitrary<CandidDefinition>
// ): fc.Arbitrary<CandidValueAndMeta<Vec>> {
//     return VecDefinitionArb(candidDefinitionArb)
//         .chain((vecType) =>
//             fc.tuple(fc.constant(vecType), VecValueArb(vecType))
//         )
//         .map(
//             ([
//                 {
//                     candidMeta: {
//                         typeAnnotation,
//                         typeAliasDeclarations,
//                         imports
//                     }
//                 },
//                 { agentArgumentValue, agentResponseValue, valueLiteral }
//             ]) => {
//                 return {
//                     src: {
//                         typeAnnotation,
//                         typeAliasDeclarations,
//                         imports,
//                         valueLiteral
//                     },
//                     agentArgumentValue,
//                     agentResponseValue
//                 };
//             }
//         );
// }
