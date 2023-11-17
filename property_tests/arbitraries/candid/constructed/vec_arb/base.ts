import fc from 'fast-check';
import { CandidMeta } from '../../candid_arb';
import { CandidType } from '../../candid_type_arb';
import { Vec } from './index';

export const VecInnerArb = <T extends CandidType>(
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
