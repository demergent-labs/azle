import fc from 'fast-check';
import { IntArb } from '../primitive/ints/int_arb';
import { Int8Arb } from '../primitive/ints/int8_arb';
import { Int16Arb } from '../primitive/ints/int16_arb';
import { Int32Arb } from '../primitive/ints/int32_arb';
import { Int64Arb } from '../primitive/ints/int64_arb';
import { NatArb } from '../primitive/nats/nat_arb';
import { Nat8Arb } from '../primitive/nats/nat8_arb';
import { Nat16Arb } from '../primitive/nats/nat16_arb';
import { Nat32Arb } from '../primitive/nats/nat32_arb';
import { Nat64Arb } from '../primitive/nats/nat64_arb';
import { PrincipalArb } from '../reference/principal_arb';
import { CandidMeta } from '../candid_arb';
import { BoolArb } from '../primitive/bool';
import { Float32Arb } from '../primitive/floats/float32_arb';
import { Float64Arb } from '../primitive/floats/float64_arb';
import { NullArb } from '../primitive/null';
import { TextArb } from '../primitive/text';
import { BlobArb } from './blob_arb';
import { CandidType } from '../candid_type_arb';

type Vec<T> =
    | T[]
    | Uint16Array
    | Uint32Array
    | Uint8Array
    | Int16Array
    | Int32Array
    | Int8Array
    | BigUint64Array
    | BigInt64Array;

const VecInnerArb = <T extends CandidType>(
    arb: fc.Arbitrary<CandidMeta<T>>
) => {
    return fc
        .tuple(fc.array(arb), arb)
        .map(([sample, src]): CandidMeta<Vec<T>> => {
            const valueLiteral = generateValueLiteral(sample);

            return {
                value: generateValue(sample, src.src.candidType),
                src: {
                    candidType: `Vec(${src.src.candidType})`,
                    imports: new Set([...src.src.imports, 'Vec']),
                    valueLiteral
                }
            };
        });
};

function toNumberArray<T extends CandidType>(array: T[]): number[] {
    if (array.every((item) => typeof item === 'number')) {
        return array as number[];
    }
    throw new Error('array is not a number array');
}

function toBigintArray<T extends CandidType>(array: T[]): bigint[] {
    if (array.every((item) => typeof item === 'bigint')) {
        return array as bigint[];
    }
    throw new Error('array is not a bigint array');
}

function generateValue<T extends CandidType>(
    array: CandidMeta<T>[],
    candidType: string
): Vec<T> {
    const value = array.map((sample) => sample.value);

    if (candidType === 'int8') {
        return new Int8Array(toNumberArray(value));
    }
    if (candidType === 'int16') {
        return new Int16Array(toNumberArray(value));
    }
    if (candidType === 'int32') {
        return new Int32Array(toNumberArray(value));
    }
    if (candidType === 'int64') {
        return new BigInt64Array(toBigintArray(value));
    }
    if (candidType === 'nat8') {
        return new Uint8Array(value as number[]);
    }
    if (candidType === 'nat16') {
        return new Uint16Array(value as number[]);
    }
    if (candidType === 'nat32') {
        return new Uint32Array(value as number[]);
    }
    if (candidType === 'nat64') {
        return new BigUint64Array(value as bigint[]);
    }

    return value;
}

function generateValueLiteral<T extends CandidType>(sample: CandidMeta<T>[]) {
    const valueLiterals = sample
        .map((sample) => sample.src.valueLiteral)
        .join(',');
    return `[${valueLiterals}]`;
}

export const VecArb = fc.oneof(
    VecInnerArb(Float32Arb),
    VecInnerArb(Float64Arb),
    VecInnerArb(IntArb),
    VecInnerArb(Int8Arb),
    VecInnerArb(Int16Arb),
    VecInnerArb(Int32Arb),
    VecInnerArb(Int64Arb),
    VecInnerArb(NatArb),
    VecInnerArb(Nat8Arb),
    VecInnerArb(Nat16Arb),
    VecInnerArb(Nat32Arb),
    VecInnerArb(Nat64Arb),
    VecInnerArb(BoolArb),
    VecInnerArb(TextArb),
    VecInnerArb(PrincipalArb),
    VecInnerArb(BlobArb)
    // VecInnerArb(NullArb)
);
