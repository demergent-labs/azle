import { IDL } from '@icp-sdk/core/candid';

import { DidVisitor, VisitorData, VisitorResult } from '../did_visitor';
import { extractCandid } from '../extract_candid';

/**
 * @internal
 * Visitor for function types in Candid generation.
 */
export function visitFunc(
    t: IDL.FuncClass,
    didVisitor: DidVisitor,
    data: VisitorData
): VisitorResult {
    const argsTypes = t.argTypes.map((value) =>
        value.accept(didVisitor, { ...data, isOnService: false })
    );
    const candidArgs = extractCandid(argsTypes);
    const retsTypes = t.retTypes.map((value) =>
        value.accept(didVisitor, { ...data, isOnService: false })
    );
    const candidRets = extractCandid(retsTypes);
    const args = candidArgs[0].join(', ');
    const rets = candidRets[0].join(', ');
    const annotations = getValidFuncAnnotations(t.annotations);
    const annon = annotations.length === 0 ? '' : ` ${annotations.join(' ')}`;
    return [
        `${data.isOnService ? '' : 'func '}(${args}) -> (${rets})${annon}`,
        { ...candidArgs[1], ...candidRets[1] }
    ];
}

type FuncAnnotation = 'query' | 'oneway';

function getValidFuncAnnotations(
    annotations: string[] | undefined
): FuncAnnotation[] {
    if (annotations === undefined) {
        return [];
    }

    if (Array.isArray(annotations) === false) {
        throw new Error('IDL function annotations must be an array of strings');
    }

    const invalidAnnotations = annotations.filter(
        (annotation) => isSupportedFuncAnnotation(annotation) === false
    );
    if (invalidAnnotations.length > 0) {
        const formattedInvalidAnnotations = invalidAnnotations
            .map(formatInvalidAnnotation)
            .join(', ');
        throw new Error(
            `Invalid Candid function annotations: ${formattedInvalidAnnotations}`
        );
    }

    return annotations.filter(isSupportedFuncAnnotation);
}

function isSupportedFuncAnnotation(
    annotation: string
): annotation is FuncAnnotation {
    if (annotation === 'query') {
        return true;
    }
    if (annotation === 'oneway') {
        return true;
    }
    return false;
}

function formatInvalidAnnotation(annotation: string): string {
    if (annotation === '') {
        return "'' (empty string)";
    }
    return annotation;
}
