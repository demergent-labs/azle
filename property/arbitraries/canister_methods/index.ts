import fc from 'fast-check';

import { Named } from '../..';
import { Test } from '../../test';
import { CandidReturnType } from '../candid/candid_return_type_arb';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { Api } from '../types';

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
    >
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

export type MethodImplementationLocation = 'INLINE' | 'STANDALONE';

export type CanisterMethodConstraints = {
    methodImplementationLocation?: MethodImplementationLocation;
};

export type QueryOrUpdateConstraints = {
    methodImplementationLocation?: MethodImplementationLocation;
    name?: string;
};

export const MethodImplementationLocationArb =
    fc.constantFrom<MethodImplementationLocation>('INLINE', 'STANDALONE');

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
    methodImplementationLocation: MethodImplementationLocation,
    methodName: string,
    api: Api
): string {
    const paramNames = namedParams
        .map((namedParam) => {
            if (api === 'functional') {
                return namedParam.name;
            }
            return `${namedParam.name}: ${namedParam.value.src.typeAnnotation}`;
        })
        .join(', ');

    const body = generateBody(namedParams, returnType);

    if (api === 'class') {
        return `(${paramNames}): ${returnType.src.typeAnnotation} {${body}}`;
    }

    if (methodImplementationLocation === 'INLINE') {
        return `(${paramNames}) => {${body}}`;
    }

    const paramNamesAndTypes = namedParams
        .map((namedParam) => `${namedParam.name}: any`) // TODO: Use actual candid type, not any
        .join(', ');

    return `function ${methodName}(${paramNamesAndTypes}): any {${body}}`; // TODO: Use actual candid type, not any
}
