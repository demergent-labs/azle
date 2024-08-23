import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    paramBlobs: Named<CandidValueAndMeta<Uint8Array>>[],
    returnBlob: CandidValueAndMeta<Uint8Array>
): Test[][] {
    const expectedResult = Uint8Array.from(
        paramBlobs
            .map((blob) => blob.value.value.agentResponseValue)
            .reduce(
                (acc, blob) => [...acc, ...blob],
                [...returnBlob.value.agentResponseValue]
            )
    );

    return [
        [
            {
                name: `blob ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        ...paramBlobs.map(
                            (blob) => blob.value.value.agentArgumentValue
                        )
                    );

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
