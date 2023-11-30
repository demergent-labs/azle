import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta';
import { CorrespondingJSType } from '../../candid_type_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { Variant } from '.';
import {
    CandidDefinition,
    CandidValueArb,
    CandidValues,
    VariantCandidMeta
} from '../../candid_meta_arb';
import { CandidType } from '../../candid_type';

type FieldDefinition = [string, CandidDefinition];
type FieldValue = [string, CandidValues<CorrespondingJSType>];

export function VariantDefinitionArb(
    candidTypeArbForFields: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<VariantCandidMeta> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            VariantFieldsArb(candidTypeArbForFields),
            fc.boolean()
        )
        .map(([name, fields, useTypeDeclaration]): VariantCandidMeta => {
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
                    candidType: CandidType.Variant
                },
                innerTypes: fields
            };
        });
}

export function VariantArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Variant>> {
    return VariantDefinitionArb(candidTypeArb)
        .chain((variantDefinition) =>
            fc.tuple(
                fc.constant(variantDefinition),
                VariantValueArb(variantDefinition)
            )
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

export function VariantValueArb(
    variantDefinition: VariantCandidMeta
): fc.Arbitrary<CandidValues<Variant>> {
    if (variantDefinition.innerTypes.length === 0) {
        return fc.constant({
            valueLiteral: '{}',
            agentArgumentValue: {},
            agentResponseValue: {}
        });
    }
    const randomIndex = Math.floor(
        Math.random() * variantDefinition.innerTypes.length
    );

    const [name, innerType] = variantDefinition.innerTypes[randomIndex];

    const fieldValue = CandidValueArb(innerType).map((values): FieldValue => {
        return [name, values];
    });

    return fieldValue.map((fieldValues) => {
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

function VariantFieldsArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<FieldDefinition[]> {
    return fc.uniqueArray(fc.tuple(JsFunctionNameArb, candidTypeArb), {
        selector: (entry) => entry[0],
        minLength: 1
        // Although no minLength is technically required (according to the
        // spec), the DFX CLI itself currently errors out trying to pass
        // an empty object.
    });
}

function generateImports(fields: FieldDefinition[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field[1].candidMeta.imports
    ]);
    return new Set([...fieldImports, 'Variant']);
}

function generateTypeAliasDeclarations(
    name: string,
    fields: FieldDefinition[],
    useTypeDeclaration: boolean
): string[] {
    const fieldTypeDeclarations = fields.flatMap(
        (field) => field[1].candidMeta.typeAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldTypeDeclarations,
            `const ${name} = ${generateTypeAnnotation(fields)};`
        ];
    }
    return fieldTypeDeclarations;
}

function generateTypeAnnotation(fields: FieldDefinition[]): string {
    return `Variant({${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.candidMeta.typeAnnotation}`
        )
        .join(',')}})`;
}

function generateValue(field: FieldValue, returned: boolean = false): Variant {
    const [fieldName, { agentArgumentValue, agentResponseValue }] = field;

    return {
        [fieldName]: returned ? agentResponseValue : agentArgumentValue
    };
}

function generateValueLiteral(field: FieldValue): string {
    const [fieldName, fieldValue] = field;

    return `{
        ${fieldName}: ${fieldValue.valueLiteral}
    }`;
}
