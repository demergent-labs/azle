import fc from 'fast-check';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    ServiceCandidDefinition,
    ServiceMethodDefinition
} from '../../candid_definition_arb/types';
import { VoidDefinitionArb } from '../../primitive/void';

export function ServiceDefinitionArb(
    fieldCandidDefArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<ServiceCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.uniqueArray(ServiceMethodArb(fieldCandidDefArb), {
                selector: (entry) => entry.name
            }),
            fc.boolean()
        )
        .map(([name, fields, useTypeDeclaration]): ServiceCandidDefinition => {
            useTypeDeclaration = true;
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
                name,
                candidMeta: {
                    typeAnnotation,
                    typeAliasDeclarations,
                    imports,
                    candidType: 'Service'
                },
                funcs: fields
            };
        });
}

function ServiceMethodArb(
    candidDefArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<ServiceMethodDefinition> {
    return fc
        .tuple(
            JsFunctionNameArb,
            fc.constantFrom('query', 'update'),
            fc.array(candidDefArb),
            fc.oneof(candidDefArb, VoidDefinitionArb)
        )
        .map(([name, mode, params, returnType]): ServiceMethodDefinition => {
            const paramCandidTypes = params.map(
                (param) => param.candidMeta.typeAnnotation
            );

            const typeAliasDeclarations = params.reduce(
                (acc, { candidMeta: { typeAliasDeclarations } }): string[] => {
                    return [...acc, ...typeAliasDeclarations];
                },
                returnType.candidMeta.typeAliasDeclarations
            );

            const src = `${name}: ${mode}([${paramCandidTypes}], ${returnType.candidMeta.typeAnnotation})`;

            const imports = params.reduce(
                (acc, param) => {
                    return new Set([...acc, ...param.candidMeta.imports]);
                },
                new Set([mode, ...returnType.candidMeta.imports])
            );

            return {
                name,
                imports,
                typeAliasDeclarations,
                src
            };
        });
}

function generateTypeAliasDeclarations(
    name: string,
    serviceMethods: ServiceMethodDefinition[],
    useTypeDeclaration: boolean
): string[] {
    const serviceMethodTypeAliasDecls = serviceMethods.flatMap(
        (serviceMethod) => serviceMethod.typeAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...serviceMethodTypeAliasDecls,
            `const ${name} = ${generateTypeAnnotation(serviceMethods)};`
        ];
    }
    return serviceMethodTypeAliasDecls;
}

function generateTypeAnnotation(serviceMethods: ServiceMethodDefinition[]) {
    const methods = serviceMethods
        .map((serviceMethod) => serviceMethod.src)
        .filter((typeDeclaration) => typeDeclaration)
        .join(',\n');

    return `Canister({${methods}})`;
}

function generateImports(
    serviceMethods: ServiceMethodDefinition[]
): Set<string> {
    return new Set([
        ...serviceMethods.flatMap((serviceMethod) =>
            Array.from(serviceMethod.imports)
        ),
        'Canister',
        'query'
    ]);
}
