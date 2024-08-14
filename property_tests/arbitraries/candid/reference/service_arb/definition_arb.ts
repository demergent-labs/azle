import fc from 'fast-check';

import { Canister } from '../../../../../src/lib/experimental/candid/types/reference/service';
import { Syntax } from '../../../types';
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
    fieldCandidDefArb: WithShapesArb<CandidDefinition>,
    syntax: Syntax
): WithShapesArb<ServiceCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            fc.uniqueArray(ServiceMethodArb(fieldCandidDefArb, syntax), {
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
                    name,
                    syntax
                );

                const candidTypeObject = generateCandidTypeObject(
                    useTypeDeclaration,
                    name,
                    fields,
                    syntax
                );

                const runtimeCandidTypeObject =
                    generateRuntimeCandidTypeObject(fields);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        fields,
                        syntax
                    );

                const imports = generateImports(fields, syntax);

                return {
                    definition: {
                        name,
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            runtimeCandidTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Service',
                            idl: generateIdl(fields)
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
    syntax: Syntax
): Set<string> {
    const serviceImports = syntax === 'functional' ? ['Canister'] : ['IDL'];
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
    syntax: Syntax
): string[] {
    const serviceMethodTypeAliasDecls = serviceMethods.flatMap(
        (serviceMethod) => serviceMethod.variableAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...serviceMethodTypeAliasDecls,
            `const ${name} = ${
                syntax === 'functional'
                    ? generateCandidTypeObject(
                          false,
                          name,
                          serviceMethods,
                          syntax
                      )
                    : generateIdl(serviceMethods)
            };`
        ];
    }
    return serviceMethodTypeAliasDecls;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        if (syntax === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    return '[Principal]';
}

function generateIdl(serviceMethods: ServiceMethodDefinition[]): string {
    const methods = serviceMethods
        .map((serviceMethod) => serviceMethod.src)
        .filter((typeDeclaration) => typeDeclaration)
        .join(',\n');

    return `IDL.Service({${methods}})`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    serviceMethods: ServiceMethodDefinition[],
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const methods = serviceMethods
        .map((serviceMethod) => serviceMethod.src)
        .filter((typeDeclaration) => typeDeclaration)
        .join(',\n');

    if (syntax === 'class') {
        return `IDL.Service({${methods}})`;
    }

    return `Canister({${methods}})`;
}

// TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
