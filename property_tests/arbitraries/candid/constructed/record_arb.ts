import fc from 'fast-check';

import { Candid, CandidTypeArb } from '..';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';

export type Record = {
    [x: string]: RecordFieldType;
};

export type RecordFieldType = number | bigint | null;
type Field = [string, Candid<RecordFieldType>];

export const RecordArb = fc
    .tuple(
        UniqueIdentifierArb('typeDeclaration'),
        fc.uniqueArray(fc.tuple(JsFunctionNameArb, CandidTypeArb), {
            selector: (entry) => entry[0]
        })
    )
    .map(([name, fields]): Candid<Record> => {
        const typeDeclaration = generateTypeDeclaration(name, fields);

        const imports = generateImports(fields);

        const value = generateValue(fields);

        const valueLiteral = generateValueLiteral(fields);

        const equals = generateEqualsMethod(fields);

        return {
            src: {
                candidType: name,
                typeDeclaration,
                imports,
                valueLiteral
            },
            value,
            equals
        };
    });

function generateImports(fields: Field[]): Set<string> {
    return new Set([
        ...fields.map((field) => field[1].src.candidType),
        'Record'
    ]);
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

function generateEqualsMethod(
    fields: Field[]
): (a: Record, b: Record) => boolean {
    return (a: Record, b: Record): boolean => {
        if (typeof a !== typeof b) {
            return false;
        }

        const aFieldNames = Object.keys(a);
        const bFieldNames = Object.keys(b);
        if (aFieldNames.length !== bFieldNames.length) {
            return false;
        }

        const areFieldNamesTheSame = aFieldNames.reduce(
            (acc, aFieldName, index) =>
                acc && aFieldName === bFieldNames[index],
            true
        );

        if (!areFieldNamesTheSame) {
            return false;
        }

        const areFieldValuesTheSame = fields.reduce(
            (acc, [fieldName, fieldCandidType]) => {
                return (
                    acc && fieldCandidType.equals(a[fieldName], b[fieldName])
                );
            },
            true
        );

        return areFieldValuesTheSame;
    };
}
