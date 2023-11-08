import { Principal } from '@dfinity/principal';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { runPropTests } from '../../..';
import { CanisterArb } from '../../../arbitraries/canister_arb';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { ServiceArb } from '../../../arbitraries/candid/reference/service_arb';
import { QueryMethodArb } from '../../../arbitraries/query_method_arb';
import { Test } from '../../../../test';

const UniqueServicesArray = fc.uniqueArray(ServiceArb, {
    selector: (entry) => entry.src.candidType
});

const AllServicesQueryMethod = QueryMethodArb(UniqueServicesArray, ServiceArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllServicesQueryMethod));

function generateBody(
    paramNames: string[],
    paramServices: CandidMeta<Principal>[],
    returnService: CandidMeta<Principal>
): string {
    const paramsAreServices = paramServices
        .map((param, index) => {
            const paramName = `param${index}`;

            const paramIsAService = `(${paramName} as any).principal.toText() === "${param.agentArgumentValue.toText()}"`;

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

function generateTests(
    functionName: string,
    paramServices: CandidMeta<Principal>[],
    returnService: CandidMeta<Principal>
): Test[] {
    return [
        {
            name: `service ${functionName}`,
            test: async () => {
                // Using execSync because the JS Agent has a bug expecting services
                // to be ordered by hash or something.
                // See https://forum.dfinity.org/t/topic/20885/14

                const paramsString = paramServices
                    .map(
                        (service) =>
                            `service "${service.agentArgumentValue.toText()}"`
                    )
                    .join();

                const result = execSync(
                    `dfx canister call canister ${functionName} '(${paramsString})'`
                )
                    .toString()
                    .trim();

                return {
                    Ok:
                        result ===
                        `(service "${returnService.agentArgumentValue.toText()}")`
                };
            }
        }
    ];
}
