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
            const valueLiteral = generateValueLiteral(
                sample,
                src.src.candidType
            );

            return {
                value: generateValue(sample, src.src.candidType),
                expectedValue: generateValue(sample, src.src.candidType),
                src: {
                    candidType: `Vec(${src.src.candidType})`,
                    imports: new Set([...src.src.imports, 'Vec']),
                    valueLiteral
                }
            };
        });
};

function generateValue<T extends CandidType>(
    array: CandidMeta<T>[],
    candidType: string
): Vec<T> {
    const value = array.map((sample) => sample.value);

    if (candidType === 'int8') {
        return new Int8Array(value as number[]);
    }
    if (candidType === 'int16') {
        return new Int16Array(value as number[]);
    }
    if (candidType === 'int32') {
        return new Int32Array(value as number[]);
    }
    if (candidType === 'int64') {
        return new BigInt64Array(value as bigint[]);
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

function generateValueLiteral<T extends CandidType>(
    sample: CandidMeta<T>[],
    candidType: string
) {
    const valueLiterals = sample
        .map((sample) => sample.src.valueLiteral)
        .join(',');

    const valueLiteral = `[${valueLiterals}]`;

    if (candidType === 'int64') {
        return `BigInt64Array.from(${valueLiteral})`;
    }

    if (candidType === 'int32') {
        return `Int32Array.from(${valueLiteral})`;
    }

    if (candidType === 'int16') {
        return `Int16Array.from(${valueLiteral})`;
    }

    if (candidType === 'int8') {
        return `Int8Array.from(${valueLiteral})`;
    }

    if (candidType === 'nat64') {
        return `BigUint64Array.from(${valueLiteral})`;
    }

    if (candidType === 'nat32') {
        return `Uint32Array.from(${valueLiteral})`;
    }

    if (candidType === 'nat16') {
        return `Uint16Array.from(${valueLiteral})`;
    }

    if (candidType === 'nat8') {
        return `Uint8Array.from(${valueLiteral})`;
    }

    return valueLiteral;
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
