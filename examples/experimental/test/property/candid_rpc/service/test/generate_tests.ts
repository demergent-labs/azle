import { Principal } from '@dfinity/principal';
import { Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    candidTestEquality,
    Test} from 'azle/experimental/_internal/test/property/test';
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

                    const escapedFunctionName = functionName.startsWith('"')
                        ? `'${functionName.slice(1, -1).replace(/'/g, "'\\''")}'`
                        : functionName;

                    // Check if the function name starts with a dash, we need to use -- to prevent it from being treated as an option
                    const dashPrefix =
                        escapedFunctionName.startsWith('-') ||
                        (escapedFunctionName.startsWith("'") &&
                            escapedFunctionName.charAt(1) === '-')
                            ? '-- '
                            : '';

                    const result = execSync(
                        `dfx canister call canister ${dashPrefix}${escapedFunctionName} '(${paramsString})'`
                    )
                        .toString()
                        .trim();

                    return candidTestEquality(
                        result,
                        `(service "${returnService.value.agentArgumentValue.toText()}")`
                    );
                }
            }
        ]
    ];
}
