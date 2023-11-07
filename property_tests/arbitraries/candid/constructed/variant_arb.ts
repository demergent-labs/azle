import fc from 'fast-check';
import { CandidMeta } from '../candid_arb';
import { CandidType, CandidTypeArb } from '../candid_type_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';

export type Variant = {
    [x: string]: CandidType;
};
type Field = [string, CandidMeta<CandidType>];

export const VariantArb = fc
    .tuple(
        UniqueIdentifierArb('typeDeclaration'),
        fc.uniqueArray(fc.tuple(JsFunctionNameArb, CandidTypeArb), {
            selector: (entry) => entry[0],
            minLength: 1
            // Although no minLength is technically required (according to the
            // spec), the DFX CLI itself currently errors out trying to pass
            // an empty object.
        })
    )
    .map(([name, fields]): CandidMeta<Variant> => {
        const randomIndex = Math.floor(Math.random() * fields.length);

        const typeDeclaration = generateTypeDeclaration(name, fields);

        const imports = generateImports(fields);

        const valueLiteral = generateValueLiteral(randomIndex, fields);

        const value = generateValue(randomIndex, fields);

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
    return new Set([...fieldImports, 'Variant']);
}

function generateTypeDeclaration(name: string, fields: Field[]): string {
    return `const ${name} = Variant({\n    ${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.src.candidType}`
        )
        .join(',\n    ')}\n});`;
}

function generateValue(index: number, fields: Field[]): Variant {
    if (fields.length === 0) {
        return {};
    }
    const [randomFieldName, { value: randomFieldDataType }] = fields[index];

    return {
        [randomFieldName]: randomFieldDataType
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
