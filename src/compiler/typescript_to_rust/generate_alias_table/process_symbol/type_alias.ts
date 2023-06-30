import * as ts from 'typescript';
import { AliasTable } from '../../../utils/types';
import {
    getSymbolTable,
    getSymbolTableForDeclaration
} from '../get_symbol_table';
import { getSourceFile, getDeclarationFromNamespace } from '../utils';
import { generateAliasTableForSymbol } from '../process_symbol';

const TYPE_ALIASES_ARE_STILL_UNIMPLEMENTED = true;

export function generateAliasTableForTypeAliasDeclaration(
    typeAliasDeclaration: ts.TypeAliasDeclaration,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    if (TYPE_ALIASES_ARE_STILL_UNIMPLEMENTED) {
        return undefined; // TODO Add support for type alias declarations
        // The below code doesn't work, but it's hopefully a good starting point
    }
    if (typeAliasDeclaration.typeParameters?.length ?? 0 > 0) {
        return undefined; // This looks like a candid definition not a possible azle alias
    }
    const sourceFile = getSourceFile(typeAliasDeclaration);
    if (sourceFile === undefined) {
        // TODO couldn't find the sourceFile
        return undefined;
    }
    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable === undefined) {
        // TODO couldn't get a symbol table
        return undefined;
    }
    const typeReference = typeAliasDeclaration.type;
    if (ts.isTypeReferenceNode(typeReference)) {
        const typeName = typeReference.typeName;
        if (ts.isQualifiedName(typeName)) {
            const left = typeName.left;
            if (ts.isIdentifier(left)) {
                const leftSymbol = symbolTable.get(left.text as ts.__String);
                if (leftSymbol === undefined) {
                    return undefined;
                }
                if (leftSymbol.declarations?.length != 1) {
                    return undefined;
                }
                const namespace = leftSymbol.declarations[0];
                if (!ts.isNamespaceImport(namespace)) {
                    return undefined;
                }
                const declaration = getDeclarationFromNamespace(namespace);
                const declSymbolTable = getSymbolTableForDeclaration(
                    declaration,
                    program
                );
                if (declSymbolTable === undefined) {
                    // TODO there is no namespace symbol table
                    return undefined;
                }
                const symbol = declSymbolTable?.get(
                    typeName.right.text as ts.__String
                );
                if (symbol === undefined) {
                    // TODO there is no symbol
                    return undefined;
                }
                return generateAliasTableForSymbol(symbol, alias, program);
            }
            // TODO what to do if the left isn't an identifier
            return undefined;
        }
        if (ts.isIdentifier(typeName)) {
            const symbol = symbolTable.get(typeName.text as ts.__String);
            if (symbol === undefined) {
                // TODO Couldn't find symbol
                return undefined;
            }
            return generateAliasTableForSymbol(symbol, alias, program);
        }
    }
    // TODO what else could this be??
}
