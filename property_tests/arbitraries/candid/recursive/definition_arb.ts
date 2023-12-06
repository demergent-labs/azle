import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import {
    CandidDefinition,
    CandidDefinitionArb,
    RecursiveCandidDefinition,
    RecursiveGlobalDefinition
} from '../candid_definition_arb/types';
import { recursiveOptions, recursiveShapes } from '.';

export function RecursiveDefinitionArb(
    candidTypeArbForInnerType: CandidDefinitionArb
): fc.Arbitrary<RecursiveGlobalDefinition> {
    return UniqueIdentifierArb('typeDeclaration')
        .chain((name): fc.Arbitrary<RecursiveCandidDefinition> => {
            const recCanDef: RecursiveCandidDefinition = {
                candidMeta: {
                    candidType: 'Recursive',
                    typeAnnotation: name,
                    imports: new Set(),
                    typeAliasDeclarations: []
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
                    candidMeta: { typeAnnotation }
                }
            ]) => {
                const typeAliasDeclarations = generateTypeAliasDeclarations(
                    name,
                    innerType
                );

                const imports = generateImports(innerType);

                const shape: RecursiveGlobalDefinition = {
                    candidMeta: {
                        typeAnnotation,
                        typeAliasDeclarations,
                        imports,
                        candidType: 'Recursive'
                    },
                    name,
                    innerType
                };

                recursiveShapes[name] = shape;

                return shape;
            }
        );
}

function generateTypeAliasDeclarations(
    name: string,
    innerType: CandidDefinition
): string[] {
    return [
        ...innerType.candidMeta.typeAliasDeclarations,
        `const ${name} = Recursive(() => ${innerType.candidMeta.typeAnnotation});`
    ];
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Recursive']);
}
