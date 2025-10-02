import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { IDL } from '#lib/index';

import { Context } from '../../types';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    RecursiveCandidDefinition,
    RecursiveCandidDefinitionMemo,
    RecursiveCandidName,
    WithShapes,
    WithShapesArb
} from '../candid_definition_arb/types';

export function RecursiveDefinitionArb(
    context: Context<DefinitionConstraints>,
    candidTypeArbForInnerType: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[]
): WithShapesArb<RecursiveCandidDefinition> {
    return UniqueIdentifierArb('globalNames')
        .chain((name): fc.Arbitrary<RecursiveCandidName> => {
            const recCanDef: RecursiveCandidName = {
                candidMeta: {
                    candidType: 'Recursive',
                    typeObject: name,
                    typeAnnotation: name,
                    imports: new Set(),
                    variableAliasDeclarations: [],
                    runtimeTypeObject: IDL.Rec()
                },
                name
            };
            return fc.constant(recCanDef);
        })
        .chain((innerRecDef) => {
            return fc.tuple(
                candidTypeArbForInnerType(
                    {
                        ...context,
                        constraints: {
                            forceInline: true
                        }
                    },
                    [innerRecDef, ...parents]
                )(context.constraints.depthLevel ?? 0),
                fc.constant(innerRecDef)
            );
        })
        .map(
            ([
                {
                    definition: innerType,
                    recursiveShapes: innerTypeRecursiveShapes
                },
                recCanDef
            ]): WithShapes<RecursiveCandidDefinition> => {
                const {
                    name,
                    candidMeta: { typeObject, typeAnnotation }
                } = recCanDef;
                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(name, innerType);

                const imports = generateImports(innerType);

                const runtimeTypeObject = fillRuntimeTypeObject(
                    recCanDef,
                    innerType
                );

                const recursiveShape: RecursiveCandidDefinition = {
                    candidMeta: {
                        typeObject,
                        typeAnnotation,
                        variableAliasDeclarations,
                        imports,
                        candidType: 'Recursive',
                        runtimeTypeObject
                    },
                    name,
                    innerType
                };

                return {
                    definition: recursiveShape,
                    recursiveShapes: {
                        ...innerTypeRecursiveShapes,
                        [name]: recursiveShape
                    }
                };
            }
        );
}

function generateVariableAliasDeclarations(
    name: string,
    innerType: CandidDefinition
): string[] {
    return [
        ...innerType.candidMeta.variableAliasDeclarations,
        `const ${name} = IDL.Rec()`,
        `${name}.fill(${innerType.candidMeta.typeObject})`,
        `type ${name} = ${innerType.candidMeta.typeAnnotation};`
    ];
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'IDL']);
}

function fillRuntimeTypeObject(
    recCanDef: RecursiveCandidName,
    innerType: CandidDefinition
): IDL.Type {
    const runtimeTypeObject = (recCanDef.candidMeta.runtimeTypeObject ??
        IDL.Rec()) as ReturnType<typeof IDL.Rec>;

    // TODO IDL.Empty is a placeholder for void...not quite correct
    runtimeTypeObject.fill(innerType.candidMeta.runtimeTypeObject ?? IDL.Empty);

    recCanDef.candidMeta.runtimeTypeObject = runtimeTypeObject;

    return runtimeTypeObject;
}
