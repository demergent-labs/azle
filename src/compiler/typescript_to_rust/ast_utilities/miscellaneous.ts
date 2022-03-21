import {
    AST,
    Impl,
    ImplItem,
    ImplItemMethod
} from './types';

export function getImpls(ast: AST): Impl[] {
    return ast
        .items
        .map((item) => item.impl)
        .filter((impl) => impl !== undefined) as Impl[];
}

export function getImplItemMethods(impl: Impl): ImplItemMethod[] {
    return impl
        .items
        .map((implItem) => implItem.method)
        .filter((implItemMethod) => implItemMethod !== undefined) as ImplItemMethod[];
}