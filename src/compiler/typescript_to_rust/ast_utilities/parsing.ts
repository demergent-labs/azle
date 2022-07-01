import { AST, Fn, Item, Struct } from './types';
import { Rust } from '../../../types';
import { parseFile } from 'azle-syn';

export function parse(ast: Rust): AST {
    return JSON.parse(parseFile(ast));
}

export function parseRustItem(item: Rust): Item {
    return parse(item).items[0];
}

export function parseRustFunc(func: Rust): Fn {
    return parseRustItem(func).fn as Fn;
}

export function parseRustFuncAttrs(attrs: Rust): any[] {
    return parseRustFunc(`
        ${attrs}
        fn dummy() {}
    `).attrs as any[];
}

export function parseRustFuncOutput(output: Rust): any {
    return parseRustFunc(`fn dummy() -> ${output} {}`).output;
}

export function parseRustStruct(struct: Rust): Struct {
    return parseRustItem(struct).struct as Struct;
}

export function parseRustMacros(macro: Rust): any[] {
    return parseRustStruct(`
        ${macro}
        struct Dummy {}
    `).attrs as any[];
}
