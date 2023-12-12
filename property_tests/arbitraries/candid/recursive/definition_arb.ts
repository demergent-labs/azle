import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import {
    CandidDefinition,
    RecCandidDefMemo,
    RecursiveCandidDefinition,
    RecursiveGlobalDefinition
} from '../candid_definition_arb/types';
import { CandidType, Recursive } from '../../../../src/lib';
import { recursive } from '.';

export function RecursiveDefinitionArb(
    candidTypeArbForInnerType: RecCandidDefMemo,
    parents: RecursiveCandidDefinition[],
    n: number
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
            return fc.constant(recCanDef);
        })
        .chain((innerRecDef) => {
            return fc.tuple(
                candidTypeArbForInnerType([innerRecDef, ...parents], {
                    blob: 0,
                    tuple: 0,
                    vec: 0
                    // TODO there are a lot of bugs with recursion so we are disabling the problematic types until the issues are resolved
                    // https://github.com/demergent-labs/azle/issues/1518
                    // https://github.com/demergent-labs/azle/issues/1513
                    // https://github.com/demergent-labs/azle/issues/1525
                })(n),
                fc.constant(innerRecDef)
            );
        })
        .map(([innerType, recCanDef]) => {
            const {
                name,
                candidMeta: { candidTypeObject, candidTypeAnnotation }
            } = recCanDef;
            const variableAliasDeclarations = generateVariableAliasDeclarations(
                name,
                innerType
            );

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

            recursive.shapes[name] = shape;

            return shape;
        });
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
