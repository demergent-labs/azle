import fc from 'fast-check';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { createUniquePrimitiveArb } from './unique_primitive_arb';
import { CandidValueAndMetaArb } from './candid/candid_value_and_meta_arb';

export const StableBTreeMapArb = fc
    .tuple(
        CandidValueAndMetaArb(),
        argumentInfoArb(),
        CandidValueAndMetaArb(),
        argumentInfoArb(),
        UniqueIdentifierArb('stableBTreeMap'),
        createUniquePrimitiveArb(
            fc.nat({
                max: 254
            })
        )
    )
    .map(
        ([
            keySample,
            keyArgumentInfo,
            valueSample,
            valueArgumentInfo,
            uniqueIdentifier,
            memoryId
        ]) => {
            const name = `stableBTreeMap${uniqueIdentifier}`;

            const imports = new Set([
                ...keySample.src.imports,
                ...valueSample.src.imports,
                'stableJson',
                'StableBTreeMap'
            ]);

            const serializableArguments = getSerializableArguments(
                keySample,
                valueSample,
                keyArgumentInfo,
                valueArgumentInfo
            );

            return {
                name,
                imports,
                definition: `let ${name} = StableBTreeMap<${keySample.src.candidTypeAnnotation}, ${valueSample.src.candidTypeAnnotation}>(${memoryId}${serializableArguments});`,
                keySample,
                valueSample
            };
        }
    );

// TODO there must be a better way to get this type out, the sample will actually run
export const StableBTreeMap = fc.sample(StableBTreeMapArb)[0];
export type StableBTreeMap = typeof StableBTreeMap;

function getSerializableArguments(
    keySample: StableBTreeMap['keySample'],
    valueSample: StableBTreeMap['valueSample'],
    keyArgumentInfo: 'STABLE_JSON' | 'CANDID_TYPE_OBJECT',
    valueArgumentInfo: 'STABLE_JSON' | 'CANDID_TYPE_OBJECT'
): string {
    const keyArgument =
        keyArgumentInfo === 'STABLE_JSON'
            ? 'stableJson'
            : keySample.src.candidTypeObject;
    const valueArgument =
        valueArgumentInfo == 'STABLE_JSON'
            ? 'stableJson'
            : valueSample.src.candidTypeObject;

    return `, ${keyArgument}, ${valueArgument}`;
}

function argumentInfoArb(): fc.Arbitrary<'STABLE_JSON' | 'CANDID_TYPE_OBJECT'> {
    return fc.oneof(
        fc.constant<'STABLE_JSON'>('STABLE_JSON'),
        fc.constant<'CANDID_TYPE_OBJECT'>('CANDID_TYPE_OBJECT')
    );
}
