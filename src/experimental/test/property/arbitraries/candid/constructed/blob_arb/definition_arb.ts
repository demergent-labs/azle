import '#experimental/build/assert_experimental';

import {
    BlobCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';

export function BlobDefinitionArb(): WithShapesArb<BlobCandidDefinition> {
    return SimpleCandidDefinitionArb('blob');
}
