import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta';
import { CorrespondingJSType } from '../../candid_type_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { Record } from './index';
import {
    CandidDefinition,
    CandidValueArb,
    CandidValues,
    RecordCandidMeta
} from '../../candid_meta_arb';
import { CandidType } from '../../candid_type';

type FieldDefinition = [string, CandidDefinition];
type FieldValue = [string, CandidValues<CorrespondingJSType>];
type FieldArbValue = [string, fc.Arbitrary<CandidValues<CorrespondingJSType>>];

export function RecordDefinitionArb(
    candidTypeArbForFields: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<RecordCandidMeta> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.uniqueArray(
                fc.tuple(JsFunctionNameArb, candidTypeArbForFields),
                {
                    selector: (entry) => entry[0],
                    minLength: 1 // Zero length records are giving that same null error 'vec length of zero sized values too large' // I don't know if that's the same error but it seems like it is
                    // https://github.com/demergent-labs/azle/issues/1453
                }
            ),
            fc.boolean()
        )
        .map(([name, fields, useTypeDeclaration]): RecordCandidMeta => {
            const typeAnnotation = useTypeDeclaration
                ? name
                : generateTypeAnnotation(fields);

            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                fields,
                useTypeDeclaration
            );

            const imports = generateImports(fields);

            return {
                candidMeta: {
                    typeAnnotation,
                    typeAliasDeclarations,
                    imports,
                    candidType: CandidType.Record
                },
                innerTypes: fields
            };
        });
}

export function RecordArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Record>> {
    return RecordDefinitionArb(candidTypeArb)
        .chain((recordType) =>
            fc.tuple(fc.constant(recordType), RecordValueArb(recordType))
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

export function RecordValueArb(
    recordType: RecordCandidMeta
): fc.Arbitrary<CandidValues<Record>> {
    const fieldValues = recordType.innerTypes.map(([name, innerType]) => {
        const result: FieldArbValue = [name, CandidValueArb(innerType)];
        return result;
    });
    const arbitraryFieldValues = fieldValues.map(([key, arbValue]) =>
        arbValue.map((value): FieldValue => [key, value])
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

function generateImports(fields: FieldDefinition[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field[1].candidMeta.imports
    ]);
    return new Set([...fieldImports, 'Record']);
}

function generateTypeAnnotation(fields: FieldDefinition[]): string {
    return `Record({${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.candidMeta.typeAnnotation}`
        )
        .join(',')}})`;
}

function generateTypeAliasDeclarations(
    name: string,
    fields: FieldDefinition[],
    useTypeDeclaration: boolean
): string[] {
    const fieldTypeAliasDeclarations = fields.flatMap(
        (field) => field[1].candidMeta.typeAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldTypeAliasDeclarations,
            `const ${name} = ${generateTypeAnnotation(fields)};`
        ];
    }
    return fieldTypeAliasDeclarations;
}

function generateValue(
    fields: FieldValue[],
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

function generateValueLiteral(fields: FieldValue[]): string {
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
