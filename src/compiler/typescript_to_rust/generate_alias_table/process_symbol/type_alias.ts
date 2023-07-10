import * as ts from 'typescript';
import { AliasTable } from '../../../utils/types';
import {
    getSymbolTableForNode,
    getSymbolTableForDeclaration,
    getSymbolTableForModuleSpecifier
} from '../get_symbol_table';
import {
    getSourceFile,
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getUnderlyingIdentifierFromSpecifier,
    getStarExportModuleSpecifierFor
} from '../utils';
import { generateAliasTableForIdentifier } from '../process_symbol';
import { generateSingleEntryAliasTable } from '../alias_table';

function isAzleKeywordExpression(
    typeAliasDeclaration: ts.TypeAliasDeclaration | ts.VariableDeclaration
): boolean {
    let sourceFile = getSourceFile(typeAliasDeclaration);
    if (!sourceFile) {
        return false;
    }
    return sourceFile.fileName.includes('azle/src/lib');
}

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
        // TODO I'm not sure that this is right
        // TODO test that we can make aliases to all sorts of azle types
        console.log(`${alias} is a ${typeAliasDeclaration.name.text}`);
        return generateSingleEntryAliasTable(
            typeAliasDeclaration.name.text,
            alias
        );
    }
    // if (typeAliasDeclaration.typeParameters?.length ?? 0 > 0) {
    //     return undefined; // This looks like a candid definition not a possible azle alias
    // }
    // TODO if there are typeParameters then can we find the corresponding type arguments and not count them against the being a candidate
    // TODO what if we got the length of the typeParamters and if it was the same as the length of the typearguments then we are good, otherwise return?
    let aliasedType = typeAliasDeclaration.type;
    if (ts.isTypeReferenceNode(aliasedType)) {
        let typeArguments = aliasedType.typeArguments;
        if (typeArguments) {
            if (typeArguments.length > 0) {
                return undefined;
            }
        }
    }

    const typeReference = typeAliasDeclaration.type;
    if (ts.isTypeReferenceNode(typeReference)) {
        const symbolTable = getSymbolTableForNode(
            typeAliasDeclaration,
            program
        );
        if (symbolTable === undefined) {
            // TODO couldn't get a symbol table
            return undefined;
        }
        const typeName = typeReference.typeName;
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
    if (typeReference.kind === ts.SyntaxKind.BooleanKeyword) {
        return generateSingleEntryAliasTable('bool', alias);
    }
    if (typeReference.kind === ts.SyntaxKind.LiteralType) {
        if ('literal' in typeReference) {
            let literal = typeReference.literal;
            if (
                typeof literal === 'object' &&
                literal !== null &&
                'kind' in literal
            ) {
                if (literal.kind === ts.SyntaxKind.NullKeyword) {
                    return generateSingleEntryAliasTable('null', alias);
                }
            }
        }
    }
    if (typeReference.kind === ts.SyntaxKind.StringKeyword) {
        return generateSingleEntryAliasTable('text', alias);
    }
    // TODO (https://github.com/demergent-labs/azle/issues/1099)
    // if (typeReference.kind === ts.SyntaxKind.BigIntKeyword) {
    //     return generateSingleEntryAliasTable('int', alias);
    // }
    if (typeReference.kind === ts.SyntaxKind.NumberKeyword) {
        return generateSingleEntryAliasTable('float64', alias);
    }
    if (typeReference.kind === ts.SyntaxKind.VoidKeyword) {
        return generateSingleEntryAliasTable('void', alias);
    }
    if (
        typeReference.kind === ts.SyntaxKind.FunctionType ||
        typeReference.kind === ts.SyntaxKind.UnionType
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

function getSymbolTableForEntityName(
    left: ts.EntityName,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    if (ts.isIdentifier(left)) {
        return getSymbolTableForLeftIdentifier(left, symbolTable, program);
    }
    if (ts.isQualifiedName(left)) {
        let leftSymbolTable = getSymbolTableForEntityName(
            left.left,
            symbolTable,
            program
        );
        if (leftSymbolTable === undefined) {
            return undefined;
        }
        return getSymbolTableForRightIdentifier(
            left.right,
            leftSymbolTable,
            program
        );
    }
    // Unreachable ts.EntityName = ts.Identifier | ts.QualifiedName
}

function getSymbolTableForExpression(
    left: ts.Expression,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    if (ts.isIdentifier(left)) {
        return getSymbolTableForLeftIdentifier(left, symbolTable, program);
    }
    if (ts.isPropertyAccessExpression(left)) {
        let leftSymbolTable = getSymbolTableForExpression(
            left.expression,
            symbolTable,
            program
        );
        if (leftSymbolTable === undefined) {
            return undefined;
        }
        return getSymbolTableForRightIdentifier(
            left.name,
            leftSymbolTable,
            program
        );
    }
}

function getSymbolTableForRightIdentifier(
    right: ts.Identifier | ts.MemberName,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    const rightSymbol = getSymbolForRightIdentifier(
        right,
        symbolTable,
        program
    );
    if (rightSymbol === undefined) {
        return undefined;
    }
    if (rightSymbol.declarations?.length != 1) {
        return undefined;
    }
    const namespace = rightSymbol.declarations[0];
    // NOTE: My assumption here is that the only way you can get a qualified
    // name that could resolve back to azle is if it's part of a namespace
    // import or export
    if (!ts.isNamespaceImport(namespace) && !ts.isNamespaceExport(namespace)) {
        return undefined;
    }
    const declaration = getDeclarationFromNamespace(namespace);
    return getSymbolTableForDeclaration(declaration, program);
}

function getSymbolTableForLeftIdentifier(
    left: ts.Identifier,
    symbolTable: ts.SymbolTable,
    program: ts.Program
) {
    const leftSymbol = symbolTable.get(left.text as ts.__String);
    if (leftSymbol === undefined) {
        return undefined;
    }
    if (leftSymbol.declarations?.length != 1) {
        return undefined;
    }
    const declaration = leftSymbol.declarations[0];
    // NOTE: My assumption here is that the only way you can get a left hand
    // side of a qualified name that would resolved back to azle is if it's
    // some sort of import declaration
    if (ts.isNamespaceImport(declaration)) {
        const importDeclaration = getDeclarationFromNamespace(declaration);
        return getSymbolTableForDeclaration(importDeclaration, program);
    }
    if (ts.isImportSpecifier(declaration)) {
        const importDeclaration = getDeclarationFromSpecifier(declaration);
        let result = getSymbolTableForDeclaration(importDeclaration, program);
        const identifier = getUnderlyingIdentifierFromSpecifier(declaration);
        const leftSymbol = result?.get(identifier.text as ts.__String);
        if (leftSymbol === undefined) {
            return undefined;
        }
        if (leftSymbol.declarations?.length != 1) {
            return undefined;
        }
        const subDeclaration = leftSymbol.declarations[0];
        // NOTE: My assumption here is that the only way you can get a left hand
        // side of a qualified name that would resolved back to azle is if it's
        // some sort of import declaration
        if (ts.isNamespaceExport(subDeclaration)) {
            const importDeclaration =
                getDeclarationFromNamespace(subDeclaration);
            return getSymbolTableForDeclaration(importDeclaration, program);
        }
    }
    // TODO are there other types of imports that could be here?
}

function getSymbolForRightIdentifier(
    right: ts.Identifier | ts.MemberName,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.Symbol | undefined {
    const rightSymbol = symbolTable.get(right.text as ts.__String);
    if (rightSymbol === undefined) {
        // We couldn't find the symbol. There is a chance it's in a start export. Look through all of them to see
        return getStarExportSymbolTableFor(
            right.text,
            symbolTable,
            program
        )?.get(right.text as ts.__String);
    }
    return rightSymbol;
}

// Get all of the * exports
// get the symbol tables for all of those and check which one has the name we are looking for
function getStarExportSymbolTableFor(
    keyToFind: string,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    const exportModSpecifier = getStarExportModuleSpecifierFor(
        keyToFind,
        symbolTable,
        program
    );

    if (exportModSpecifier === undefined) return undefined;

    return getSymbolTableForModuleSpecifier(exportModSpecifier, program);
}
