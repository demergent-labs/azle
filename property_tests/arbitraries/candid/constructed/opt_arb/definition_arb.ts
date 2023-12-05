import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    OptCandidDefinition
} from '../../candid_definition_arb/types';

export function OptDefinitionArb(
    candidTypeArbForInnerType: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<OptCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            candidTypeArbForInnerType,
            fc.boolean()
        )
        .map(([name, innerType, useTypeDeclaration]): OptCandidDefinition => {
            const candidTypeAnnotation = generateCandidTypeAnnotation(
                useTypeDeclaration,
                name,
                innerType
            );

            const candidTypeObject = generateCandidTypeObject(
                useTypeDeclaration,
                name,
                innerType
            );

            const variableAliasDeclarations = generateVariableAliasDeclarations(
                useTypeDeclaration,
                name,
                innerType
            );

            const imports = generateImports(innerType);

            return {
                candidMeta: {
                    candidTypeAnnotation,
                    candidTypeObject,
                    variableAliasDeclarations,
                    imports,
                    candidType: 'Opt'
                },
                innerType
            };
        });
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string[] {
    if (useTypeDeclaration) {
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                innerType
            )};`
        ];
    }
    return innerType.candidMeta.variableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration) {
        return `typeof ${name}.tsType`;
    }

    return `Opt<${innerType.candidMeta.candidTypeAnnotation}>`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return `Opt(${innerType.candidMeta.candidTypeObject})`;
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Opt', 'Some', 'None']);
}
