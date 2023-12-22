import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    OptCandidDefinition,
    RecursiveCandidDefinitionMemo,
    RecursiveCandidName
} from '../../candid_definition_arb/types';
import { CandidType, Opt } from '../../../../../src/lib';

export function OptDefinitionArb(
    candidTypeArbForInnerType: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    constraints: DefinitionConstraints
): fc.Arbitrary<OptCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            possiblyRecursiveArb(
                candidTypeArbForInnerType,
                parents,
                constraints
            ),
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

            const runtimeCandidTypeObject =
                generateRuntimeCandidTypeObject(innerType);

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
                    runtimeCandidTypeObject,
                    variableAliasDeclarations,
                    imports,
                    candidType: 'Opt'
                },
                innerType
            };
        });
}

function possiblyRecursiveArb(
    candidArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    constraints: DefinitionConstraints
): fc.Arbitrary<CandidDefinition> {
    const n = constraints.n ?? 0;
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0 || n < 1) {
            // If there are no recursive parents or this is the first variant field just do a regular arb field
            return candidArb(parents)(n);
        }
        return fc.oneof(
            { arbitrary: fc.constant(parents[randomIndex]), weight: 1 },
            { arbitrary: candidArb(parents)(n), weight: 1 }
        );
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

function generateRuntimeCandidTypeObject(
    innerType: CandidDefinition
): CandidType {
    return Opt(innerType.candidMeta.runtimeCandidTypeObject);
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Opt', 'Some', 'None']);
}
