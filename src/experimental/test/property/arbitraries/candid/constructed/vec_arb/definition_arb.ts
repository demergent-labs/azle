import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { IDL } from '#lib/index';

import { Context } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    RecursiveCandidDefinitionMemo,
    RecursiveCandidName,
    VecCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';

export function VecDefinitionArb(
    context: Context<DefinitionConstraints>,
    candidTypeArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[]
): WithShapesArb<VecCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            possiblyRecursiveArb(context, candidTypeArb, parents),
            fc.boolean()
        )
        .map(
            ([
                name,
                innerTypeAndShapes,
                useTypeDeclarationChance
            ]): WithShapes<VecCandidDefinition> => {
                const useTypeDeclaration =
                    (context.constraints.forceInline === undefined ||
                        context.constraints.forceInline === false) &&
                    useTypeDeclarationChance;
                const { definition: innerType, recursiveShapes } =
                    innerTypeAndShapes;
                const typeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    innerType
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    innerType
                );

                const runtimeTypeObject = generateRuntimeTypeObject(innerType);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        innerType
                    );

                const imports = generateImports(innerType);

                return {
                    definition: {
                        candidMeta: {
                            typeAnnotation,
                            typeObject,
                            runtimeTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Vec'
                        },
                        innerType: innerType
                    },
                    recursiveShapes
                };
            }
        );
}

function possiblyRecursiveArb(
    context: Context<DefinitionConstraints>,
    candidArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[]
): WithShapesArb<CandidDefinition> {
    const depthLevel = context.constraints.depthLevel ?? 0;
    const newContext = {
        ...context,
        constraints: { ...context.constraints, depthLevel: depthLevel - 1 }
    };
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0) {
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

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'IDL']);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string[] {
    if (useTypeDeclaration === true) {
        const type = [
            `type ${name} = ${generateCandidTypeAnnotation(
                false,
                name,
                innerType
            )};`
        ];
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = ${generateTypeObject(false, name, innerType)};`,
            ...type
        ];
    }
    return innerType.candidMeta.variableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return toClassTypeAnnotation(innerType);
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return `IDL.Vec(${innerType.candidMeta.typeObject})`;
}

function generateRuntimeTypeObject(innerType: CandidDefinition): IDL.Type {
    // TODO IDL.Empty is a placeholder for void...not quite correct
    return IDL.Vec(innerType.candidMeta.runtimeTypeObject ?? IDL.Empty);
}

function toClassTypeAnnotation(innerType: CandidDefinition): string {
    if (innerType.candidMeta.candidType === 'int64') {
        return `BigInt64Array`;
    }

    if (innerType.candidMeta.candidType === 'int32') {
        return `Int32Array`;
    }

    if (innerType.candidMeta.candidType === 'int16') {
        return `Int16Array`;
    }

    if (innerType.candidMeta.candidType === 'int8') {
        return `Int8Array`;
    }

    if (innerType.candidMeta.candidType === 'nat64') {
        return `BigUint64Array`;
    }

    if (innerType.candidMeta.candidType === 'nat32') {
        return `Uint32Array`;
    }

    if (innerType.candidMeta.candidType === 'nat16') {
        return `Uint16Array`;
    }

    if (innerType.candidMeta.candidType === 'nat8') {
        return `Uint8Array`;
    }

    return `(${innerType.candidMeta.typeAnnotation})[]`;
}
