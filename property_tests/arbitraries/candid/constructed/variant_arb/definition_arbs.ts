import fc from 'fast-check';

import { CandidType, Variant } from '../../../../../src/lib/experimental';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { Syntax } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    RecursiveCandidDefinitionMemo,
    RecursiveCandidName,
    VariantCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { RecursiveShapes } from '../../recursive';

type Field = [string, CandidDefinition];
type FieldAndShapes = [string, WithShapes<CandidDefinition>];

type RuntimeVariant = {
    [key: string]: CandidType;
};

export function VariantDefinitionArb(
    candidTypeArbForFields: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    syntax: Syntax,
    constraints: DefinitionConstraints
): WithShapesArb<VariantCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            VariantFieldsArb(
                candidTypeArbForFields,
                parents,
                syntax,
                constraints
            ),
            fc.boolean()
        )
        .map(
            ([
                name,
                fieldsAndShapes,
                useTypeDeclaration
            ]): WithShapes<VariantCandidDefinition> => {
                const fields = fieldsAndShapes.map(
                    (field): Field => [field[0], field[1].definition]
                );
                const recursiveShapes = fieldsAndShapes.reduce(
                    (acc, field): RecursiveShapes => {
                        return { ...acc, ...field[1].recursiveShapes };
                    },
                    {}
                );
                const candidTypeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    fields,
                    syntax
                );

                const candidTypeObject = generateCandidTypeObject(
                    useTypeDeclaration,
                    name,
                    fields,
                    syntax
                );

                const runtimeCandidTypeObject =
                    generateRuntimeCandidTypeObject(fields);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        fields,
                        syntax
                    );

                const imports = generateImports(fields, syntax);

                return {
                    definition: {
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            runtimeCandidTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Variant',
                            idl: generateIdl(fields)
                        },
                        innerTypes: fields
                    },
                    recursiveShapes
                };
            }
        );
}

function VariantFieldsArb(
    candidTypeArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    syntax: Syntax,
    constraints: DefinitionConstraints
): fc.Arbitrary<FieldAndShapes[]> {
    // Although no minLength is technically required (according to the
    // spec), the DFX CLI itself currently errors out trying to pass
    // an empty object.
    const VARIANT_MIN_FIELD_COUNT = 1;
    return fc
        .uniqueArray(JsFunctionNameArb, {
            minLength: VARIANT_MIN_FIELD_COUNT
        })
        .chain((fieldsNames) =>
            fc.tuple(
                ...fieldsNames.map((name, index) =>
                    fc.tuple(
                        fc.constant(name),
                        possiblyRecursiveArb(
                            candidTypeArb,
                            index,
                            parents,
                            syntax,
                            constraints
                        )
                    )
                )
            )
        );
}

// Recursion requires at least one of the fields to be a "base case", or in
// other words it needs to terminate or else we will get an infinitely deep
// shape. For simplicity we have made the first index always be a base case so
// we are guaranteed to have at least one. Consequently this function takes the
// index of the field for which it's generating an arbitrary. If it's 0 then we
// will not allow a recursive option to be picked for that field. A more
// complicated approach would involve the guaranteed base case being in any one
// of the fields, instead of always the first one.
function possiblyRecursiveArb(
    candidArb: RecursiveCandidDefinitionMemo,
    index: number,
    parents: RecursiveCandidName[],
    syntax: Syntax,
    constraints: DefinitionConstraints
): WithShapesArb<CandidDefinition> {
    const depthLevel = constraints?.depthLevel ?? 0;
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0 || index < 1) {
            // If there are no recursive parents or this is the first variant field just do a regular arb field
            return candidArb(parents, syntax)(depthLevel);
        }
        return fc.oneof(
            {
                arbitrary: fc.constant({
                    definition: parents[randomIndex],
                    recursiveShapes: {}
                }),
                weight: 1
            },
            {
                arbitrary: candidArb(parents, syntax)(depthLevel),
                weight: 1
            }
        );
    });
}

function generateImports(fields: Field[], syntax: Syntax): Set<string> {
    const fieldImports = fields.flatMap((field): string[] => [
        ...field[1].candidMeta.imports
    ]);
    const variantImports =
        syntax === 'functional' ? ['RequireExactlyOne', 'Variant'] : ['IDL'];
    return new Set([...fieldImports, ...variantImports]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    syntax: Syntax
): string[] {
    const fieldVariableAliasDeclarations = fields.flatMap(
        (field): string[] => field[1].candidMeta.variableAliasDeclarations
    );
    const type =
        syntax === 'functional'
            ? []
            : [
                  `type ${name} = ${generateCandidTypeAnnotation(
                      false,
                      name,
                      fields,
                      syntax
                  )}`
              ];
    if (useTypeDeclaration) {
        return [
            ...fieldVariableAliasDeclarations,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                fields,
                syntax
            )};`,
            ...type
        ];
    }
    return fieldVariableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        if (syntax === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    if (syntax === 'class') {
        return fields
            .map(
                ([fieldName, fieldDataType]) =>
                    `{${fieldName}: ${fieldDataType.candidMeta.candidTypeAnnotation}}`
            )
            .join('|');
    }

    return `RequireExactlyOne<{${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.candidMeta.candidTypeAnnotation}`
        )
        .join(',')}}>`;
}

function generateIdl(fields: Field[]): string {
    return `IDL.Variant({${fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.idl}`
        )
        .join(',')}})`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    if (syntax === 'class') {
        return generateIdl(fields);
    }

    return `Variant({${fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.candidTypeObject}`
        )
        .join(',')}})`;
}

function generateRuntimeCandidTypeObject(fields: Field[]): CandidType {
    const azleVariantConstructorObj = fields.reduce(
        (acc, [fieldName, fieldDefinition]): RuntimeVariant => {
            return {
                ...acc,
                [fieldName]: fieldDefinition.candidMeta.runtimeCandidTypeObject
            };
        },
        {}
    );

    return Variant(azleVariantConstructorObj);
}
