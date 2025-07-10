import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { IDL } from '#lib/index';

import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    ServiceCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import {
    ServiceMethodArb,
    ServiceMethodDefinition
} from './service_method_arb';

export function ServiceDefinitionArb(
    fieldCandidDefArb: WithShapesArb<CandidDefinition>
): WithShapesArb<ServiceCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
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

                const typeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    fields
                );

                const runtimeTypeObject = generateRuntimeTypeObject(fields);

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
                            typeAnnotation,
                            typeObject,
                            runtimeTypeObject,
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

function generateImports(
    serviceMethods: ServiceMethodDefinition[]
): Set<string> {
    const serviceImports = ['IDL'];
    return new Set([
        ...serviceMethods.flatMap((serviceMethod) =>
            Array.from(serviceMethod.imports)
        ),
        'Principal',
        'query',
        ...serviceImports
    ]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    serviceMethods: ServiceMethodDefinition[]
): string[] {
    const serviceMethodTypeAliasDecls = serviceMethods.flatMap(
        (serviceMethod) => serviceMethod.variableAliasDeclarations
    );
    if (useTypeDeclaration === true) {
        const type = [`type ${name} = Principal;`];
        return [
            ...serviceMethodTypeAliasDecls,
            `const ${name} = ${generateTypeObject(
                false,
                name,
                serviceMethods
            )};`,
            ...type
        ];
    }
    return serviceMethodTypeAliasDecls;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return '[Principal]';
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    serviceMethods: ServiceMethodDefinition[]
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const methods = serviceMethods
        .map((serviceMethod) => serviceMethod.idl)
        .filter((typeDeclaration) => typeDeclaration)
        .join(',\n');

    return `IDL.Service({${methods}})`;
}

// TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function generateRuntimeTypeObject(serviceMethods: ServiceMethodDefinition[]) {
    const methods = serviceMethods.reduce((acc, serviceMethod) => {
        return {
            ...acc,
            [serviceMethod.name]: serviceMethod.runtimeTypeObject
        };
    }, {});

    return IDL.Service(methods);
}
