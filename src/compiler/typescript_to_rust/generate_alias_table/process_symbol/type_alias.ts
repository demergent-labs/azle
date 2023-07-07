// IMPORTANT: Nothing from here is used right now. (https://github.com/demergent-labs/azle/issues/1092)
import * as ts from 'typescript';
import { AliasTable } from '../../../utils/types';
import {
    getSymbolTable,
    getSymbolTableForDeclaration,
    getSymbolTableForModuleSpecifier
} from '../get_symbol_table';
import {
    getSourceFile,
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getUnderlyingIdentifierFromSpecifier
} from '../utils';
import { generateAliasTableForSymbol } from '../process_symbol';
import { generateSingleEntryAliasTable } from '../alias_table';

function isAzleTypeAliasDecl(
    typeAliasDeclaration: ts.TypeAliasDeclaration
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

// Get all of the * exports
// get the symbol tables for all of those and check which one has the name we are looking for
function get_the_default_symbol_table(
    key_to_find: string,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    if (!symbolTable.has('__export' as ts.__String)) {
        console.log('There arent any star exports');
    }
    for (const exportDeclaration of symbolTable.get('__export' as ts.__String)
        ?.declarations ?? []) {
        console.log('We are looking at an export decl');
        if (!ts.isExportDeclaration(exportDeclaration)) {
            // All of the declarations under __export should be __export. This
            // check is here only to be super explicit
            console.log(10);
            continue;
        }
        // Get the module specifiers from export
        const exportModSpecifier = exportDeclaration.moduleSpecifier;
        if (
            exportModSpecifier === undefined ||
            !ts.isStringLiteral(exportModSpecifier)
        ) {
            // If we don't have an export module specifier or it's not a string
            // literal then it can't have the name in it. We can continue
            // looking
            console.log(11);
            continue;
        }
        // TODO something is wrong here. It ought to be checking the name right?
        const symbolTable = getSymbolTableForModuleSpecifier(
            exportModSpecifier,
            program
        );
        if (symbolTable === undefined) {
            // If we couldn't find the symbol table then we won't be able to
            // find the name it it
            console.log(12);
            continue;
        }
        if (!symbolTable.has(key_to_find as ts.__String)) {
            // If this export declaration's module's symbol table does have the
            // name we are looking for then move on to the next one
            console.log(13);
            continue;
        }
        return symbolTable;
    }
    // return undefined (Couldn't find it)
    console.log(`Couldn't find ${key_to_find} in any of the symbol tables`);
    return undefined;
}

function get_symbol_for_right_side(
    rightText: string,
    symbol_table: ts.SymbolTable,
    program: ts.Program
): ts.Symbol | undefined {
    const rightSymbol = symbol_table.get(rightText as ts.__String);
    if (rightSymbol === undefined) {
        // We couldn't find the symbol. There is a chance it's in a start export. Look through all of them to see
        console.log(`Couldn't find ${rightText} in any of the symbol tables`);
        console.log(symbol_table);
        return get_the_default_symbol_table(
            rightText,
            symbol_table,
            program
        )?.get(rightText as ts.__String);
    }
    return rightSymbol;
}

function get_special_table(
    left: ts.EntityName,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    if (ts.isIdentifier(left)) {
        const leftSymbol = symbolTable.get(left.text as ts.__String);
        if (leftSymbol === undefined) {
            console.log(2);
            return undefined;
        }
        if (leftSymbol.declarations?.length != 1) {
            console.log(3);
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
            let result = getSymbolTableForDeclaration(
                importDeclaration,
                program
            );
            const identifier =
                getUnderlyingIdentifierFromSpecifier(declaration);
            const leftSymbol = result?.get(identifier.text as ts.__String);
            if (leftSymbol === undefined) {
                console.log(2);
                return undefined;
            }
            if (leftSymbol.declarations?.length != 1) {
                console.log(3);
                return undefined;
            }
            const subdeclaration = leftSymbol.declarations[0];
            // NOTE: My assumption here is that the only way you can get a left hand
            // side of a qualified name that would resolved back to azle is if it's
            // some sort of import declaration
            if (ts.isNamespaceExport(subdeclaration)) {
                const importDeclaration =
                    getDeclarationFromNamespace(subdeclaration);
                return getSymbolTableForDeclaration(importDeclaration, program);
            }
            console.log(
                `>>>>>>>> HERE WITH: ${ts.SyntaxKind[subdeclaration.kind]}`
            );
        }
        console.log(`>>>>>>>> HERE WITH: ${ts.SyntaxKind[declaration.kind]}`);
        // TODO are there other types of imports that could be here?
    }
    if (ts.isQualifiedName(left)) {
        let symbol_table = get_special_table(left.left, symbolTable, program);
        if (symbol_table === undefined) {
            console.log(4);
            return undefined;
        }
        const rightSymbol = get_symbol_for_right_side(
            left.right.text,
            symbol_table,
            program
        );
        if (rightSymbol === undefined) {
            console.log(5);
            return undefined;
        }
        if (rightSymbol.declarations?.length != 1) {
            console.log(6);
            return undefined;
        }
        const namespace = rightSymbol.declarations[0];
        // NOTE: My assumption here is that the only way you can get a qualified
        // name that could resolve back to azle is if it's part of a namespace
        // import or export
        if (
            !ts.isNamespaceImport(namespace) &&
            !ts.isNamespaceExport(namespace)
        ) {
            console.log(`>>>>>>>> HERE WITH: ${ts.SyntaxKind[namespace.kind]}`);
            return undefined;
        }
        const declaration = getDeclarationFromNamespace(namespace);
        const declSymbolTable = getSymbolTableForDeclaration(
            declaration,
            program
        );
        return declSymbolTable;
    }
    // Unreachable ts.EntityName = ts.Identifier | ts.QualifiedName
}

export function generateAliasTableForTypeAliasDeclaration(
    typeAliasDeclaration: ts.TypeAliasDeclaration,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    if (isAzleTypeAliasDecl(typeAliasDeclaration)) {
        // TODO I'm not sure that this is right
        // TODO test that we can make aliases to all sorts of azle types
        console.log(`${alias} is a ${typeAliasDeclaration.name.text}`);
        return generateSingleEntryAliasTable(
            typeAliasDeclaration.name.text,
            alias
        );
    }
    // if (TYPE_ALIASES_ARE_STILL_UNIMPLEMENTED) {
    //     return undefined; // TODO Add support for type alias declarations
    //     // The below code doesn't work, but it's hopefully a good starting point
    // }
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
    const sourceFile = getSourceFile(typeAliasDeclaration);
    if (sourceFile === undefined) {
        // TODO couldn't find the sourceFile
        return undefined;
    }

    console.log(`============= ${alias} ================`);
    console.log(typeAliasDeclaration.name.text);
    console.log(typeAliasDeclaration.getText(sourceFile));
    if (typeAliasDeclaration.typeParameters) {
        console.log(typeAliasDeclaration.typeParameters.length);
    }
    if (alias === 'RejectionCode') {
        console.log(typeAliasDeclaration);
    }
    const typeReference = typeAliasDeclaration.type;
    if (ts.isTypeReferenceNode(typeReference)) {
        const symbolTable = getSymbolTable(sourceFile, program);
        if (symbolTable === undefined) {
            // TODO couldn't get a symbol table
            return undefined;
        }
        const typeName = typeReference.typeName;
        if (ts.isQualifiedName(typeName)) {
            const declSymbolTable = get_special_table(
                typeName.left,
                symbolTable,
                program
            );
            if (declSymbolTable === undefined) {
                console.log('THERE WAS NO SYMBOL TABLE');
                // TODO there is no namespace symbol table
                return undefined;
            }
            const symbol = declSymbolTable?.get(
                typeName.right.text as ts.__String
            );
            console.log('Found the symbol');
            if (symbol === undefined) {
                // TODO there is no symbol
                return undefined;
            }
            console.log('Generating symbol table');
            return generateAliasTableForSymbol(symbol, alias, program);
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
        // TODO we do not yet have azle types that map to these types
        return undefined;
    }
    console.log('>>>>>>>>>>>>>>>>>>>>IMPORTANT<<<<<<<<<<<<<<<<<<<<');
    console.log(ts.SyntaxKind[typeReference.kind]);
    console.log('===============================================');
    console.log('===============================================');
    console.log('===============================================');
    console.log('===============================================');
    // TODO what else could this be??
}
