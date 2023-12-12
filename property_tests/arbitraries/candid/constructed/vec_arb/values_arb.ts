import fc from 'fast-check';
import { Vec } from '.';
import { CandidType } from '../../candid_type';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { VecCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../../candid_values_arb';

export function VecValuesArb(
    vecDefinition: VecCandidDefinition,
    n: number
): fc.Arbitrary<CandidValues<Vec>> {
    if (n < 1) {
        return fc.constant(
            generateEmptyVec(vecDefinition.innerType.candidMeta.candidType)
        );
    }
    const arbitraryMemberValues = fc
        .tuple(
            fc.array(fc.constant(null)),
            fc.constant(vecDefinition.innerType)
        )
        .chain(([arrayTemplate, innerType]) =>
            fc.tuple(
                ...arrayTemplate.map(() => CandidValueArb(innerType, n - 1))
            )
        );

    const innerCandidType = vecDefinition.innerType.candidMeta.candidType;

    return arbitraryMemberValues.map((fieldValues) => {
        const valueLiteral = generateValueLiteral(fieldValues, innerCandidType);
        const agentArgumentValue = generateValue(fieldValues, innerCandidType);
        const agentResponseValue = generateValue(
            fieldValues,
            innerCandidType,
            true
        );
        return {
            valueLiteral,
            agentArgumentValue,
            agentResponseValue
        };
    });
}

function generateEmptyVec(innerCandidType: CandidType): CandidValues<Vec> {
    return {
        valueLiteral: typeValueLiteral('[]', innerCandidType),
        agentArgumentValue: typeArray([], innerCandidType),
        agentResponseValue: typeArray([], innerCandidType)
    };
}

function generateValue<T extends CorrespondingJSType>(
    array: CandidValues<T>[],
    innerCandidType: CandidType,
    returned: boolean = false
): Vec {
    const value = array.map((sample) =>
        returned ? sample.agentResponseValue : sample.agentArgumentValue
    );

    return typeArray(value, innerCandidType);
}

function generateValueLiteral<T extends CorrespondingJSType>(
    sample: CandidValues<T>[],
    innerCandidType: CandidType
) {
    const valueLiterals = sample.map((sample) => sample.valueLiteral).join(',');

    const valueLiteral = `[${valueLiterals}]`;

    return typeValueLiteral(valueLiteral, innerCandidType);
}

function typeValueLiteral(
    arrayLiteral: string,
    innerCandidType: CandidType
): string {
    if (innerCandidType === 'int64') {
        return `BigInt64Array.from(${arrayLiteral})`;
    }

    if (innerCandidType === 'int32') {
        return `Int32Array.from(${arrayLiteral})`;
    }

    if (innerCandidType === 'int16') {
        return `Int16Array.from(${arrayLiteral})`;
    }

    if (innerCandidType === 'int8') {
        return `Int8Array.from(${arrayLiteral})`;
    }

    if (innerCandidType === 'nat64') {
        return `BigUint64Array.from(${arrayLiteral})`;
    }

    if (innerCandidType === 'nat32') {
        return `Uint32Array.from(${arrayLiteral})`;
    }

    if (innerCandidType === 'nat16') {
        return `Uint16Array.from(${arrayLiteral})`;
    }

    if (innerCandidType === 'nat8') {
        return `Uint8Array.from(${arrayLiteral})`;
    }

    return arrayLiteral;
}

function typeArray<T extends CorrespondingJSType>(
    arr: T[],
    innerCandidType: CandidType
): Vec {
    if (innerCandidType === 'int8') {
        return new Int8Array(arr as number[]);
    }
    if (innerCandidType === 'int16') {
        return new Int16Array(arr as number[]);
    }
    if (innerCandidType === 'int32') {
        return new Int32Array(arr as number[]);
    }
    if (innerCandidType === 'int64') {
        return new BigInt64Array(arr as bigint[]);
    }
    if (innerCandidType === 'nat8') {
        return new Uint8Array(arr as number[]);
    }
    if (innerCandidType === 'nat16') {
        return new Uint16Array(arr as number[]);
    }
    if (innerCandidType === 'nat32') {
        return new Uint32Array(arr as number[]);
    }
    if (innerCandidType === 'nat64') {
        return new BigUint64Array(arr as bigint[]);
    }

    return arr;
}
