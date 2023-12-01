import fc from 'fast-check';

import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { Record } from './index';
import { CandidDefinition } from '../../definition_arb/types';
import { RecordDefinitionArb } from './definition_arb';
import { RecordValuesArb } from './values_arb';

export function RecordArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Record>> {
    return RecordDefinitionArb(candidDefinitionArb)
        .chain((recordDef) =>
            fc.tuple(fc.constant(recordDef), RecordValuesArb(recordDef))
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
