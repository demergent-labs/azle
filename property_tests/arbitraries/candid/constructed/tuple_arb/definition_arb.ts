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
            const typeAnnotation = useTypeDeclaration
                ? name
                : generateTypeAnnotation(fields);

            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                fields,
                useTypeDeclaration
            );

            const imports = generateImports(fields);

            return {
                candidMeta: {
                    typeAnnotation,
                    typeAliasDeclarations,
                    imports,
                    candidType: 'Tuple'
                },
                innerTypes: fields
            };
        });
}

function generateTypeAliasDeclarations(
    name: string,
    fields: CandidDefinition[],
    useTypeDeclaration: boolean
): string[] {
    const fieldTypeAliasDeclarations = fields.flatMap(
        (field) => field.candidMeta.typeAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldTypeAliasDeclarations,
            `const ${name} = ${generateTypeAnnotation(fields)};`
        ];
    }
    return fieldTypeAliasDeclarations;
}

function generateTypeAnnotation(fields: CandidDefinition[]) {
    const innerTypes = fields.map((field) => field.candidMeta.typeAnnotation);

    return `Tuple(${innerTypes.join(', ')})`;
}

function generateImports(fields: CandidDefinition[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field.candidMeta.imports
    ]);
    return new Set([...fieldImports, 'Tuple']);
}
