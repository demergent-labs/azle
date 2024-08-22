import fc from 'fast-check';

import { CandidType, Recursive } from '../../../../../src/lib/experimental';
import { Api, Context } from '../../types';
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
    const api = context.api;
    return UniqueIdentifierArb('globalNames')
        .chain((name): fc.Arbitrary<RecursiveCandidName> => {
            const recCanDef: RecursiveCandidName = {
                candidMeta: {
                    candidType: 'Recursive',
                    typeObject: name,
                    typeAnnotation:
                        api === 'functional' ? `typeof ${name}.tsType` : name,
                    imports: new Set(),
                    variableAliasDeclarations: [],
                    runtimeTypeObject: Recursive(() => undefined)
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
                            recursiveWeights: true, // This should be true so that the below weights will be respected all the way down. Until those issues are resolved we can't have blobs, tuples or vecs anywhere in any recursive shapes
                            weights: {
                                blob: 0,
                                tuple: 0,
                                vec: 0
                                // TODO there are a lot of bugs with recursion so we are disabling the problematic types until the issues are resolved
                                // https://github.com/demergent-labs/azle/issues/1518
                                // https://github.com/demergent-labs/azle/issues/1513
                                // https://github.com/demergent-labs/azle/issues/1525
                            },
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
                { definition: innerType },
                recCanDef
            ]): WithShapes<RecursiveCandidDefinition> => {
                const {
                    name,
                    candidMeta: { typeObject, typeAnnotation }
                } = recCanDef;
                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(name, innerType, api);

                const imports = generateImports(innerType, api);

                const runtimeTypeObject = generateRuntimeTypeObject(innerType);

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
                        [name]: recursiveShape
                    }
                };
            }
        );
}

function generateVariableAliasDeclarations(
    name: string,
    innerType: CandidDefinition,
    api: Api
): string[] {
    if (api === 'class') {
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = IDL.Rec()`,
            `${name}.fill(${innerType.candidMeta.typeObject})`,
            `type ${name} = ${innerType.candidMeta.typeAnnotation}`
        ];
    }
    return [
        `const ${name} = Recursive(() => ${innerType.candidMeta.typeObject});`,
        ...innerType.candidMeta.variableAliasDeclarations
    ];
}

function generateImports(innerType: CandidDefinition, api: Api): Set<string> {
    const recursiveImports = api === 'functional' ? 'Recursive' : 'IDL';
    return new Set([...innerType.candidMeta.imports, recursiveImports]);
}

function generateRuntimeTypeObject(innerType: CandidDefinition): CandidType {
    return Recursive(() => innerType.candidMeta.runtimeTypeObject);
}
