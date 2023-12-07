import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    TupleCandidDefinition
} from '../../candid_definition_arb/types';

export function TupleDefinitionArb(
    candidTypeArbForFields: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<TupleCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.array(candidTypeArbForFields, { minLength: 1 }),
            // Although no minLength is technically required (according to the
            // spec), there are some issues with vecs of empty objects that are causing some problems
            // https://github.com/demergent-labs/azle/issues/1453
            fc.boolean()
        )
        .map(([name, fields, useTypeDeclaration]): TupleCandidDefinition => {
            const candidTypeAnnotation = generateCandidTypeAnnotation(
                useTypeDeclaration,
                name,
                fields
            );

            const candidTypeObject = generateCandidTypeObject(
                useTypeDeclaration,
                name,
                fields
            );

            const variableAliasDeclarations = generateVariableAliasDeclarations(
                useTypeDeclaration,
                name,
                fields
            );

            const imports = generateImports(fields);

            return {
                candidMeta: {
                    candidTypeAnnotation,
                    candidTypeObject,
                    variableAliasDeclarations,
                    imports,
                    candidType: 'Tuple'
                },
                innerTypes: fields
            };
        });
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[]
): string[] {
    const fieldVariableAliasDeclarations = fields.flatMap(
        (field) => field.candidMeta.variableAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldVariableAliasDeclarations,
            `const ${name} = ${generateCandidTypeObject(false, name, fields)};`
        ];
    }
    return fieldVariableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[]
) {
    if (useTypeDeclaration === true) {
        return `typeof ${name}.tsType`;
    }

    const innerTypes = fields.map(
        (field) => field.candidMeta.candidTypeAnnotation
    );

    return `Tuple<[${innerTypes.join(', ')}]>`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[]
) {
    if (useTypeDeclaration === true) {
        return name;
    }

    const innerTypes = fields.map((field) => field.candidMeta.candidTypeObject);

    return `Tuple(${innerTypes.join(', ')})`;
}

function generateImports(fields: CandidDefinition[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field.candidMeta.imports
    ]);
    return new Set([...fieldImports, 'Tuple']);
}
