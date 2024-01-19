import fc from 'fast-check';

import {
    ServiceMethodArb,
    ServiceMethodDefinition
} from './service_method_arb';
import {
    CandidDefinition,
    ServiceCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { Canister } from '../../../../../src/lib/candid/types/reference/service';

export function ServiceDefinitionArb(
    fieldCandidDefArb: WithShapesArb<CandidDefinition>
): WithShapesArb<ServiceCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.uniqueArray(ServiceMethodArb(fieldCandidDefArb), {
                selector: (entry) => entry.definition.name
            }),
            fc.constant(true) // TODO This needs to be true, I don't know why we set up to be an arbitrary boolean if it has to be true
        )
        .map(
            ([
                name,
                fieldsAndShapes,
                useTypeDeclaration
            ]): WithShapes<ServiceCandidDefinition> => {
                const fields = fieldsAndShapes.map(
                    (fieldAndShapes) => fieldAndShapes.definition
                );
                const recursiveShapes = fieldsAndShapes.reduce(
                    (acc, fieldAndShapes) => {
                        return { ...acc, ...fieldAndShapes.recursiveShapes };
                    },
                    {}
                );

                const candidTypeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name
                );

                const candidTypeObject = generateCandidTypeObject(
                    useTypeDeclaration,
                    name,
                    fields
                );

                const runtimeCandidTypeObject =
                    generateRuntimeCandidTypeObject(fields);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        fields
                    );

                const imports = generateImports(fields);

                return {
                    definition: {
                        name,
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            runtimeCandidTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Service'
                        },
                        funcs: fields
                    },
                    recursiveShapes
                };
            }
        );
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

function generateRuntimeCandidTypeObject(
    serviceMethods: ServiceMethodDefinition[]
) {
    const methods = serviceMethods.reduce((acc, serviceMethod) => {
        return {
            ...acc,
            [serviceMethod.name]: serviceMethod.runtimeCandidTypeObject
        };
    }, {});

    return Canister(methods);
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
