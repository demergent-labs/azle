import fc from 'fast-check';

import { CandidMeta } from '../candid_arb';
import { CandidType, CandidTypeArb } from '../candid_type_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';

export type Record = {
    [x: string]: CandidType;
};

type Field = [string, CandidMeta<CandidType>];

export const RecordArb = fc
    .tuple(
        UniqueIdentifierArb('typeDeclaration'),
        fc.uniqueArray(fc.tuple(JsFunctionNameArb, CandidTypeArb), {
            selector: (entry) => entry[0]
        })
    )
    .map(([name, fields]): CandidMeta<Record> => {
        const typeDeclaration = generateTypeDeclaration(name, fields);

        const imports = generateImports(fields);

        const valueLiteral = generateValueLiteral(fields);

        const value = generateValue(fields);

        return {
            src: {
                candidType: name,
                typeDeclaration,
                imports,
                valueLiteral
            },
            value
        };
    });

function generateImports(fields: Field[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [...field[1].src.imports]);
    return new Set([...fieldImports, 'Record']);
}

function generateTypeDeclaration(name: string, fields: Field[]): string {
    return `const ${name} = Record({\n    ${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.src.candidType}`
        )
        .join(',\n    ')}\n});`;
}

function generateValue(fields: Field[]): Record {
    return fields.length === 0
        ? {}
        : fields.reduce((record, [fieldName, fieldDataType]) => {
              return {
                  ...record,
                  [fieldName]: fieldDataType.value
              };
          }, {});
}

function generateValueLiteral(fields: Field[]): string {
    if (fields.length === 0) {
        return '{}';
    }

    const fieldLiterals = fields
        .map(
            ([fieldName, fieldValue]) =>
                `${fieldName}: ${fieldValue.src.valueLiteral}`
        )
        .join(',\n');

    return `{
        ${fieldLiterals}
    }`;
}
