import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Record } from 'azle/experimental/_internal/test/property/arbitraries/candid/constructed/record_arb';
import {
    AzleResult,
    candidTestEquality,
    Test} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamRecords: Named<CandidValueAndMeta<Record>>[],
    returnRecord: CandidValueAndMeta<Record>
): Test[][] {
    return [
        [
            {
                name: `record ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](
                        ...namedParamRecords.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return candidTestEquality(
                        result,
                        returnRecord.value.agentResponseValue
                    );
                }
            }
        ]
    ];
}
