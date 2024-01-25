import fc, { ArrayConstraints } from 'fast-check';
import { Vec } from '.';
import { CandidType } from '../../candid_type';
import { CorrespondingJSType } from '../../corresponding_js_type';
import {
    CandidDefinition,
    OptCandidDefinition,
    RecordCandidDefinition,
    TupleCandidDefinition,
    VariantCandidDefinition,
    VecCandidDefinition
} from '../../candid_definition_arb/types';
import {
    CandidValues,
    CandidValueArb,
    CandidValueConstraints
} from '../../candid_values_arb';
import { RecursiveShapes } from '../../recursive';
import { DEFAULT_VALUE_MAX_DEPTH } from '../../../config';

/*
https://github.com/dfinity/candid/blob/491969f34dd791e51f69c5f8d3c6192ae405b839/spec/Candid.md#memory
Set size limit to follow candid spec
const NULL_VEC_SIZE_LIMIT = 2_000_000;
*/
// TODO set to zero until the limit is unified on both the canister and client side as per https://github.com/demergent-labs/azle/issues/1538
const EMPTYISH_VEC_SIZE_LIMIT = 0;

export function VecValuesArb(
    vecDefinition: VecCandidDefinition,
    recursiveShapes: RecursiveShapes,
    constraints: CandidValueConstraints = {
        depthLevel: DEFAULT_VALUE_MAX_DEPTH
    }
): fc.Arbitrary<CandidValues<Vec>> {
    const depthLevel = constraints.depthLevel ?? DEFAULT_VALUE_MAX_DEPTH;
    if (depthLevel < 1) {
        return fc.constant(
            generateEmptyVec(vecDefinition.innerType.candidMeta.candidType)
        );
    }
    const arbitraryMemberValues = fc
        .tuple(
            fc.array(fc.constant(null), determineVecConstraints(vecDefinition)),
            fc.constant(vecDefinition.innerType)
        )
        .chain(([arrayTemplate, innerType]) =>
            fc.tuple(
                ...arrayTemplate.map(() =>
                    CandidValueArb(innerType, recursiveShapes, {
                        ...constraints,
                        depthLevel: depthLevel - 1
                    })
                )
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

function determineVecConstraints(
    vecDefinition: VecCandidDefinition
): ArrayConstraints | undefined {
    if (isEmptyInnerType(vecDefinition.innerType)) {
        return { maxLength: EMPTYISH_VEC_SIZE_LIMIT };
    }
    return;
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

/**
 * In order to prevent DoS attacks empty inner types can only be of length 0.
 * Empty types are null, empty record, empty tuple, record with one field that
 * is a null, tuple with one field that is a null.
 * Lets start with a vec or null, or vec or tuple where all the fields are null,
 * or vec or record where all things are null or vec or variant where things are
 * null
 * https://github.com/demergent-labs/azle/issues/1524
 * @param innerType
 * @returns
 */
function isEmptyInnerType(innerType: CandidDefinition): boolean {
    if (innerType.candidMeta.candidType === 'Null') {
        return true;
    }
    if (
        innerType.candidMeta.candidType === 'Record' ||
        innerType.candidMeta.candidType === 'Tuple' ||
        innerType.candidMeta.candidType === 'Variant' ||
        innerType.candidMeta.candidType === 'Opt'
    ) {
        return areAllFieldsNull(innerType);
    }
    return false;
}

function areAllFieldsNull(innerType: CandidDefinition): boolean {
    if (
        innerType.candidMeta.candidType === 'Record' ||
        innerType.candidMeta.candidType === 'Variant'
    ) {
        const multiInnerType = innerType as
            | RecordCandidDefinition
            | VariantCandidDefinition;
        return multiInnerType.innerTypes.every((innerType) =>
            isEmptyInnerType(innerType[1])
        );
    }
    if (innerType.candidMeta.candidType === 'Tuple') {
        const multiInnerType = innerType as TupleCandidDefinition;
        return multiInnerType.innerTypes.every((innerType) =>
            isEmptyInnerType(innerType)
        );
    }
    if (innerType.candidMeta.candidType === 'Opt') {
        const optInnerType = innerType as OptCandidDefinition;
        return isEmptyInnerType(optInnerType.innerType);
    }
    return false;
}
