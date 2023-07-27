import * as ts from 'typescript';
import { AliasTable } from '../';
import {
    getSymbolTableForNode,
    getSymbolTableForEntityName,
    getSymbolTableForExpression
} from '../../utils/get_symbol_table';
import { isNullKeyword, isAzleKeywordExpression } from '../../utils';
import { generateAliasTableForIdentifier } from '../process_symbol';
import { generateSingleEntryAliasTable } from '../alias_table';

/*
export type AzleIntAlias = azle.int;
In this case azle is in the current symbol table and int will be in the symbol table that azle represents
export type DeepIntAlias = deep.azle.int;
deep is in the current symbol table
azle is in deeps symbol table
and int is in azle's symbol table.

So the right is in the left's symbol table
regardless of if its a symbol table or not.
So if we are trying to get that symbol table.

To begin with I have the symbol table with the left most identifier
I have the right most identifier.
step 1, get all the way back to the identifier
step 2, get that symbol from the symbol table we have, look up the next one
*/

export function generateAliasTableForTypeAliasDeclaration(
    typeAliasDeclaration: ts.TypeAliasDeclaration,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    if (isAzleKeywordExpression(typeAliasDeclaration)) {
        // TODO do we even need this?
        return generateSingleEntryAliasTable(
            typeAliasDeclaration.name.text,
            alias
        );
    }

    const aliasedType = typeAliasDeclaration.type;
    if (ts.isTypeReferenceNode(aliasedType)) {
        const typeParams = (typeAliasDeclaration.typeParameters ?? []).map(
            (typeParam) => typeParam.name.text
        );
        const typeArguments = aliasedType.typeArguments ?? [];
        if (typeArguments.length !== typeParams.length) {
            return undefined;
        }
        const typeArgsAreGenerics = typeArguments.every((typeArgument) => {
            return (
                ts.isTypeReferenceNode(typeArgument) &&
                ts.isIdentifier(typeArgument.typeName) &&
                typeParams.includes(typeArgument.typeName.text)
            );
        });
        if (!typeArgsAreGenerics) {
            return undefined;
        }
        const symbolTable = getSymbolTableForNode(
            typeAliasDeclaration,
            program
        );
        if (symbolTable === undefined) {
            // TODO couldn't get a symbol table
            return undefined;
        }
        const typeName = aliasedType.typeName;
        if (ts.isIdentifier(typeName)) {
            return generateAliasTableForIdentifier(
                typeName,
                alias,
                symbolTable,
                program
            );
        }
        if (ts.isQualifiedName(typeName)) {
            const declSymbolTable = getSymbolTableForEntityName(
                typeName.left,
                symbolTable,
                program
            );
            if (declSymbolTable === undefined) {
                return undefined;
            }
            return generateAliasTableForIdentifier(
                typeName.right,
                alias,
                declSymbolTable,
                program
            );
        }
    }
    // TODO make tests for all of these possibilities test all of these
    if (aliasedType.kind === ts.SyntaxKind.BooleanKeyword) {
        return generateSingleEntryAliasTable('bool', alias);
    }
    if (isNullKeyword(aliasedType)) {
        return generateSingleEntryAliasTable('null', alias);
    }
    if (aliasedType.kind === ts.SyntaxKind.StringKeyword) {
        return generateSingleEntryAliasTable('text', alias);
    }
    // TODO (https://github.com/demergent-labs/azle/issues/1099)
    // if (typeReference.kind === ts.SyntaxKind.BigIntKeyword) {
    //     return generateSingleEntryAliasTable('int', alias);
    // }
    if (aliasedType.kind === ts.SyntaxKind.NumberKeyword) {
        return generateSingleEntryAliasTable('float64', alias);
    }
    if (aliasedType.kind === ts.SyntaxKind.VoidKeyword) {
        return generateSingleEntryAliasTable('void', alias);
    }
    if (
        aliasedType.kind === ts.SyntaxKind.FunctionType ||
        aliasedType.kind === ts.SyntaxKind.UnionType
    ) {
        // We do not yet have azle types that map to these types
        return undefined;
    }
    // The type is something we hadn't planned on
}

export function generateAliasTableForVariableDeclaration(
    variableDeclaration: ts.VariableDeclaration,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    if (isAzleKeywordExpression(variableDeclaration)) {
        // TODO I'm not sure this is possible. Isn't the only way we could run
        // into this is when parsing the actual azle file? Otherwise it's always
        // going to come from an import declaration not a variable declaration
        return generateSingleEntryAliasTable(
            variableDeclaration.name.getText(),
            alias
        );
    }

    const expression = variableDeclaration.initializer;
    if (expression === undefined) {
        return undefined;
    }

    const symbolTable = getSymbolTableForNode(expression, program);
    if (symbolTable === undefined) {
        // TODO couldn't get a symbol table
        return undefined;
    }

    if (ts.isIdentifier(expression)) {
        return generateAliasTableForIdentifier(
            expression,
            alias,
            symbolTable,
            program
        );
    }
    if (ts.isPropertyAccessExpression(expression)) {
        // follow all of the property access expression to the very bottom
        const declSymbolTable = getSymbolTableForExpression(
            expression.expression,
            symbolTable,
            program
        );
        if (declSymbolTable === undefined) {
            return undefined;
        }
        return generateAliasTableForIdentifier(
            expression.name,
            alias,
            declSymbolTable,
            program
        );
    }
    if (ts.isStringLiteral(expression) || ts.isNewExpression(expression)) {
        // We do not yet have azle types that map to these types
        return undefined;
    }
    // The expression is something we haven't planned on
    return undefined;
}
