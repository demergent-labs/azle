import fc from 'fast-check';

import { Canister } from '../../../../../../src/lib/experimental/candid/types/reference/service';
import { Api, Context } from '../../../types';
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
    context: Context,
    fieldCandidDefArb: WithShapesArb<CandidDefinition>
): WithShapesArb<ServiceCandidDefinition> {
    const api = context.api;
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            fc.uniqueArray(ServiceMethodArb(context, fieldCandidDefArb), {
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
                    name,
                    api
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    fields,
                    api
                );

                const runtimeTypeObject = generateRuntimeTypeObject(fields);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        fields,
                        api
                    );

                const imports = generateImports(fields, api);

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
    serviceMethods: ServiceMethodDefinition[],
    api: Api
): Set<string> {
    const serviceImports = api === 'functional' ? ['Canister'] : ['IDL'];
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
    serviceMethods: ServiceMethodDefinition[],
    api: Api
): string[] {
    const serviceMethodTypeAliasDecls = serviceMethods.flatMap(
        (serviceMethod) => serviceMethod.variableAliasDeclarations
    );
    if (useTypeDeclaration) {
        const type = api === 'functional' ? [] : [`type ${name} = Principal`];
        return [
            ...serviceMethodTypeAliasDecls,
            `const ${name} = ${generateTypeObject(
                false,
                name,
                serviceMethods,
                api
            )};`,
            ...type
        ];
    }
    return serviceMethodTypeAliasDecls;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    api: Api
): string {
    if (useTypeDeclaration === true) {
        if (api === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    return '[Principal]';
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    serviceMethods: ServiceMethodDefinition[],
    api: Api
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    if (api === 'class') {
        const methods = serviceMethods
            .map((serviceMethod) => serviceMethod.idl)
            .filter((typeDeclaration) => typeDeclaration)
            .join(',\n');

        return `IDL.Service({${methods}})`;
    }

    const methods = serviceMethods
        .map((serviceMethod) => serviceMethod.src)
        .filter((typeDeclaration) => typeDeclaration)
        .join(',\n');

    return `Canister({${methods}})`;
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

    return Canister(methods);
}
