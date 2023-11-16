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

export const RecursiveArb = <CType extends CandidType, Base>(
    BaseArb: fc.Arbitrary<Base>,
    generateCandidType: (recursiveThing: RecursiveArb<Base>) => string,
    generateImports: (recursiveThing: RecursiveArb<Base>) => Set<string>,
    generateValueLiteral: (recursiveThing: RecursiveArb<Base>) => string,
    generateValue: (recursiveThing: RecursiveArb<Base>) => CType,
    generateTypeDeclaration: (
        recursiveThing: RecursiveArb<Base>
    ) => string | undefined = (r) => undefined
) =>
    fc
        .letrec((tie) => ({
            RecursiveArb: fc.oneof(
                fc.record({ base: BaseArb }),
                fc.record({
                    nextLayer: tie('RecursiveArb').map(
                        (sample) => sample as RecursiveArb<Base>
                    )
                })
            )
        }))
        .RecursiveArb.map((recursiveArb): CandidMeta<CType> => {
            return {
                src: {
                    candidType: generateCandidType(recursiveArb),
                    imports: generateImports(recursiveArb),
                    valueLiteral: generateValueLiteral(recursiveArb),
                    typeDeclaration: generateTypeDeclaration(recursiveArb)
                },
                value: generateValue(recursiveArb)
            };
        });

export const VariantArb = RecursiveArb(
    BaseVariantArb,
    doGenerateCandidType,
    doGenerateImports,
    doGenerateValueLiteral,
    doGenerateValue,
    doGenerateTypeDeclaration
);

function doGenerateCandidType(
    recursiveVariant: RecursiveArb<CandidMeta<Variant>>
): string {
    if ('base' in recursiveVariant) {
        return recursiveVariant.base.src.candidType;
    } else {
        return `Variant({Name: ${doGenerateCandidType(
            recursiveVariant.nextLayer
        )}})`;
    }
}

function doGenerateValueLiteral(
    recursiveVariant: RecursiveArb<CandidMeta<Variant>>
): string {
    if ('base' in recursiveVariant) {
        return recursiveVariant.base.src.valueLiteral;
    } else {
        return `{Name: ${doGenerateValueLiteral(recursiveVariant.nextLayer)}}`;
    }
}

function doGenerateTypeDeclaration(
    recursiveVariant: RecursiveArb<CandidMeta<Variant>>
): string | undefined {
    if ('base' in recursiveVariant) {
        return recursiveVariant.base.src.typeDeclaration;
    } else {
        return doGenerateTypeDeclaration(recursiveVariant.nextLayer);
    }
}

function doGenerateImports(
    recursiveVariant: RecursiveArb<CandidMeta<Variant>>
): Set<string> {
    if ('base' in recursiveVariant) {
        return new Set([...recursiveVariant.base.src.imports]);
    } else {
        return doGenerateImports(recursiveVariant.nextLayer);
    }
}

function doGenerateValue(
    recursiveVariant: RecursiveArb<CandidMeta<Variant>>
): Variant {
    if ('base' in recursiveVariant) {
        return recursiveVariant.base.value;
    } else {
        return { Name: doGenerateValue(recursiveVariant.nextLayer) };
    }
}

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
