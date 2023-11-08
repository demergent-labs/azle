import { Principal } from '@dfinity/principal';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { runPropTests } from '../../..';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { ServiceArb } from '../../../arbitraries/candid/reference/service_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { Test } from '../../../../test';

const ServiceTestArb = fc
    .tuple(
        UniqueIdentifierArb('canisterMethod'),
        // TODO: Consider making this not a unique array and then dealing with
        // duplicates when making the type declarations
        fc.uniqueArray(ServiceArb, {
            selector: (entry) => entry.src.candidType
        }),
        ServiceArb
    )
    .map(([functionName, paramServices, defaultReturnService]): TestSample => {
        const imports = new Set([
            'Principal',
            ...paramServices.flatMap((service) => [...service.src.imports]),
            ...defaultReturnService.src.imports
        ]);

        const candidTypeDeclarations = [
            ...paramServices.map(
                (service) => service.src.typeDeclaration ?? ''
            ),
            paramServices.length === 0
                ? defaultReturnService.src.typeDeclaration ?? ''
                : ''
        ];

        const paramNames = paramServices.map((_, index) => `param${index}`);

        const paramCandidTypes = paramServices
            .map((service) => service.src.candidType)
            .join(', ');

        const returnService =
            paramServices.length === 0
                ? defaultReturnService
                : paramServices[0];

        const returnCandidType = returnService.src.candidType;

        const body = generateBody(paramNames, paramServices, returnService);

        const test = generateTest(functionName, paramServices, returnService);

        return {
            functionName,
            imports,
            candidTypeDeclarations,
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            test
        };
    });

runPropTests(ServiceTestArb);

function generateBody(
    paramNames: string[],
    paramServices: CandidMeta<Principal>[],
    returnService: CandidMeta<Principal>
): string {
    const paramsAreServices = paramServices
        .map((param, index) => {
            const paramName = `param${index}`;

            const paramIsAService = `${paramName}.principal.toText() === "${param.value.toText()}"`;

            const throwError = `throw new Error('${paramName} must be a Service');`;

            return `if (!(${paramIsAService})) ${throwError}`;
        })
        .join('\n');

    const returnStatement =
        paramServices.length === 0 ? returnService.src.valueLiteral : `param0`;

    return `
        ${paramsAreServices}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramServices: CandidMeta<Principal>[],
    returnService: CandidMeta<Principal>
): Test {
    return {
        name: `service ${functionName}`,
        test: async () => {
            // Using execSync because the JS Agent has a bug expecting services
            // to be ordered by hash or something.
            // See https://forum.dfinity.org/t/topic/20885/14

            const paramsString = paramServices
                .map((service) => `service "${service.value.toText()}"`)
                .join();

            const result = execSync(
                `dfx canister call canister ${functionName} '(${paramsString})'`
            )
                .toString()
                .trim();

            return {
                Ok: result === `(service "${returnService.value.toText()}")`
            };
        }
    };
}
