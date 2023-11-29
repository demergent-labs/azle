import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidType } from '../../candid_type_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { Record } from './index';
import {
    CandidTypeMeta,
    CandidValueArb,
    CandidValues,
    RecordCandidMeta
} from '../../candid_meta_arb';
import { CandidClass } from '../../candid_class';

type TypeField = [string, CandidTypeMeta];
type ValueField = [string, CandidValues<CandidType>];
type ArbValueField = [string, fc.Arbitrary<CandidValues<CandidType>>];

export function RecordTypeArb(
    candidTypeArbForFields: fc.Arbitrary<CandidTypeMeta>
): fc.Arbitrary<RecordCandidMeta> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.uniqueArray(
                fc.tuple(JsFunctionNameArb, candidTypeArbForFields),
                {
                    selector: (entry) => entry[0],
                    minLength: 1 // Zero length records are giving that same null error 'vec length of zero sized values too large' // I don't know if that's the same error but it seems like it is
                }
            ),
            fc.boolean()
        )
        .map(([name, fields, useTypeDeclaration]): RecordCandidMeta => {
            const candidType = useTypeDeclaration
                ? name
                : generateCandidType(fields);

            const typeDeclaration = generateTypeDeclaration(
                name,
                fields,
                useTypeDeclaration
            );

            const imports = generateImports(fields);

            return {
                candidMeta: {
                    candidType,
                    typeDeclaration,
                    imports,
                    candidClass: CandidClass.Record
                },
                innerTypes: fields
            };
        });
}

export function RecordArb(
    candidTypeArb: fc.Arbitrary<CandidTypeMeta>
): fc.Arbitrary<CandidValueAndMeta<Record>> {
    return RecordTypeArb(candidTypeArb)
        .chain((recordType) =>
            fc.tuple(fc.constant(recordType), RecordValueArb(recordType))
        )
        .map(
            ([
                recordType,
                { agentArgumentValue, agentResponseValue, valueLiteral }
            ]) => {
                const candidType = recordType.candidMeta.candidType;
                const typeDeclaration = recordType.candidMeta.typeDeclaration;
                const imports = recordType.candidMeta.imports;

                return {
                    src: {
                        candidType,
                        typeDeclaration,
                        imports,
                        valueLiteral
                    },
                    agentArgumentValue,
                    agentResponseValue
                };
            }
        );
}

export function RecordValueArb(
    recordType: RecordCandidMeta
): fc.Arbitrary<CandidValues<Record>> {
    const fieldValues = recordType.innerTypes.map(([name, innerType]) => {
        const result: ArbValueField = [name, CandidValueArb(innerType)];
        return result;
    });
    const arbitraryFieldValues = fieldValues.map(([key, arbValue]) =>
        arbValue.map((value): [string, CandidValues<CandidType>] => [
            key,
            value
        ])
    );

    return fc.tuple(...arbitraryFieldValues).map((fieldValues) => {
        const valueLiteral = generateValueLiteral(fieldValues);
        const agentArgumentValue = generateValue(fieldValues);
        const agentResponseValue = generateValue(fieldValues, true);

        return {
            valueLiteral,
            agentArgumentValue,
            agentResponseValue
        };
    });
}

function generateImports(fields: TypeField[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field[1].candidMeta.imports
    ]);
    return new Set([...fieldImports, 'Record']);
}

function generateCandidType(fields: TypeField[]): string {
    return `Record({${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.candidMeta.candidType}`
        )
        .join(',')}})`;
}

function generateTypeDeclaration(
    name: string,
    fields: TypeField[],
    useTypeDeclaration: boolean
): string {
    const fieldTypeDeclarations = fields
        .map((field) => field[1].candidMeta.typeDeclaration)
        .join('\n');
    if (useTypeDeclaration) {
        return `${fieldTypeDeclarations}\nconst ${name} = ${generateCandidType(
            fields
        )};`;
    }
    return fieldTypeDeclarations;
}

function generateValue(
    fields: ValueField[],
    returned: boolean = false
): Record {
    return fields.length === 0
        ? {}
        : fields.reduce((record, [fieldName, fieldCandidTypeMeta]) => {
              return {
                  ...record,
                  [fieldName]: returned
                      ? fieldCandidTypeMeta.agentResponseValue
                      : fieldCandidTypeMeta.agentArgumentValue
              };
          }, {});
}

function generateValueLiteral(fields: ValueField[]): string {
    if (fields.length === 0) {
        return '{}';
    }

    const fieldLiterals = fields
        .map(
            ([fieldName, fieldValue]) =>
                `${fieldName}: ${fieldValue.valueLiteral}`
        )
        .join(',\n');

    return `{
        ${fieldLiterals}
    }`;
}
