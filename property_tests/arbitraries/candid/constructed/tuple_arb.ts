import fc from 'fast-check';

import { Candid, CandidType, CandidTypeArb } from '..';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';

export type Tuple = CandidType[];

export const TupleArb = fc
    .tuple(UniqueIdentifierArb('typeDeclaration'), fc.array(CandidTypeArb))
    .map(([name, fields]): Candid<Tuple> => {
        const innerTypes = fields.map((field) => field.src.candidType);

        const typeDeclaration = `const ${name} = Tuple(${innerTypes.join(
            ', '
        )});`;

        const imports = new Set([...innerTypes, 'Tuple']);

        const value = fields.map((field) => field.value);

        return {
            src: {
                candidType: name,
                typeDeclaration,
                imports
            },
            value
        };
    });
