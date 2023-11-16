import fc from 'fast-check';
import { CandidMeta } from '../candid_arb';
import { CandidType, CandidTypeArb } from '../candid_type_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';
import { BoolArb } from '../primitive/bool';
import { Float32Arb } from '../primitive/floats/float32_arb';
import { Float64Arb } from '../primitive/floats/float64_arb';
import { Int16Arb } from '../primitive/ints/int16_arb';
import { Int32Arb } from '../primitive/ints/int32_arb';
import { Int64Arb } from '../primitive/ints/int64_arb';
import { Int8Arb } from '../primitive/ints/int8_arb';
import { IntArb } from '../primitive/ints/int_arb';
import { Nat16Arb } from '../primitive/nats/nat16_arb';
import { Nat32Arb } from '../primitive/nats/nat32_arb';
import { Nat64Arb } from '../primitive/nats/nat64_arb';
import { Nat8Arb } from '../primitive/nats/nat8_arb';
import { NatArb } from '../primitive/nats/nat_arb';
import { NullArb } from '../primitive/null';
import { TextArb } from '../primitive/text';
import { PrincipalArb } from '../reference/principal_arb';
import { BlobArb } from './blob_arb';

export type Variant = {
    [x: string]: CandidType;
};
type Field = [string, CandidMeta<CandidType>];

type RecursiveArb<T> = { base: T } | { nextLayer: RecursiveArb<T> };

type RecursiveVariantArb<T> = {
    nonVariantFields: CandidMeta<CandidType>;
    variantFields: CandidMeta<Variant>;
};

type VariantField = [string, CandidMeta<CandidType>];

function VariantFieldsArb(
    candidTypeArb: fc.Arbitrary<CandidMeta<CandidType>>
): fc.Arbitrary<VariantField[]> {
    return fc.uniqueArray(fc.tuple(JsFunctionNameArb, candidTypeArb), {
        selector: (entry) => entry[0],
        minLength: 1
        // Although no minLength is technically required (according to the
        // spec), the DFX CLI itself currently errors out trying to pass
        // an empty object.
    });
}

const ComplexCandidTypeArb: fc.Arbitrary<CandidMeta<CandidType>> = fc.letrec(
    (tie) => ({
        Thing: fc.oneof(
            Float32Arb,
            Float64Arb,
            IntArb,
            Int8Arb,
            Int16Arb,
            Int32Arb,
            Int64Arb,
            NatArb,
            Nat8Arb,
            Nat16Arb,
            Nat32Arb,
            Nat64Arb,
            BoolArb,
            NullArb,
            TextArb,
            PrincipalArb,
            BlobArb,
            tie('VariantThing').map((sample) => sample as CandidMeta<Variant>)
            // tie('RecordThing').map((sample) => sample as CandidMeta<Record>)
        ),
        VariantThing: fc
            .tuple(
                UniqueIdentifierArb('typeDeclaration'),
                VariantFieldsArb(
                    tie('Thing') as fc.Arbitrary<CandidMeta<CandidType>>
                )
                // fc
                //     .uniqueArray(fc.tuple(JsFunctionNameArb, tie('Thing')), {
                //         selector: (entry) => entry[0],
                //         minLength: 1
                //         // Although no minLength is technically required (according to the
                //         // spec), the DFX CLI itself currently errors out trying to pass
                //         // an empty object.
                //     })
                //     .map(
                //         (sample) => sample as [string, CandidMeta<CandidType>][]
                //     )
            )
            .map(([name, fields]): CandidMeta<Variant> => {
                const randomIndex = Math.floor(Math.random() * fields.length);

                const candidType = generateCandidType(fields);

                const typeDeclaration = generateTypeDeclaration(name, fields);

                const imports = generateImports(fields);

                const valueLiteral = generateValueLiteral(randomIndex, fields);

                const value = generateValue(randomIndex, fields);

                return {
                    src: {
                        candidType,
                        typeDeclaration,
                        imports,
                        valueLiteral
                    },
                    value
                };
            })
    })
).Thing;

export function BaseVariantArb(
    candidTypeArb: fc.Arbitrary<CandidMeta<CandidType>>
) {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            VariantFieldsArb(candidTypeArb)
        )
        .map(([name, fields]): CandidMeta<Variant> => {
            const randomIndex = Math.floor(Math.random() * fields.length);

            const candidType = generateCandidType(fields);

            const typeDeclaration = generateTypeDeclaration(name, fields);

            const imports = generateImports(fields);

            const valueLiteral = generateValueLiteral(randomIndex, fields);

            const value = generateValue(randomIndex, fields);

            return {
                src: {
                    candidType,
                    typeDeclaration,
                    imports,
                    valueLiteral
                },
                value
            };
        });
}

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

// export const VariantArb = RecursiveArb(
//     BaseVariantArb,
//     doGenerateCandidType,
//     doGenerateImports,
//     doGenerateValueLiteral,
//     doGenerateValue,
//     doGenerateTypeDeclaration
// );

export const VariantArb = BaseVariantArb(ComplexCandidTypeArb);

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
    return `const ${name} = ${generateCandidType(fields)};`;
}

function generateCandidType(fields: Field[]): string {
    return `Variant({${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.src.candidType}`
        )
        .join(',')}})`;
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
