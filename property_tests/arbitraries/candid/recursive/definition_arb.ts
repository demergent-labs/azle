import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import {
    CandidDefinition,
    CandidDefinitionArb,
    RecursiveCandidDefinition,
    RecursiveGlobalDefinition
} from '../candid_definition_arb/types';
import { recursiveOptions, recursiveShapes } from '.';
import { CandidType, Recursive } from '../../../../src/lib';

export function RecursiveDefinitionArb(
    candidTypeArbForInnerType: CandidDefinitionArb
): fc.Arbitrary<RecursiveGlobalDefinition> {
    return UniqueIdentifierArb('typeDeclaration')
        .chain((name): fc.Arbitrary<RecursiveCandidDefinition> => {
            const recCanDef: RecursiveCandidDefinition = {
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
            recursiveOptions.push(recCanDef);
            return fc.constant(recCanDef);
        })
        .chain((innerRecDef) => {
            return fc.tuple(
                candidTypeArbForInnerType,
                fc.constant(innerRecDef)
            );
        })
        .map(
            ([
                innerType,
                {
                    name,
                    candidMeta: { candidTypeObject, candidTypeAnnotation }
                }
            ]) => {
                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(name, innerType);

                const imports = generateImports(innerType);

                const runtimeCandidTypeObject =
                    generateRuntimeCandidTypeObject(innerType);

                const shape: RecursiveGlobalDefinition = {
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

                recursiveShapes[name] = shape;

                return shape;
            }
        );
}

function generateVariableAliasDeclarations(
    name: string,
    innerType: CandidDefinition
): string[] {
    return [
        ...innerType.candidMeta.variableAliasDeclarations,
        `const ${name} = Recursive(() => ${innerType.candidMeta.candidTypeObject});`
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
