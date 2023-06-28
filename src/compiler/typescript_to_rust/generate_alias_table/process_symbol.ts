import * as ts from 'typescript';
import { AliasTable } from '../../utils/types';
import {
    generateAliasTableFromSymbolTable,
    generateSingleEntryAliasTable,
    generateEmptyAliasTable,
    renameAliasTable,
    prependNamespaceToAliasTable,
    generateDefaultAliasTable,
    mergeAliasTables
} from './alias_table';
import {
    getSymbolTable,
    getSymbolTableForDeclaration,
    getSymbolTableForModuleSpecifier
} from './get_symbol_table';
import { FILES_OF_INTEREST } from './debug';
import {
    getSourceFile,
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getUnderlyingIdentifierFromSpecifier
} from './utils';

const TYPE_ALIASES_ARE_STILL_UNIMPLEMENTED = true;

export function processSymbol(
    originalName: string,
    symbol: ts.Symbol,
    program: ts.Program
): AliasTable | undefined {
    if (isAzleSymbol(symbol)) {
        return generateSingleEntryAliasTable(originalName, symbol.name);
    }
    const declarations = symbol.declarations;
    if (!declarations || declarations.length === 0) {
        return; // We need one declaration. If there isn't one then it can't be an export from azle right?
    }
    if (symbol.name === '__export') {
        // Should look like export * from 'place';
        // There are other export declarations, but the only ones that will
        // be a symbol are these unnamed export from clauses
        return processExportDeclarations(
            declarations as ts.ExportDeclaration[],
            program
        );
    }
    if (declarations.length > 1) {
        // TODO what kind of symbol has multiple declarations?
        // TODO is it possible for those declarations to be conflicting?
        return;
    }
    const declaration = declarations[0];
    const sourceFile = getSourceFile(declaration);
    switch (declaration.kind) {
        case ts.SyntaxKind.ExportSpecifier:
            // {thing} or {thing as other}
            // as in `export {thing};` or
            // `export {thing as other};`
            return processExportSpecifier(
                originalName,
                declaration as ts.ExportSpecifier,
                program
            );
        case ts.SyntaxKind.ExportAssignment:
            // export default thing
            return processExportAssignment(
                originalName,
                declaration as ts.ExportAssignment,
                program
            );
        case ts.SyntaxKind.ImportClause:
            // thing
            // as in `import thing from 'place'`
            return processImportClause(
                originalName,
                declaration as ts.ImportClause,
                program
            );
        case ts.SyntaxKind.ImportSpecifier:
            // {thing} or {thing as other}
            // as in `import {thing} from 'place'` or
            // `import {thing as other} from 'place'`
            return processImportSpecifier(
                originalName,
                declaration as ts.ImportSpecifier,
                program
            );
        case ts.SyntaxKind.TypeAliasDeclaration:
            // export type AliasName = TypeName;
            // type AliasName = TypeName;
            return processTypeAliasDeclaration(
                originalName,
                declaration as ts.TypeAliasDeclaration,
                program
            );
        case ts.SyntaxKind.NamespaceImport:
            // import * as thing from 'place'
            return processNamespaceImportExport(
                declaration as ts.NamespaceImport,
                program
            );
        case ts.SyntaxKind.NamespaceExport:
            // export * as thing from 'place';
            return processNamespaceImportExport(
                declaration as ts.NamespaceExport,
                program
            );
        case ts.SyntaxKind.ExportDeclaration:
        // These should be handled above
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.VariableDeclaration:
            break;
        default:
            if (sourceFile) {
                if (FILES_OF_INTEREST.includes(sourceFile.fileName)) {
                    console.log(`MISSING: ${ts.SyntaxKind[declaration.kind]}`);
                    console.log(sourceFile?.fileName);
                    console.log(declaration.getText(sourceFile));
                }
            }
    }
}

function processImportExportSpecifierWithModuleSpecifier(
    originalName: string,
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    program: ts.Program
): AliasTable | undefined {
    const identifier = getUnderlyingIdentifierFromSpecifier(specifier);
    const declaration = getDeclarationFromSpecifier(specifier);

    if (declaration.moduleSpecifier !== undefined) {
        return getAzleEquivalent(
            originalName,
            identifier.text,
            declaration.moduleSpecifier as ts.StringLiteral,
            program
        );
    }
}

