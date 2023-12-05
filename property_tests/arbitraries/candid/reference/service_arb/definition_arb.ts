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

            const candidTypeAnnotation = generateCandidTypeAnnotation(
                useTypeDeclaration,
                name
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
                name,
                candidMeta: {
                    candidTypeAnnotation,
                    candidTypeObject,
                    variableAliasDeclarations,
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
            fc.oneof(candidDefArb, VoidDefinitionArb())
        )
        .map(([name, mode, params, returnType]): ServiceMethodDefinition => {
            const paramCandidTypeObjects = params.map(
                (param) => param.candidMeta.candidTypeObject
            );

            const variableAliasDeclarations = params.reduce(
                (
                    acc,
                    { candidMeta: { variableAliasDeclarations } }
                ): string[] => {
                    return [...acc, ...variableAliasDeclarations];
                },
                returnType.candidMeta.variableAliasDeclarations
            );

            const src = `${name}: ${mode}([${paramCandidTypeObjects}], ${returnType.candidMeta.candidTypeObject})`;

            const imports = params.reduce(
                (acc, param) => {
                    return new Set([...acc, ...param.candidMeta.imports]);
                },
                new Set([mode, ...returnType.candidMeta.imports])
            );

            return {
                name,
                imports,
                variableAliasDeclarations: variableAliasDeclarations,
                src
            };
        });
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    serviceMethods: ServiceMethodDefinition[]
): string[] {
    const serviceMethodTypeAliasDecls = serviceMethods.flatMap(
        (serviceMethod) => serviceMethod.variableAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...serviceMethodTypeAliasDecls,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                serviceMethods
            )};`
        ];
    }
    return serviceMethodTypeAliasDecls;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string
) {
    if (useTypeDeclaration === true) {
        return `typeof ${name}.tsType`;
    }

    return '[Principal]';
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    serviceMethods: ServiceMethodDefinition[]
) {
    if (useTypeDeclaration === true) {
        return name;
    }

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
