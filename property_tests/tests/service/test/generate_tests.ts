import { Principal } from '@dfinity/principal';
import { Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test, testEquality } from 'azle/test';
import { execSync } from 'child_process';

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
                                `service "${param.value.value.agentArgumentValue.toText()}"`
                        )
                        .join();

                    const result = execSync(
                        `dfx canister call canister ${functionName} '(${paramsString})'`
                    )
                        .toString()
                        .trim();

                    return testEquality(
                        result,
                        `(service "${returnService.value.agentArgumentValue.toText()}")`
                    );
                }
            }
        ]
    ];
}