// {thing} or {thing as other}
// as in `export {thing};` or
// `export {thing as other};`
function processExportSpecifier(
    originalName: string,
    exportSpecifier: ts.ExportSpecifier,
    program: ts.Program
): AliasTable | undefined {
    const exportDecl = getDeclarationFromSpecifier(exportSpecifier);
    if (exportDecl.moduleSpecifier) {
        return processImportExportSpecifierWithModuleSpecifier(
            originalName,
            exportSpecifier,
            program
        );
    }
    // Symbol is not from another module so we will find it locally
    const identifier = getUnderlyingIdentifierFromSpecifier(exportSpecifier);
    // TODO investigate trying to get the original symbol from the above identifier.
    // The commented out code bellow just gets the current symbol instead of the
    // symbol that it comes from. So it literally just goes in circles until we
    // run out of heap
    // const symbol = program.getTypeChecker().getSymbolAtLocation(identifier);
    // if (symbol) {
    //     return processSymbol(originalName, symbol, program);
    // }
    // console.log("========> The new way didn't work");
    const sourceFile = getSourceFile(exportSpecifier);
    if (!sourceFile) {
        return;
    }
    const symbolTable = getSymbolTable(sourceFile, program);
    if (!symbolTable) {
        return;
    }
    const symbol = symbolTable.get(identifier.text as ts.__String);
    if (!symbol) {
        return;
    }
    const result = processSymbol(originalName, symbol, program);
    if (!result) {
        return;
    }

    if (exportSpecifier.propertyName) {
        return renameAliasTable(result, exportSpecifier.name.text);
    }
    return result;
}

/* stuff to try out
    // TODO play around with this (and I think I saw one more thing, but this is likely the one I thought I saw) for type aliases
    // const symbol = typeChecker.getAliasedSymbol()
    // TODO play around with this where we are trying to create our own fully qualified names
    // const name = typeChecker.getFullyQualifiedName(symbol)
    // TODO play around with this and related functions in processSymbol
    // const thing2 = typeChecker.getExportSymbolOfSymbol(symbol)
*/

function processExportAssignment(
    originalName: string,
    exportAssignment: ts.ExportAssignment,
    program: ts.Program
): AliasTable | undefined {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(exportAssignment.expression);
    if (symbol) {
        return processSymbol(originalName, symbol, program);
    }
}

function processImportSpecifier(
    originalName: string,
    declaration: ts.ImportSpecifier,
    program: ts.Program
): AliasTable | undefined {
    return processImportExportSpecifierWithModuleSpecifier(
        originalName,
        declaration,
        program
    );
}

function processImportClause(
    originalName: string,
    declaration: ts.ImportClause,
    program: ts.Program
): AliasTable | undefined {
    return getAzleEquivalent(
        originalName,
        'default',
        declaration.parent.moduleSpecifier as ts.StringLiteral,
        program
    );
}

// My expectation is that this will only be called for export declarations in the form:
// `export * from 'thing'`
// My understanding is all other export declarations will be processed in other
// functions because they will fall into the more specific export clause or
// export specifier cases
function processExportDeclarations(
    declarations: ts.ExportDeclaration[],
    program: ts.Program
): AliasTable | undefined {
    const aliasTables = declarations.map((declaration) => {
        const moduleSpecifier = declaration.moduleSpecifier;
        if (!moduleSpecifier || !ts.isStringLiteral(moduleSpecifier)) {
            // Unreachable: An export declaration with a namespace export will always have a FromClause
            // https://262.ecma-international.org/13.0/#sec-exports
            return;
        }
        if (declaration.exportClause) {
            // Unreachable: An export declaration with a namespace export will always have an ExportClause
            // https://262.ecma-international.org/13.0/#sec-exports
            return;
        }
        if (moduleSpecifier.text == 'azle') {
            return generateDefaultAliasTable();
        }
        const symbolTable = getSymbolTableForDeclaration(declaration, program);
        if (!symbolTable) {
            return;
        }
        return generateAliasTableFromSymbolTable(symbolTable, program);
    });
    let aliasTable = generateEmptyAliasTable();
    aliasTables.forEach((subAliasTable) => {
        if (subAliasTable) {
            aliasTable = mergeAliasTables(aliasTable, subAliasTable);
        }
    });
    return aliasTable;
}

function processNamespaceImportExport(
    namespace: ts.NamespaceImport | ts.NamespaceExport,
    program: ts.Program
): AliasTable | undefined {
    const importDeclaration = getDeclarationFromNamespace(namespace);
    const moduleSpecifier =
        importDeclaration.moduleSpecifier as ts.StringLiteral;
    if (moduleSpecifier.text == 'azle') {
        // TODO process this symbol table the same, then modify it such that every entry has name.whatever
        return prependNamespaceToAliasTable(
            generateDefaultAliasTable(),
            namespace
        );
    }
    const symbolTable = getSymbolTableForDeclaration(
        importDeclaration,
        program
    );
    if (!symbolTable) {
        return;
    }
    // process this symbol table the same, then modify it such that every entry has name.whatever
    return prependNamespaceToAliasTable(
        generateAliasTableFromSymbolTable(symbolTable, program),
        namespace
    );
}

