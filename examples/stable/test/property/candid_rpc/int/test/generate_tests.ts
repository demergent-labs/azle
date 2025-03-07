import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    Test,
    testEquality
} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamInts: Named<CandidValueAndMeta<bigint>>[],
    returnInt: CandidValueAndMeta<bigint>
): Test[][] {
    const expectedResult = namedParamInts.reduce(
        (acc, param) => acc + param.value.value.agentResponseValue,
        returnInt.value.agentResponseValue
    );
    const paramValues = namedParamInts.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `int ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const actualActorName = '\\>bind\\ubin';
                    const problematicActorName = '"\\\\>bind\\\\ubin"';

                    const thing = actor['\\>bind\\ubin'];
                    console.log('thing', thing);
                    const thing2 = actor["'\\>bind\\ubin'"];
                    console.log('thing2', thing2);
                    const thing3 = actor['"\\>bind\\ubin"'];
                    console.log('thing3', thing3);
                    const thing4 = actor[actualActorName];
                    console.log('thing4', thing4);

                    console.log(
                        "functionName === '\\>bind\\ubin'",
                        functionName === '\\>bind\\ubin'
                    );
                    console.log(
                        'functionName === "\'\\>bind\\ubin\'"',
                        functionName === "'\\>bind\\ubin'"
                    );
                    console.log(
                        'functionName === \'"\\>bind\\ubin"\'',
                        functionName === '"\\>bind\\ubin"'
                    );
                    console.log(
                        'functionName.startsWith(""")',
                        functionName.startsWith('"')
                    );
                    console.log(
                        `functionName === '${actualActorName}'`,
                        functionName === actualActorName
                    );
                    console.log(
                        `functionName === '${problematicActorName}'`,
                        functionName === problematicActorName
                    );

                    for (const char of functionName) {
                        console.log('char', char);
                    }

                    for (const char of actualActorName) {
                        console.log('actual char', char);
                    }

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
