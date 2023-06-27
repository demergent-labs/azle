import * as ts from 'typescript';
import { SymbolTable } from '../../utils/types';
import {
    toAzleSymbolTable,
    generateSingleEntryAzleSymbolTable,
    generateEmptyAzleSymbolTable,
    renameSymbolTable,
    prependNamespaceToSymbolTable,
    generateDefaultAzleSymbolTable,
    mergeSymbolTables
} from './azle_symbol_table';
import {
    getSymbolTable,
    getSymbolTableForDeclaration,
    getSymbolTableForModuleSpecifier
} from './get_symbol_table';
import { getSourceFile } from './utils';
import { FILES_OF_INTEREST } from './debug';
import {
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getUnderlyingIdentifierFromSpecifier
} from './import_export_utils';
import { Result, match, Opt } from '../../../lib';

const typeAliasesAreStillUnimplemented = true;

export function processSymbol(
    originalName: string,
    symbol: ts.Symbol,
    program: ts.Program
): Opt<SymbolTable> {
    if (isAzleSymbol(symbol)) {
        return match(
            generateSingleEntryAzleSymbolTable(originalName, symbol.name),
            {
                Ok: (symbolTable) => Opt.Some(symbolTable),
                Err: () => {
                    return Opt.None;
                }
            }
        );
    }
    const declarations = symbol.declarations;
    if (!declarations || declarations.length === 0) {
        return Opt.None; // We need one declaration. If there isn't one then it can't be an export from azle right?
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
        return Opt.None;
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
            match(sourceFile, {
                Some: (sourcefile) => {
                    if (FILES_OF_INTEREST.includes(sourcefile.fileName)) {
                        console.log(
                            `MISSING: ${ts.SyntaxKind[declaration.kind]}`
                        );
                        console.log(sourcefile?.fileName);
                        console.log(declaration.getText(sourcefile));
                    }
                },
                None: () => {}
            });
    }
    return Opt.None;
}

function processImportExportSpecifierWithModuleSpecifier(
    originalName: string,
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    program: ts.Program
): Opt<SymbolTable> {
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
    return Opt.None;
}

// {thing} or {thing as other}
// as in `export {thing};` or
// `export {thing as other};`
function processExportSpecifier(
    originalName: string,
    exportSpecifier: ts.ExportSpecifier,
    program: ts.Program
): Opt<SymbolTable> {
    const exportDecl = getDeclarationFromSpecifier(exportSpecifier);
    if (exportDecl.moduleSpecifier) {
        return processImportExportSpecifierWithModuleSpecifier(
            originalName,
            exportSpecifier,
            program
        );
    }
    // Symbol is not from another module so we will find it locally
    // TODO investigate trying to get the original symbol from the above identifier.
    // The commented out code bellow just gets the current symbol instead of the
    // symbol that it comes from. So it literally just goes in circles until we
    // run out of heap
    // const symbol = program.getTypeChecker().getSymbolAtLocation(identifier);
    // if (symbol) {
    //     return processSymbol(originalName, symbol, program);
    // }
    // console.log("========> The new way didn't work");
    return match(getSourceFile(exportSpecifier), {
        Some: (sourcefile) =>
            do_thing(originalName, exportSpecifier, sourcefile, program),
        None: () => Opt.None
    });
}

function do_thing(
    originalName: string,
    exportSpecifier: ts.ExportSpecifier,
    sourceFile: ts.SourceFile,
    program: ts.Program
): Opt<SymbolTable> {
    const identifier = getUnderlyingIdentifierFromSpecifier(exportSpecifier);
    const symbolTable = match(getSymbolTable(sourceFile, program), {
        Some: (symboltable) => symboltable,
        None: () => undefined
    });
    if (!symbolTable) {
        return Opt.None;
    }
    const symbol = symbolTable.get(identifier.text as ts.__String);
    if (!symbol) {
        return Opt.None;
    }
    return match(processSymbol(originalName, symbol, program), {
        Some: (result) => {
            if (exportSpecifier.propertyName) {
                return Opt.Some(
                    renameSymbolTable(result, exportSpecifier.name.text)
                );
            }
            return Opt.Some(result);
        },
        None: () => Opt.None
    });
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
): Opt<SymbolTable> {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(exportAssignment.expression);
    if (symbol) {
        return processSymbol(originalName, symbol, program);
    }
    return Opt.None;
}

function processImportSpecifier(
    originalName: string,
    declaration: ts.ImportSpecifier,
    program: ts.Program
): Opt<SymbolTable> {
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
): Opt<SymbolTable> {
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
): Opt<SymbolTable> {
    const symbolTables = declarations.map((declaration) => {
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
            return generateDefaultAzleSymbolTable();
        }
        const symbolTable = match(
            getSymbolTableForDeclaration(declaration, program),
            {
                Some: (symboltable) => symboltable,
                None: () => undefined
            }
        );
        if (!symbolTable) {
            return;
        }
        return toAzleSymbolTable(symbolTable, program);
    });
    let symbolTable = generateEmptyAzleSymbolTable();
    symbolTables.forEach((subSymbolTable) => {
        if (subSymbolTable) {
            symbolTable = mergeSymbolTables(symbolTable, subSymbolTable);
        }
    });
    return Opt.Some(symbolTable);
}

