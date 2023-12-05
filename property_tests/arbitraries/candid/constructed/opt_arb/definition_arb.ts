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
            const typeAnnotation = useTypeDeclaration
                ? name
                : generateTypeAnnotation(innerType);

            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                innerType,
                useTypeDeclaration
            );

            const imports = generateImports(innerType);

            return {
                candidMeta: {
                    typeAnnotation,
                    typeAliasDeclarations,
                    imports,
                    candidType: 'Opt'
                },
                innerType
            };
        });
}

function generateTypeAliasDeclarations(
    name: string,
    innerType: CandidDefinition,
    useTypeDeclaration: boolean
): string[] {
    if (useTypeDeclaration) {
        return [
            ...innerType.candidMeta.typeAliasDeclarations,
            `const ${name} = ${generateTypeAnnotation(innerType)};`
        ];
    }
    return innerType.candidMeta.typeAliasDeclarations;
}

function generateTypeAnnotation(innerType: CandidDefinition): string {
    return `Opt(${innerType.candidMeta.typeAnnotation})`;
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Opt', 'Some', 'None']);
}
