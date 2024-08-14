import fc from 'fast-check';

import { CandidType, Opt } from '../../../../../src/lib/experimental';
import { Syntax } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    OptCandidDefinition,
    RecursiveCandidDefinitionMemo,
    RecursiveCandidName,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';

export function OptDefinitionArb(
    candidTypeArbForInnerType: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    syntax: Syntax,
    constraints: DefinitionConstraints
): WithShapesArb<OptCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            possiblyRecursiveArb(
                candidTypeArbForInnerType,
                parents,
                syntax,
                constraints
            ),
            fc.boolean()
        )
        .map(
            ([
                name,
                innerTypeAndShapes,
                useTypeDeclaration
            ]): WithShapes<OptCandidDefinition> => {
                const { definition: innerType, recursiveShapes } =
                    innerTypeAndShapes;
                const candidTypeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    innerType,
                    syntax
                );

                const candidTypeObject = generateCandidTypeObject(
                    useTypeDeclaration,
                    name,
                    innerType,
                    syntax
                );

                const runtimeCandidTypeObject =
                    generateRuntimeCandidTypeObject(innerType);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        innerType,
                        syntax
                    );

                const imports = generateImports(innerType, syntax);

                return {
                    definition: {
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            runtimeCandidTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Opt',
                            idl: generateIdl(innerType)
                        },
                        innerType
                    },
                    recursiveShapes
                };
            }
        );
}

function possiblyRecursiveArb(
    candidArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    syntax: Syntax,
    constraints: DefinitionConstraints
): WithShapesArb<CandidDefinition> {
    const depthLevel = constraints.depthLevel ?? 0;
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0 || depthLevel < 1) {
            // If there are no recursive parents or we have reached a depth
            // level of 0 just do a regular arb inner type
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

function generateImports(
    innerType: CandidDefinition,
    syntax: Syntax
): Set<string> {
    const optImports =
        syntax === 'functional' ? ['Opt', 'Some', 'None'] : ['IDL'];
    return new Set([...innerType.candidMeta.imports, ...optImports]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition,
    syntax: Syntax
): string[] {
    if (useTypeDeclaration) {
        const type =
            syntax === 'functional'
                ? []
                : [
                      `type ${name} = ${generateCandidTypeAnnotation(
                          false,
                          name,
                          innerType,
                          syntax
                      )}`
                  ];
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                innerType,
                syntax
            )};`,
            ...type
        ];
    }
    return innerType.candidMeta.variableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition,
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        if (syntax === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    if (syntax === 'class') {
        return `[${innerType.candidMeta.candidTypeAnnotation}] | []`;
    }

    return `Opt<${innerType.candidMeta.candidTypeAnnotation}>`;
}

function generateIdl(innerType: CandidDefinition): string {
    return `IDL.Opt(${innerType.candidMeta.idl})`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition,
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    if (syntax === 'class') {
        return `IDL.Opt(${innerType.candidMeta.candidTypeObject})`;
    }

    return `Opt(${innerType.candidMeta.candidTypeObject})`;
}

function generateRuntimeCandidTypeObject(
    innerType: CandidDefinition
): CandidType {
    return Opt(innerType.candidMeta.runtimeCandidTypeObject);
}