function processNamespaceImportExport(
    namespace: ts.NamespaceImport | ts.NamespaceExport,
    program: ts.Program
): Opt<SymbolTable> {
    const importDeclaration = getDeclarationFromNamespace(namespace);
    const moduleSpecifier =
        importDeclaration.moduleSpecifier as ts.StringLiteral;
    if (moduleSpecifier.text == 'azle') {
        // TODO process this symbol table the same, then modify it such that every entry has name.whatever
        return Opt.Some(
            prependNamespaceToSymbolTable(
                generateDefaultAzleSymbolTable(),
                namespace
            )
        );
    }
    const symbolTable = match(
        getSymbolTableForDeclaration(importDeclaration, program),
        {
            Some: (symboltable) => symboltable,
            None: () => undefined
        }
    );
    if (!symbolTable) {
        return Opt.None;
    }
    // process this symbol table the same, then modify it such that every entry has name.whatever
    return Opt.Some(
        prependNamespaceToSymbolTable(
            toAzleSymbolTable(symbolTable, program),
            namespace
        )
    );
}

function processTypeAliasDeclaration(
    originalName: string,
    declaration: ts.TypeAliasDeclaration,
    program: ts.Program
): Opt<SymbolTable> {
    if (typeAliasesAreStillUnimplemented) {
        return Opt.None; // TODO Add support for type alias declarations
        // The below code doesn't work, but it's hopefully a good starting point
    }
    if (declaration.typeParameters?.length ?? 0 > 0) {
        return Opt.None; // This looks like a candid definition not a possible azle alias
    }
    const sourceFile = match(getSourceFile(declaration), {
        Some: (sourcefile) => {
            return sourcefile;
        },
        None: () => undefined
    });
    if (!sourceFile) {
        // TODO couldn't find the sourceFile
        return Opt.None;
    }
    const symbolTable = match(getSymbolTable(sourceFile, program), {
        Some: (symboltable) => symboltable,
        None: () => undefined
    });
    if (!symbolTable) {
        // TODO couldn't get a symbol table
        return Opt.None;
    }
    const typeReference = declaration.type;
    if (ts.isTypeReferenceNode(typeReference)) {
        const typeName = typeReference.typeName;
        if (ts.isQualifiedName(typeName)) {
            const left = typeName.left;
            if (ts.isIdentifier(left)) {
                const leftSymbol = symbolTable.get(left.text as ts.__String);
                if (!leftSymbol) {
                    return Opt.None;
                }
                if (leftSymbol.declarations?.length != 1) {
                    return Opt.None;
                }
                const namespace = leftSymbol.declarations[0];
                if (!ts.isNamespaceImport(namespace)) {
                    return Opt.None;
                }
                const declaration = getDeclarationFromNamespace(namespace);
                const namespaceSymbolTable = match(
                    getSymbolTableForDeclaration(declaration, program),
                    {
                        Some: (symbolTable) => symbolTable,
                        None: () => undefined
                    }
                );
                if (!namespaceSymbolTable) {
                    // TODO there is no namespace symbol table
                    return Opt.None;
                }
                const symbol = namespaceSymbolTable?.get(
                    typeName.right.text as ts.__String
                );
                if (!symbol) {
                    // TODO there is no symbol
                    return Opt.None;
                }
                return processSymbol(originalName, symbol, program);
            }
            // TODO what to do if the left isn't an identifier
            return Opt.None;
        }
        if (ts.isIdentifier(typeName)) {
            const symbol = symbolTable.get(typeName.text as ts.__String);
            if (!symbol) {
                // TODO Couldn't find symbol
                return Opt.None;
            }
            return processSymbol(originalName, symbol, program);
        }
    }
    // TODO what else could this be??
    return Opt.None;
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
): Opt<SymbolTable> {
    if (moduleSpecifier.text === 'azle') {
        return match(generateSingleEntryAzleSymbolTable(originalName, name), {
            Ok: (symbolTable) => Opt.Some(symbolTable),
            Err: () => {
                return Opt.None;
            }
        });
    }
    const symbolTable = match(
        getSymbolTableForModuleSpecifier(moduleSpecifier, program),
        { Some: (symboltable) => symboltable, None: () => undefined }
    );
    if (!symbolTable) {
        return Opt.None;
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
): Opt<SymbolTable> {
    const symbolTable = match(
        getSymbolTableForModuleSpecifier(moduleSpecifier, program),
        {
            Some: (symboltable) => {
                return symboltable;
            },
            None: () => undefined
        }
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
    // return None (Couldn't find it)
    return Opt.None;
}
