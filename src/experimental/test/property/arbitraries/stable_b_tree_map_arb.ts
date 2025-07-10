import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import {
    CandidValueAndMeta,
    CandidValueAndMetaArb
} from './candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from './candid/corresponding_js_type';
import { Context } from './types';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { createUniquePrimitiveArb } from './unique_primitive_arb';

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
            CandidValueAndMetaArb(context),
            UniqueIdentifierArb('globalNames'),
            createUniquePrimitiveArb(
                fc.nat({
                    max: 253
                })
            )
        )
        .map(([keySample, valueSample, name, memoryId]) => {
            const imports = new Set([
                ...keySample.src.imports,
                ...valueSample.src.imports,
                'stableJson',
                'StableBTreeMap'
            ]);

            const key = keySample.src.typeAnnotation;
            const value = valueSample.src.typeAnnotation;

            return {
                name,
                imports,
                definition: `let ${name} = new StableBTreeMap<${key}, ${value}>(${memoryId});`,
                keySample,
                valueSample
            };
        });
}
