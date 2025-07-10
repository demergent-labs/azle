import '#experimental/build/assert_experimental';

import { Named } from '../..';
import { Test } from '../../test';
import { CandidReturnType } from '../candid/candid_return_type_arb';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';

export type BodyGenerator<
    ParamAgentArgumentValue extends CorrespondingJSType = undefined,
    ParamAgentResponseValue = undefined,
    ReturnTypeAgentArgumentValue extends CorrespondingJSType = undefined,
    ReturnTypeAgentResponseValue = undefined
> = (
    namedParams: Named<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>
    >[],
    returnType: CandidValueAndMeta<
        ReturnTypeAgentArgumentValue,
        ReturnTypeAgentResponseValue
    >,
    methodName: string
) => string;

export type TestsGenerator<
    ParamAgentArgumentValue extends CorrespondingJSType = undefined,
    ParamAgentResponseValue = undefined,
    ReturnTypeAgentArgumentValue extends CorrespondingJSType = undefined,
    ReturnTypeAgentResponseValue = undefined
> = (
    methodName: string,
    namedParams: Named<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>
    >[],
    returnType: CandidValueAndMeta<
        ReturnTypeAgentArgumentValue,
        ReturnTypeAgentResponseValue
    >
) => Test[][];

export type QueryOrUpdateConstraints = {
    name?: string;
};

export function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}

export function generateMethodImplementation<
    ParamType extends CorrespondingJSType,
    ParamAgentType,
    ReturnType extends CandidReturnType,
    ReturnAgentType
>(
    namedParams: Named<CandidValueAndMeta<ParamType, ParamAgentType>>[],
    returnType: CandidValueAndMeta<ReturnType, ReturnAgentType>,
    generateBody: BodyGenerator<
        ParamType,
        ParamAgentType,
        ReturnType,
        ReturnAgentType
    >,
    functionName: string,
    inspectMessage?: boolean
): string {
    const paramNames = namedParams
        .map((namedParam) => {
            return `${namedParam.name}: ${namedParam.value.src.typeAnnotation}`;
        })
        .join(', ');

    const body = generateBody(namedParams, returnType, functionName);

    if (inspectMessage === true) {
        return `(methodName: string, ...args: any[]): ${returnType.src.typeAnnotation} {${body}}`;
    }

    return `(${paramNames}): ${returnType.src.typeAnnotation} {${body}}`;
}
