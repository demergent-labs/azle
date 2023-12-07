import { Principal } from '@dfinity/principal';
import { execSync } from 'child_process';

import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Named } from 'azle/property_tests';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamServices: Named<CandidValueAndMeta<Principal>>[],
    returnService: CandidValueAndMeta<Principal>
): Test[][] {
    return [
        [
            {
                name: `service ${functionName}`,
                test: async () => {
                    // Using execSync because the JS Agent has a bug expecting services
                    // to be ordered by hash or something.
                    // See https://forum.dfinity.org/t/topic/20885/14

                    const paramsString = namedParamServices
                        .map(
                            (param) =>
                                `service "${param.el.agentArgumentValue.toText()}"`
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
        ]
    ];
}
