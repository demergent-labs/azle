import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta';
import { CorrespondingJSType } from '../../candid_type_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { Variant } from '.';

type Field = [string, CandidValueAndMeta<CorrespondingJSType>];

function VariantFieldsArb(
    candidTypeArb: fc.Arbitrary<CandidValueAndMeta<CorrespondingJSType>>
): fc.Arbitrary<Field[]> {
    return fc.uniqueArray(fc.tuple(JsFunctionNameArb, candidTypeArb), {
        selector: (entry) => entry[0],
        minLength: 1
        // Although no minLength is technically required (according to the
        // spec), the DFX CLI itself currently errors out trying to pass
        // an empty object.
    });
}

export function BaseVariantArb(
    candidTypeArb: fc.Arbitrary<CandidValueAndMeta<CorrespondingJSType>>
): fc.Arbitrary<CandidValueAndMeta<Variant>> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            VariantFieldsArb(candidTypeArb),
            fc.boolean()
        )
        .map(
            ([
                name,
                fields,
                useTypeDeclaration
            ]): CandidValueAndMeta<Variant> => {
                const randomIndex = Math.floor(Math.random() * fields.length);

                const typeAnnotation = useTypeDeclaration
                    ? name
                    : generateTypeAnnotation(fields);

                const typeAliasDeclarations = generateTypeAliasDeclarations(
                    name,
                    fields,
                    useTypeDeclaration
                );

                const imports = generateImports(fields);

                const valueLiteral = generateValueLiteral(randomIndex, fields);

                const agentArgumentValue = generateValue(randomIndex, fields);

                const agentResponseValue = generateValue(
                    randomIndex,
                    fields,
                    true
                );

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

function generateImports(fields: Field[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [...field[1].src.imports]);
    return new Set([...fieldImports, 'Variant']);
}

function generateTypeAliasDeclarations(
    name: string,
    fields: Field[],
    useTypeDeclaration: boolean
): string[] {
    const fieldTypeDeclarations = fields.flatMap(
        (field) => field[1].src.typeAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldTypeDeclarations,
            `const ${name} = ${generateTypeAnnotation(fields)};`
        ];
    }
    return fieldTypeDeclarations;
}

function generateTypeAnnotation(fields: Field[]): string {
    return `Variant({${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.src.typeAnnotation}`
        )
        .join(',')}})`;
}

function generateValue(
    index: number,
    fields: Field[],
    returned: boolean = false
): Variant {
    if (fields.length === 0) {
        return {};
    }
    const [
        randomFieldName,
        {
            agentArgumentValue: randomFieldValue,
            agentResponseValue: randomFieldExpectedValue
        }
    ] = fields[index];

    return {
        [randomFieldName]: returned
            ? randomFieldExpectedValue
            : randomFieldValue
    };
}

function generateValueLiteral(index: number, fields: Field[]): string {
    if (fields.length === 0) {
        return '{}';
    }

    const [fieldName, fieldValue] = fields[index];

    return `{
        ${fieldName}: ${fieldValue.src.valueLiteral}
    }`;
}
