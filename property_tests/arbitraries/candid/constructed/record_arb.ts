import fc from 'fast-check';

import { Candid, CandidTypeArb } from '..';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';

export type Record = {
    [x: string]: number | bigint | null;
};

export const RecordArb = fc
    .tuple(
        UniqueIdentifierArb('typeDeclaration'),
        fc.uniqueArray(fc.tuple(JsFunctionNameArb, CandidTypeArb), {
            selector: (entry) => entry[0]
        })
    )
    .map(([name, fields]): Candid<Record> => {
        const typeDeclaration = `const ${name} = Record({\n    ${fields
            .map(
                ([fieldName, fieldDataType]) =>
                    `${fieldName}: ${fieldDataType.src.candidType}`
            )
            .join(',\n    ')}\n});`;

        const value =
            fields.length === 0
                ? {}
                : fields.reduce((record, [fieldName, fieldDataType]) => {
                      return {
                          ...record,
                          [fieldName]: fieldDataType.value
                      };
                  }, {});

        const imports = new Set([
            ...fields.map((field) => field[1].src.candidType),
            'Record'
        ]);

        return {
            src: {
                candidType: name,
                typeDeclaration,
                imports
            },
            value
        };
    });
