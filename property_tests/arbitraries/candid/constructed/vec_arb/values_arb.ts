import fc from 'fast-check';
import { Vec } from '.';
import { CandidType } from '../../candid_type';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { VecCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../../candid_values_arb';

export function VecValuesArb(
    vecDefinition: VecCandidDefinition
): fc.Arbitrary<CandidValues<Vec>> {
    const arbitraryMemberValues = fc
        .tuple(
            fc.array(fc.constant(null)),
            fc.constant(vecDefinition.innerType)
        )
        .chain(([arrayTemplate, innerType]) =>
            fc.tuple(...arrayTemplate.map(() => CandidValueArb(innerType)))
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

function generateValue<T extends CorrespondingJSType>(
    array: CandidValues<T>[],
    candidType: CandidType,
    returned: boolean = false
): Vec {
    const value = array.map((sample) =>
        returned ? sample.agentResponseValue : sample.agentArgumentValue
    );

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

function generateValueLiteral<T extends CorrespondingJSType>(
    sample: CandidValues<T>[],
    innerCandidType: CandidType
) {
    const valueLiterals = sample.map((sample) => sample.valueLiteral).join(',');

    const valueLiteral = `[${valueLiterals}]`;

    if (innerCandidType === 'int64') {
        return `BigInt64Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'int32') {
        return `Int32Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'int16') {
        return `Int16Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'int8') {
        return `Int8Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'nat64') {
        return `BigUint64Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'nat32') {
        return `Uint32Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'nat16') {
        return `Uint16Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'nat8') {
        return `Uint8Array.from(${valueLiteral})`;
    }

    return valueLiteral;
}
