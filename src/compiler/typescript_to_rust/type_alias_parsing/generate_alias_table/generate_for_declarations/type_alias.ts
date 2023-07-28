import * as ts from 'typescript';
import * as aliasTable from '../';
import {
    getSymbolTableForEntityName,
    getSymbolTableForExpression,
    getSymbolTableForNode
} from '../../utils/get_symbol_table';
import { isAzleKeywordExpression, isNullKeyword } from '../../utils';
import { AliasTable, GenerationType } from '../../types';
import { getSymbol } from '../../utils/get_symbol';

const ROBUST_TYPE_ALIASES_IMPLEMENTED = false;

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

export function generateForTypeAliasDeclaration(
    typeAliasDeclaration: ts.TypeAliasDeclaration,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    if (isAzleKeywordExpression(typeAliasDeclaration)) {
        if (generationType === 'LIST') return aliasTable.DEFAULT; // TODO https://github.com/demergent-labs/azle/issues/1136
        return aliasTable.generateSingleEntryAliasTable(
            typeAliasDeclaration.name.text,
            alias
        );
    }

    const aliasedType = typeAliasDeclaration.type;

    const aliasTableResult = checkForAndGenerateAliasTableForPrimitives(
        aliasedType,
        alias
    );

    if (aliasTableResult !== 'NOTHING_TO_RETURN') {
        return aliasTableResult;
    }

    if (
        !shouldGenerateAliasTableAsTypeReference(
            typeAliasDeclaration,
            aliasedType,
            generationType
        )
    ) {
        return null;
    }

    return generateAliasTableForTypeRef(
        typeAliasDeclaration,
        alias,
        program,
        generationType
    );
}

function generateAliasTableForTypeRef(
    typeAliasDeclaration: ts.TypeAliasDeclaration,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    const aliasedType = typeAliasDeclaration.type;
    if (!ts.isTypeReferenceNode(aliasedType)) {
        return null;
    }

    const symbolTable = getSymbolTableForNode(typeAliasDeclaration, program);
    if (symbolTable === undefined) {
        return null;
    }
    const typeName = aliasedType.typeName;
    if (ts.isIdentifier(typeName)) {
        return generateForIdentifier(
            typeName,
            alias,
            symbolTable,
            program,
            generationType
        );
    }
    // typeName is a QualifiedName
    const declSymbolTable = getSymbolTableForEntityName(
        typeName.left,
        symbolTable,
        program
    );
    if (declSymbolTable === undefined) {
        return null;
    }
    return generateForIdentifier(
        typeName.right,
        alias,
        declSymbolTable,
        program,
        generationType
    );
}

function shouldGenerateAliasTableAsTypeReference(
    typeAliasDeclaration: ts.TypeAliasDeclaration,
    aliasedType: ts.TypeNode,
    generationType: GenerationType
): boolean {
    // We do not yet have azle types that map to these types
    const isIgnorable =
        aliasedType.kind === ts.SyntaxKind.FunctionType ||
        aliasedType.kind === ts.SyntaxKind.UnionType;
    if (isIgnorable) {
        return false;
    }

    if (!ts.isTypeReferenceNode(aliasedType)) {
        return false;
    }

    // For the alias table we want to include generics like
    // `type MyRecordDecorator<T> = azle.Record<T>;` and not things like
    // `type MyRecord = azle.Record<{}>;`
    // For alias list we want to include both
    if (
        generationType === 'TABLE' &&
        !isGeneric(typeAliasDeclaration, aliasedType)
    ) {
        return false;
    }

    return true;
}

function checkForAndGenerateAliasTableForPrimitives(
    aliasedType: ts.TypeNode,
    alias: string
): AliasTable | null | 'NOTHING_TO_RETURN' {
    if (aliasedType.kind === ts.SyntaxKind.BooleanKeyword) {
        return aliasTable.generateSingleEntryAliasTable('bool', alias);
    }

    if (isNullKeyword(aliasedType)) {
        return aliasTable.generateSingleEntryAliasTable('null', alias);
    }

    if (aliasedType.kind === ts.SyntaxKind.StringKeyword) {
        return aliasTable.generateSingleEntryAliasTable('text', alias);
    }

    if (aliasedType.kind === ts.SyntaxKind.BigIntKeyword) {
        return aliasTable.generateSingleEntryAliasTable('int', alias);
    }

    if (aliasedType.kind === ts.SyntaxKind.NumberKeyword) {
        return aliasTable.generateSingleEntryAliasTable('float64', alias);
    }

    if (aliasedType.kind === ts.SyntaxKind.VoidKeyword) {
        return aliasTable.generateSingleEntryAliasTable('void', alias);
    }

    return 'NOTHING_TO_RETURN';
}

export function generateForVariableDeclaration(
    variableDeclaration: ts.VariableDeclaration,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    if (isAzleKeywordExpression(variableDeclaration)) {
        // I'm not sure this is possible. Isn't the only way we could run into
        // this is when parsing the actual azle file? Otherwise it's always
        // going to come from an import declaration not a variable declaration
        if (generationType === 'LIST') return aliasTable.DEFAULT; //TODO https://github.com/demergent-labs/azle/issues/1136
        return aliasTable.generateSingleEntryAliasTable(
            variableDeclaration.name.getText(),
            alias
        );
    }

    const expression = variableDeclaration.initializer;
    if (expression === undefined) {
        return null;
    }

    const symbolTable = getSymbolTableForNode(expression, program);
    if (symbolTable === undefined) {
        return null;
    }

    if (ts.isIdentifier(expression)) {
        return generateForIdentifier(
            expression,
            alias,
            symbolTable,
            program,
            generationType
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
            return null;
        }
        return generateForIdentifier(
            expression.name,
            alias,
            declSymbolTable,
            program,
            generationType
        );
    }
    if (ts.isStringLiteral(expression) || ts.isNewExpression(expression)) {
        // We do not yet have azle types that map to these types
        return null;
    }
    // The expression is something we haven't planned on
    return null;
}

/**
 * Are the type arguments and the type params arrays the same length and are
 * each element equal.
 *
 * @param declaration
 * @returns
 */
function isGeneric(
    declaration: ts.TypeAliasDeclaration,
    aliasedType: ts.TypeReferenceNode
): boolean {
    const typeParams = (declaration.typeParameters ?? []).map(
        (typeParam) => typeParam.name.text
    );
    const typeArguments = aliasedType.typeArguments ?? [];
    if (typeArguments.length !== typeParams.length) {
        return false;
    }
    const typeArgsAreGenerics = typeArguments.every((typeArgument) => {
        return (
            ts.isTypeReferenceNode(typeArgument) &&
            ts.isIdentifier(typeArgument.typeName) &&
            typeParams.includes(typeArgument.typeName.text)
        );
    });
    return typeArgsAreGenerics;
}

function generateForIdentifier(
    ident: ts.Identifier | ts.MemberName,
    alias: string,
    symbolTable: ts.SymbolTable,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    if (generationType === 'LIST' && !ROBUST_TYPE_ALIASES_IMPLEMENTED) {
        // TODO get rid of this if block it when working on
        // https://github.com/demergent-labs/azle/issues/1116
        // The feature in that ticket will not work if this is still here
        const symbol = symbolTable.get(ident.text as ts.__String);
        if (symbol === undefined) {
            return null;
        }
        return aliasTable.generateForSymbol(
            symbol,
            alias,
            program,
            generationType
        );
    }
    const symbol = getSymbol(ident.text, symbolTable, program);
    if (symbol === undefined) {
        // Couldn't find symbol
        return null;
    }
    return aliasTable.generateForSymbol(symbol, alias, program, generationType);
}