function processTypeAliasDeclaration(
    originalName: string,
    declaration: ts.TypeAliasDeclaration,
    program: ts.Program
): AliasTable | undefined {
    if (TYPE_ALIASES_ARE_STILL_UNIMPLEMENTED) {
        return; // TODO Add support for type alias declarations
        // The below code doesn't work, but it's hopefully a good starting point
    }
    if (declaration.typeParameters?.length ?? 0 > 0) {
        return; // This looks like a candid definition not a possible azle alias
    }
    const sourceFile = getSourceFile(declaration);
    if (!sourceFile) {
        // TODO couldn't find the sourceFile
        return;
    }
    const symbolTable = getSymbolTable(sourceFile, program);
    if (!symbolTable) {
        // TODO couldn't get a symbol table
        return;
    }
    const typeReference = declaration.type;
    if (ts.isTypeReferenceNode(typeReference)) {
        const typeName = typeReference.typeName;
        if (ts.isQualifiedName(typeName)) {
            const left = typeName.left;
            if (ts.isIdentifier(left)) {
                const leftSymbol = symbolTable.get(left.text as ts.__String);
                if (!leftSymbol) {
                    return;
                }
                if (leftSymbol.declarations?.length != 1) {
                    return;
                }
                const namespace = leftSymbol.declarations[0];
                if (!ts.isNamespaceImport(namespace)) {
                    return;
                }
                const declaration = getDeclarationFromNamespace(namespace);
                const declSymbolTable = getSymbolTableForDeclaration(
                    declaration,
                    program
                );
                if (!declSymbolTable) {
                    // TODO there is no namespace symbol table
                    return;
                }
                const symbol = declSymbolTable?.get(
                    typeName.right.text as ts.__String
                );
                if (!symbol) {
                    // TODO there is no symbol
                    return;
                }
                return processSymbol(originalName, symbol, program);
            }
            // TODO what to do if the left isn't an identifier
            return;
        }
        if (ts.isIdentifier(typeName)) {
            const symbol = symbolTable.get(typeName.text as ts.__String);
            if (!symbol) {
                // TODO Couldn't find symbol
                return;
            }
            return processSymbol(originalName, symbol, program);
        }
    }
    // TODO what else could this be??
}

// TODO this feels very janky to me. Is there a better way of determining this?
function isAzleSymbol(symbol: ts.Symbol): boolean {
    if ('parent' in symbol) {
        const parent = symbol.parent as ts.Symbol;
        if (parent) {
            if (parent.name.includes('azle/src/lib/index')) {
                return true;
            }
        }
    }
    return false;
}

// TODO make a better name for this
// What is this doing? Where all are we calling it?
// It's called from import/export specifier and from import clause
// The process symbol does a similar thing
// Here we are getting a module. And finding the name in the module so we can get it's symbol
function getAzleEquivalent(
    originalName: string,
    name: string, // TODO should this be a ts.__String or a string?
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): AliasTable | undefined {
    if (moduleSpecifier.text === 'azle') {
        return generateSingleEntryAliasTable(originalName, name);
    }
    const symbolTable = getSymbolTableForModuleSpecifier(
        moduleSpecifier,
        program
    );
    if (!symbolTable) {
        return;
    }
    // For any symbol it will be resolved as follows:
    // 1) if there is something in the symbol table it will override anything from a * import
    // 2) if not then the symbol will be in the list of start exports
    //      a) if there are two things from two different * exports then that will cause a compiler error

    // So 1) Start by seeing if the symbol is in the list of exports. If so use that symbol
    const symbol = symbolTable.get(name as ts.__String);
    if (symbol) {
        return processSymbol(originalName, symbol, program);
    } else {
        // We couldn't find the symbol in the symbol table for this file
        // So 2) Check if it came from an `export * from 'thing'` declaration
        return findSymbolInStarExportsFromModule(
            originalName,
            name,
            moduleSpecifier,
            program
        );
    }
}

// Get all of the * exports
// get the symbol tables for all of those and check which one has the name we are looking for
function findSymbolInStarExportsFromModule(
    originalName: string,
    name: string,
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): AliasTable | undefined {
    const symbolTable = getSymbolTableForModuleSpecifier(
        moduleSpecifier,
        program
    );
    for (const exportDeclaration of symbolTable?.get('__export' as ts.__String)
        ?.declarations ?? []) {
        if (ts.isExportDeclaration(exportDeclaration)) {
            // Get the module specifiers from export
            const exportModSpecifier = exportDeclaration.moduleSpecifier;
            if (exportModSpecifier && ts.isStringLiteral(exportModSpecifier)) {
                return getAzleEquivalent(
                    originalName,
                    name,
                    exportModSpecifier,
                    program
                );
            }
        }
    }
    // return undefined (Couldn't find it)
    return;
}
