import fc from 'fast-check';
import { Principal } from '@dfinity/principal';

import { PrincipalArb } from './principal_arb';
import { VoidArb } from '../primitive/void';
import { CandidValueAndMeta } from '../candid_value_and_meta';
import { CandidValueAndMetaArb } from '../candid_type_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';

// TODO:
// - services that are more than type-definitions, i.e. have functionality
// - async service methods
// - non-query methods
// - actually using the service

// Example Service:
// const SomeService = Canister({
//     method1: query([], Void),
//     method2: query([text, text, nat64], nat64),
// });

type ServiceMethod = {
    name: string;
    imports: Set<string>;
    typeAliasDeclarations: string[];
    src: string;
};

const ServiceMethodArb = fc
    .tuple(
        JsFunctionNameArb,
        fc.constantFrom('query', 'update'),
        fc.array(CandidValueAndMetaArb),
        fc.oneof(CandidValueAndMetaArb, VoidArb)
    )
    .map(([name, mode, params, returnType]): ServiceMethod => {
        const paramCandidTypes = params.map(
            (param) => param.src.typeAnnotation
        );

        const typeAliasDeclarations = params.reduce(
            (acc, { src: { typeAliasDeclarations } }): string[] => {
                return [...acc, ...typeAliasDeclarations];
            },
            returnType.src.typeAliasDeclarations
        );

        const src = `${name}: ${mode}([${paramCandidTypes}], ${returnType.src.typeAnnotation})`;

        const imports = params.reduce(
            (acc, param) => {
                return new Set([...acc, ...param.src.imports]);
            },
            new Set([mode, ...returnType.src.imports])
        );

        return {
            name,
            imports,
            typeAliasDeclarations,
            src
        };
    });

export const ServiceArb = fc
    .tuple(
        UniqueIdentifierArb('typeDeclaration'),
        fc.uniqueArray(ServiceMethodArb, { selector: (entry) => entry.name }),
        PrincipalArb
    )
    .map(([name, serviceMethods, principal]): CandidValueAndMeta<Principal> => {
        const imports = new Set([
            ...serviceMethods.flatMap((method) => [...method.imports]),
            'Canister',
            'query'
        ]);

        const typeDeclaration = generateTypeDeclaration(name, serviceMethods);

        const typeAliasDeclarationsAndChildren = [
            ...serviceMethods.flatMap((method) => method.typeAliasDeclarations),
            typeDeclaration
        ];

        const valueLiteral = `${name}(${principal.src.valueLiteral})`;

        const value = principal.agentArgumentValue;

        return {
            src: {
                typeAnnotation: name,
                typeAliasDeclarations: typeAliasDeclarationsAndChildren,
                imports,
                valueLiteral
            },
            agentArgumentValue: value,
            agentResponseValue: value
        };
    });

function generateTypeDeclaration(
    name: string,
    serviceMethods: ServiceMethod[]
): string {
    const methods = serviceMethods
        .map((serviceMethod) => serviceMethod.src)
        .filter((typeDeclaration) => typeDeclaration)
        .join(',\n');

    return `const ${name} = Canister({${methods}});`;
}
