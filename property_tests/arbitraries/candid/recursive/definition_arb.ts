import fc from 'fast-check';

import { CandidType, Recursive } from '../../../../src/lib/experimental';
import { Syntax } from '../../types';
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
    candidTypeArbForInnerType: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    syntax: Syntax,
    constraints: DefinitionConstraints
): WithShapesArb<RecursiveCandidDefinition> {
    return UniqueIdentifierArb('globalNames')
        .chain((name): fc.Arbitrary<RecursiveCandidName> => {
            const recCanDef: RecursiveCandidName = {
                candidMeta: {
                    candidType: 'Recursive',
                    candidTypeObject: name,
                    candidTypeAnnotation:
                        syntax === 'functional'
                            ? `typeof ${name}.tsType`
                            : name,
                    imports: new Set(),
                    variableAliasDeclarations: [],
                    runtimeCandidTypeObject: Recursive(() => undefined)
                },
                name
            };
            return fc.constant(recCanDef);
        })
        .chain((innerRecDef) => {
            return fc.tuple(
                candidTypeArbForInnerType([innerRecDef, ...parents], syntax, {
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
                })(constraints.depthLevel ?? 0),
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
                    candidMeta: { candidTypeObject, candidTypeAnnotation }
                } = recCanDef;
                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(name, innerType, syntax);

                const imports = generateImports(innerType, syntax);

                const runtimeCandidTypeObject =
                    generateRuntimeCandidTypeObject(innerType);

                const recursiveShape: RecursiveCandidDefinition = {
                    candidMeta: {
                        candidTypeObject,
                        candidTypeAnnotation,
                        variableAliasDeclarations,
                        imports,
                        candidType: 'Recursive',
                        runtimeCandidTypeObject
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
    syntax: Syntax
): string[] {
    if (syntax === 'class') {
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = IDL.Rec()`,
            `${name}.fill(${innerType.candidMeta.candidTypeObject})`,
            `type ${name} = ${innerType.candidMeta.candidTypeAnnotation}`
        ];
    }
    return [
        `const ${name} = Recursive(() => ${innerType.candidMeta.candidTypeObject});`,
        ...innerType.candidMeta.variableAliasDeclarations
    ];
}

function generateImports(
    innerType: CandidDefinition,
    syntax: Syntax
): Set<string> {
    const recursiveImports = syntax === 'functional' ? 'Recursive' : 'IDL';
    return new Set([...innerType.candidMeta.imports, recursiveImports]);
}

function generateRuntimeCandidTypeObject(
    innerType: CandidDefinition
): CandidType {
    return Recursive(() => innerType.candidMeta.runtimeCandidTypeObject);
}
