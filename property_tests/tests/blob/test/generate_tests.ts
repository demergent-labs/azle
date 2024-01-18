import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

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
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        ...paramBlobs.map(
                            (blob) => blob.value.value.agentArgumentValue
                        )
                    );

                    return {
                        Ok: deepEqual(result, expectedResult)
                    };
                }
            }
        ]
    ];
}
