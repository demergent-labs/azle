import fc from 'fast-check';
import { Principal } from '@dfinity/principal';

import { PrincipalArb } from './principal_arb';
import { VoidArb } from '../primitive/void';
import { CandidMeta } from '../candid_arb';
import { CandidTypeArb } from '../candid_type_arb';
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
    typeDeclarations: string[];
    src: string;
};

const ServiceMethodArb = fc
    .tuple(
        JsFunctionNameArb,
        fc.constantFrom('query', 'update'),
        fc.array(CandidTypeArb),
        fc.oneof(CandidTypeArb, VoidArb)
    )
    .map(([name, mode, params, returnType]): ServiceMethod => {
        const paramCandidTypes = params.map((param) => param.src.candidType);

        const typeDeclarations = params.reduce(
            (acc, { src: { typeDeclaration } }) => {
                return typeDeclaration ? [...acc, typeDeclaration] : acc;
            },
            returnType.src.typeDeclaration
                ? [returnType.src.typeDeclaration]
                : new Array<string>()
        );

        const src = `${name}: ${mode}([${paramCandidTypes}], ${returnType.src.candidType})`;

        const imports = params.reduce(
            (acc, param) => {
                return new Set([...acc, ...param.src.imports]);
            },
            new Set([mode, ...returnType.src.imports])
        );

        return {
            name,
            imports,
            typeDeclarations,
            src
        };
    });

export const ServiceArb = fc
    .tuple(
        UniqueIdentifierArb('typeDeclaration'),
        fc.uniqueArray(ServiceMethodArb, { selector: (entry) => entry.name }),
        PrincipalArb
    )
    .map(([name, serviceMethods, principal]): CandidMeta<Principal> => {
        const imports = new Set([
            ...serviceMethods.flatMap((method) => [...method.imports]),
            'Canister',
            'query'
        ]);

        const typeDeclaration = generateTypeDeclaration(name, serviceMethods);

        const typeDeclarationAndChildren = [
            ...serviceMethods.flatMap((method) => method.typeDeclarations),
            typeDeclaration
        ].join('\n');

        const valueLiteral = `${name}(${principal.src.valueLiteral})`;

        const value = principal.value;

        return {
            src: {
                candidType: name,
                typeDeclaration: typeDeclarationAndChildren,
                imports,
                valueLiteral
            },
            value
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
