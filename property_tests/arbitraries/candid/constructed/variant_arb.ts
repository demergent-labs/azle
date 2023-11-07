import fc from 'fast-check';
import { CandidMeta } from '../candid_arb';
import { CandidType, CandidTypeArb } from '../candid_type_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';

export type Variant = {
    [x: string]: CandidType;
};
type Field = [string, CandidMeta<CandidType>];

type RecursiveArb<T> = { base: T } | { nextLayer: RecursiveArb<T> };

export const BaseVariantArb = fc
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

export const RecursiveArb = <T extends CandidType>(
    BaseArb: fc.Arbitrary<CandidMeta<T>>,
    generateCandidType: (recursiveThing: any) => string,
    generateImports: (recursiveThing: any) => Set<string>,
    generateValueLiteral: (recursiveThing: any) => string,
    generateValue: (recursiveThing: any) => T
) =>
    fc
        .letrec((tie) => ({
            RecursiveArb: fc.oneof(
                fc.record({ base: BaseArb }),
                fc.record({
                    nextLayer: tie('RecursiveArb').map(
                        (sample) => sample as RecursiveArb<T>
                    )
                })
            )
        }))
        .RecursiveArb.map((recursiveArb): CandidMeta<T> => {
            return {
                src: {
                    candidType: generateCandidType(recursiveArb),
                    imports: generateImports(recursiveArb),
                    valueLiteral: generateValueLiteral(recursiveArb)
                },
                value: generateValue(recursiveArb)
            };
        });

export const VariantArb = RecursiveArb(BaseVariantArb);

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
