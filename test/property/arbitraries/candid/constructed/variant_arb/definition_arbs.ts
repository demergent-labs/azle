import fc from 'fast-check';

import { CandidType, Variant } from '../../../../../../src/lib/experimental';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { Api, Context } from '../../../types';
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
    context: Context<DefinitionConstraints>,
    candidTypeArbForFields: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[]
): WithShapesArb<VariantCandidDefinition> {
    const api = context.api;
    const constraints = context.constraints;
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            VariantFieldsArb(context, candidTypeArbForFields, parents),
            fc.boolean()
        )
        .map(
            ([
                name,
                fieldsAndShapes,
                useTypeDeclarationChance
            ]): WithShapes<VariantCandidDefinition> => {
                const useTypeDeclaration =
                    (constraints.forceInline === undefined ||
                        constraints.forceInline === false) &&
                    useTypeDeclarationChance;
                const fields = fieldsAndShapes.map(
                    (field): Field => [field[0], field[1].definition]
                );
                const recursiveShapes = fieldsAndShapes.reduce(
                    (acc, field): RecursiveShapes => {
                        return { ...acc, ...field[1].recursiveShapes };
                    },
                    {}
                );
                const typeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    fields,
                    api
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    fields,
                    api
                );

                const runtimeTypeObject = generateRuntimeTypeObject(fields);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        fields,
                        api
                    );

                const imports = generateImports(fields, api);

                return {
                    definition: {
                        candidMeta: {
                            typeAnnotation,
                            typeObject,
                            runtimeTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Variant'
                        },
                        innerTypes: fields
                    },
                    recursiveShapes
                };
            }
        );
}

function VariantFieldsArb(
    context: Context<DefinitionConstraints>,
    candidTypeArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[]
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
                            context,
                            candidTypeArb,
                            index,
                            parents
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
    context: Context<DefinitionConstraints>,
    candidArb: RecursiveCandidDefinitionMemo,
    index: number,
    parents: RecursiveCandidName[]
): WithShapesArb<CandidDefinition> {
    const depthLevel = context.constraints?.depthLevel ?? 0;
    const newContext = {
        ...context,
        constraints: { ...context.constraints, depthLevel: depthLevel - 1 }
    };
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0 || index < 1) {
            // If there are no recursive parents or this is the first variant field just do a regular arb field
            return candidArb(newContext, parents)(depthLevel);
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
                arbitrary: candidArb(newContext, parents)(depthLevel),
                weight: 1
            }
        );
    });
}

function generateImports(fields: Field[], api: Api): Set<string> {
    const fieldImports = fields.flatMap((field): string[] => [
        ...field[1].candidMeta.imports
    ]);
    const variantImports =
        api === 'functional' ? ['RequireExactlyOne', 'Variant'] : ['IDL'];
    return new Set([...fieldImports, ...variantImports]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    api: Api
): string[] {
    const fieldVariableAliasDeclarations = fields.flatMap(
        (field): string[] => field[1].candidMeta.variableAliasDeclarations
    );
    if (useTypeDeclaration) {
        const type =
            api === 'functional'
                ? []
                : [
                      `type ${name} = ${generateCandidTypeAnnotation(
                          false,
                          name,
                          fields,
                          api
                      )}`
                  ];
        return [
            ...fieldVariableAliasDeclarations,
            `const ${name} = ${generateTypeObject(false, name, fields, api)};`,
            ...type
        ];
    }
    return fieldVariableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    api: Api
): string {
    if (useTypeDeclaration === true) {
        if (api === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    if (api === 'class') {
        return fields
            .map(
                ([fieldName, fieldDataType]) =>
                    `{${fieldName}: ${fieldDataType.candidMeta.typeAnnotation}}`
            )
            .join('|');
    }

    return `RequireExactlyOne<{${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.candidMeta.typeAnnotation}`
        )
        .join(',')}}>`;
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    api: Api
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const fieldsAsString = fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.typeObject}`
        )
        .join(',');
    if (api === 'class') {
        return `IDL.Variant({${fieldsAsString}})`;
    }

    return `Variant({${fieldsAsString}})`;
}

function generateRuntimeTypeObject(fields: Field[]): CandidType {
    const azleVariantConstructorObj = fields.reduce(
        (acc, [fieldName, fieldDefinition]): RuntimeVariant => {
            return {
                ...acc,
                [fieldName]: fieldDefinition.candidMeta.runtimeTypeObject
            };
        },
        {}
    );

    return Variant(azleVariantConstructorObj);
}
