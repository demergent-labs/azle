import { Principal } from '@dfinity/principal';
import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';
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
                test: async (): Promise<AzleResult> => {
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
