import * as ts from 'typescript';
import { Opt } from '../../../lib';

export function getSourceFile(node: ts.Node): Opt<ts.SourceFile> {
    if (ts.isSourceFile(node)) {
        return Opt.Some(node);
    }
    if (!node.parent) {
        // TODO is this an error?
        return Opt.None;
    }
    return getSourceFile(node.parent);
}

export function optify(target: any) {
    return (...args: any[]) => {
        try {
            return target(...args);
        } catch (error: any) {
            if ('None' in error) {
                return error;
            }

            throw error;
        }
    };
}

export function resultify(target: any) {
    return (...args: any[]) => {
        try {
            return target(...args);
        } catch (error: any) {
            if ('Err' in error) {
                return error;
            }

            throw error;
        }
    };
}
