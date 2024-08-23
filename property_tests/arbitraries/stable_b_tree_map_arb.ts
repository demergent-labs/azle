import fc from 'fast-check';

import {
    CandidValueAndMeta,
    CandidValueAndMetaArb
} from './candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from './candid/corresponding_js_type';
import { Api, Context } from './types';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { createUniquePrimitiveArb } from './unique_primitive_arb';

type SerializableType = 'STABLE_JSON' | 'CANDID_TYPE_OBJECT';

export type StableBTreeMap = {
    name: string;
    imports: Set<string>;
    definition: string;
    keySample: CandidValueAndMeta<CorrespondingJSType, CorrespondingJSType>;
    valueSample: CandidValueAndMeta<CorrespondingJSType>;
};

export function StableBTreeMapArb(
    context: Context
): fc.Arbitrary<StableBTreeMap> {
    return fc
        .tuple(
            CandidValueAndMetaArb(context),
            argumentInfoArb(),
            CandidValueAndMetaArb(context),
            argumentInfoArb(),
            UniqueIdentifierArb('globalNames'),
            createUniquePrimitiveArb(
                fc.nat({
                    max: 254
                })
            )
        )
        .map(
            ([
                keySample,
                keySerializableType,
                valueSample,
                valueSerializableType,
                name,
                memoryId
            ]) => {
                const imports = new Set([
                    ...keySample.src.imports,
                    ...valueSample.src.imports,
                    'stableJson',
                    'StableBTreeMap'
                ]);

                const serializableArguments = getSerializableArguments(
                    keySample,
                    valueSample,
                    keySerializableType,
                    valueSerializableType,
                    context.api
                );

                const key = keySample.src.typeAnnotation;
                const value = valueSample.src.typeAnnotation;

                return {
                    name,
                    imports,
                    definition: `let ${name} = StableBTreeMap<${key}, ${value}>(${memoryId}${serializableArguments});`,
                    keySample,
                    valueSample
                };
            }
        );
}

function getSerializableArguments(
    keySample: StableBTreeMap['keySample'],
    valueSample: StableBTreeMap['valueSample'],
    keySerializableType: SerializableType,
    valueSerializableType: SerializableType,
    api: Api
): string {
    const keyArgument =
        keySerializableType === 'STABLE_JSON' || api === 'class'
            ? 'stableJson'
            : keySample.src.typeObject;
    const valueArgument =
        valueSerializableType === 'STABLE_JSON' || api === 'class'
            ? 'stableJson'
            : valueSample.src.typeObject;

    return `, ${keyArgument}, ${valueArgument}`;
}

function argumentInfoArb(): fc.Arbitrary<SerializableType> {
    return fc.oneof(
        fc.constant<'STABLE_JSON'>('STABLE_JSON'),
        fc.constant<'CANDID_TYPE_OBJECT'>('CANDID_TYPE_OBJECT')
    );
}
