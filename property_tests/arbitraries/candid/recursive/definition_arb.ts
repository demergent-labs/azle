import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    RecursiveCandidDefinitionMemo,
    RecursiveCandidName,
    RecursiveCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../candid_definition_arb/types';
import { CandidType, Recursive } from '../../../../src/lib';
import { RecursiveShapes } from '.';

export function RecursiveDefinitionArb(
    candidTypeArbForInnerType: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    constraints: DefinitionConstraints
): WithShapesArb<RecursiveCandidDefinition> {
    return UniqueIdentifierArb('typeDeclaration')
        .chain((name): fc.Arbitrary<RecursiveCandidName> => {
            const recCanDef: RecursiveCandidName = {
                candidMeta: {
                    candidType: 'Recursive',
                    candidTypeObject: name,
                    candidTypeAnnotation: `typeof ${name}.tsType`,
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
                candidTypeArbForInnerType([innerRecDef, ...parents], {
                    recursiveWeights: true, // This should be true so that the below weights will be respected all the way down. Until those issues are resolved we can't have blobs, tuples or vecs anywhere in any recursive shapes
                    weights: {
                        blob: 0,
                        tuple: 0,
                        vec: 0
                        // TODO there are a lot of bugs with recursion so we are disabling the problematic types until the issues are resolved
                        // https://github.com/demergent-labs/azle/issues/1518
                        // https://github.com/demergent-labs/azle/issues/1513
                        // https://github.com/demergent-labs/azle/issues/1525
                    }
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
                    generateVariableAliasDeclarations(name, innerType);

                const imports = generateImports(innerType);

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
    innerType: CandidDefinition
): string[] {
    return [
        `const ${name} = Recursive(() => ${innerType.candidMeta.candidTypeObject});`,
        ...innerType.candidMeta.variableAliasDeclarations
    ];
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Recursive']);
}

function generateRuntimeCandidTypeObject(
    innerType: CandidDefinition
): CandidType {
    return Recursive(() => innerType.candidMeta.runtimeCandidTypeObject);
}
