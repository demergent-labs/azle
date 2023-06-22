import { SymbolTable, SymbolTables } from '../utils/types';
import * as ts from 'typescript';

const FILES_OF_INTEREST = [
    '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/canister_methods/azle_coverage.ts',
    '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/azle_coverage/azle_coverage.ts'
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/azle_wrapper.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/fruit.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/deep/deep.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/deep/deeper.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/deep/deepest.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/deep/shallow.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/index.ts'
];

const timing = false;
const verbose = false;
const typeAliasesAreStillUnimplemented = true;
let debug = false;

export function generateImportSymbolTable(files: string[]): SymbolTables {
    if (timing) {
        return generateImportSymbolTableTimed(files);
    }
    return files.reduce((accumulator: SymbolTables, filename: string) => {
        accumulator[filename] = createAzleSymbolTable(filename);
        return accumulator;
    }, {});
}

export function generateImportSymbolTableTimed(files: string[]): SymbolTables {
    const processingTimes: number[] = []; // Array to store processing times

    const symbolTables = files.reduce(
        (accumulator: SymbolTables, filename: string) => {
            const startTime = Date.now(); // Start timing for each file
            accumulator[filename] = createAzleSymbolTable(filename);
            const endTime = Date.now(); // End timing for each file
            const processingTime = endTime - startTime; // Calculate processing time in milliseconds
            processingTimes.push(processingTime); // Store processing time

            return accumulator;
        },
        {}
    );

    // Print individual file processing times
    if (verbose) {
        console.log('File processing times:');
        files.forEach((filename, index) => {
            console.log(`${filename}: ${processingTimes[index]}ms`);
        });
    }

    // Calculate mean, median, and mode of processing times
    const totalProcessingTime = processingTimes.reduce(
        (total, time) => total + time,
        0
    );
    const meanProcessingTime = totalProcessingTime / files.length;
    const sortedProcessingTimes = [...processingTimes].sort((a, b) => a - b);
    const medianProcessingTime =
        sortedProcessingTimes[Math.floor(files.length / 2)];
    const modeProcessingTime = getMode(sortedProcessingTimes);

    // Print summary report
    console.log('--- Summary ---');
    console.log(
        `Processing ${files.length} files took ${totalProcessingTime / 1000}s`
    );
    console.log(`Min time: ${Math.min(...processingTimes)}`);
    console.log(`Max time: ${Math.max(...processingTimes)}`);
    console.log(`Mean processing time: ${meanProcessingTime.toFixed(2)}ms`);
    console.log(`Median processing time: ${medianProcessingTime}ms`);
    console.log(`Mode processing time: ${modeProcessingTime}ms`);

    return symbolTables;
}

// Helper function to calculate mode of an array
function getMode(arr: number[]): number {
    const counts = new Map<number, number>();
    let maxCount = 0;
    let mode = 0;

    for (const num of arr) {
        counts.set(num, (counts.get(num) || 0) + 1);
        const thing = counts.get(num);
        if (thing && thing > maxCount) {
            maxCount = thing;
            mode = num;
        }
    }

    return mode;
}

function createAzleSymbolTable(filename: string): SymbolTable {
    const sourceFilePath = filename;
    const program = ts.createProgram([sourceFilePath], {});
    const sourceFile = program.getSourceFile(sourceFilePath);

    if (!sourceFile) {
        return createEmptyAzleSymbolTable();
    }

    const tsSymbolTable = getSymbolTable(filename, program);
    if (tsSymbolTable) {
        const symbolTable = toAzleSymbolTable(tsSymbolTable, program);
        return symbolTable;
    }

    return createEmptyAzleSymbolTable();
}

function toAzleSymbolTable(
    tsSymbolTable: ts.SymbolTable,
    program: ts.Program
): SymbolTable {
    let symbolTable = createEmptyAzleSymbolTable();
    tsSymbolTable.forEach((symbol, name) => {
        const subSymbolTable = processSymbol(name, symbol, program);
        if (subSymbolTable) {
            symbolTable = mergeSymbolTables(symbolTable, subSymbolTable);
        }
    });
    return symbolTable;
}

function getSymbolTableFromSourceFile(
    sourceFile: ts.SourceFile,
    program: ts.Program
): ts.SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const sourceFileSymbol = typeChecker.getSymbolAtLocation(sourceFile);

    if (!sourceFileSymbol) {
        // TODO could not make source file symbol from source file
        return;
    }

    const valueDeclaration = sourceFileSymbol.valueDeclaration;

    if (!valueDeclaration) {
        //  There was no value declaration on the source file symbol. I
        //  don't understand what the value declaration is or under what
        //  circumstances we wouldn't have it
        return;
    }

    if (!('locals' in valueDeclaration)) {
        // There was no symbol table in the source file symbol
        return;
    }

    return valueDeclaration.locals as ts.SymbolTable;
}

function getSymbolTable(
    filename: string,
    program: ts.Program
): ts.SymbolTable | undefined {
    const sourceFile = program.getSourceFile(filename);
    if (!sourceFile) {
        // Could not get source file from filename
        return;
    }
    return getSymbolTableFromSourceFile(sourceFile, program);
}

function createSingleEntrySymbolTable(
    originalName: ts.__String,
    name: ts.__String
): SymbolTable | undefined {
    const symbolTable = createEmptyAzleSymbolTable();
    try {
        const key = stringToSymbolTableKey(name);
        symbolTable[key].push(originalName as string);
        return symbolTable;
    } catch {
        // The key isn't part of the azle symbol table
        return;
    }
}

// TODO make a better name for this
// What is this doing? Where all are we calling it?
// It's called from import/export specifier and from import clause
// The process symbol does a similar thing
// Here we are getting a module. And finding the name in the module so we can get it's symbol
function getAzleEquivalent(
    originalName: ts.__String,
    name: ts.__String, // TODO should this be a ts.__String or a string?
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): SymbolTable | undefined {
    if (moduleSpecifier.text === 'azle') {
        return createSingleEntrySymbolTable(originalName, name);
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
    originalName: ts.__String,
    name: ts.__String,
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): SymbolTable | undefined {
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

function getDeclarationFromSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier
): ts.ImportDeclaration | ts.ExportDeclaration {
    if (ts.isImportSpecifier(specifier)) {
        return specifier.parent.parent.parent;
    } else {
        return specifier.parent.parent;
    }
}

function getDeclarationFromNamespace(
    namespace: ts.NamespaceImport | ts.NamespaceExport
): ts.ImportDeclaration | ts.ExportDeclaration {
    if (ts.isNamespaceImport(namespace)) {
        return namespace.parent.parent;
    } else {
        return namespace.parent;
    }
}

function processImportExportSpecifierWithModuleSpecifier(
    originalName: ts.__String,
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    program: ts.Program
): SymbolTable | undefined {
    const identifier = getUnderlyingIdentifierFromSpecifier(specifier);
    const declaration = getDeclarationFromSpecifier(specifier);

    if (declaration.moduleSpecifier !== undefined) {
        return getAzleEquivalent(
            originalName,
            identifier.text as ts.__String,
            declaration.moduleSpecifier as ts.StringLiteral,
            program
        );
    }
}

function getUnderlyingIdentifierFromSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier
): ts.Identifier {
    // e.g. 'thing' in '{thing}' or '{thing as other}'. 'thing' is the symbol we
    // care about. At this point we don't care what it got renamed to, only what
    // it resolves back to.
    if (!specifier.propertyName) {
        // If there is no property name then it was NOT renamed
        return specifier.name;
    } else {
        // If there is a propertyName then it WAS renamed and the property name is the original name before it was renamed
        return specifier.propertyName;
    }
}

// {thing} or {thing as other}
// as in `export {thing};` or
// `export {thing as other};`
function processExportSpecifier(
    originalName: ts.__String,
    exportSpecifier: ts.ExportSpecifier,
    program: ts.Program
): SymbolTable | undefined {
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
    const symbolTable = getSymbolTableFromSourceFile(sourceFile, program);
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
        return renameSymbolTable(result, exportSpecifier.name.text);
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
    originalName: ts.__String,
    exportAssignment: ts.ExportAssignment,
    program: ts.Program
): SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(exportAssignment.expression);
    if (symbol) {
        return processSymbol(originalName, symbol, program);
    }
}

function processImportSpecifier(
    originalName: ts.__String,
    declaration: ts.ImportSpecifier,
    program: ts.Program
): SymbolTable | undefined {
    return processImportExportSpecifierWithModuleSpecifier(
        originalName,
        declaration,
        program
    );
}

function processImportClause(
    originalName: ts.__String,
    declaration: ts.ImportClause,
    program: ts.Program
): SymbolTable | undefined {
    return getAzleEquivalent(
        originalName,
        'default' as ts.__String,
        declaration.parent.moduleSpecifier as ts.StringLiteral,
        program
    );
}

function getSourceFile(node: ts.Node): ts.SourceFile | undefined {
    if (!node.parent) {
        return;
    }
    if (ts.isSourceFile(node.parent)) {
        return node.parent;
    }
    return getSourceFile(node.parent);
}

function getSymbolTableForNamespace(
    namespace: ts.NamespaceImport | ts.NamespaceExport,
    program: ts.Program
): ts.SymbolTable | undefined {
    const declaration = getDeclarationFromNamespace(namespace);
    return getSymbolTableForDeclaration(declaration, program);
}

// For Import/Export Declarations of namespace exports
function getSymbolTableForDeclaration(
    declaration: ts.ExportDeclaration | ts.ImportDeclaration,
    program: ts.Program
): ts.SymbolTable | undefined {
    if (!declaration.moduleSpecifier) {
        // Unreachable: An export declaration with a namespace export will always have a FromClause
        // https://262.ecma-international.org/13.0/#sec-exports
        return;
    }
    return getSymbolTableForModuleSpecifier(
        declaration.moduleSpecifier as ts.StringLiteral,
        program
    );
}

function getSymbolTableForModuleSpecifier(
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): ts.SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
    if (!symbol) {
        return;
    }
    return symbol.exports;
}

// My expectation is that this will only be called for export declarations in the form:
// `export * from 'thing'`
// My understanding is all other export declarations will be processed in other
// functions because they will fall into the more specific export clause or
// export specifier cases
function processExportDeclarations(
    declarations: ts.ExportDeclaration[],
    program: ts.Program
): SymbolTable | undefined {
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
            return createDefaultSymbolTable();
        }
        const symbolTable = getSymbolTableForDeclaration(declaration, program);
        if (!symbolTable) {
            return;
        }
        return toAzleSymbolTable(symbolTable, program);
    });
    let symbolTable = createEmptyAzleSymbolTable();
    symbolTables.forEach((subSymbolTable) => {
        if (subSymbolTable) {
            symbolTable = mergeSymbolTables(symbolTable, subSymbolTable);
        }
    });
    return symbolTable;
}

function processNamespaceImportExport(
    namespace: ts.NamespaceImport | ts.NamespaceExport,
    program: ts.Program
): SymbolTable | undefined {
    const importDeclaration = getDeclarationFromNamespace(namespace);
    const moduleSpecifier =
        importDeclaration.moduleSpecifier as ts.StringLiteral;
    if (moduleSpecifier.text == 'azle') {
        // TODO process this symbol table the same, then modify it such that every entry has name.whatever
        return prependNamespaceToSymbolTable(
            createDefaultSymbolTable(),
            namespace
        );
    }
    const namespacedSymbolTable = getSymbolTableForNamespace(
        namespace,
        program
    );
    if (!namespacedSymbolTable) {
        return;
    }
    // process this symbol table the same, then modify it such that every entry has name.whatever
    return prependNamespaceToSymbolTable(
        toAzleSymbolTable(namespacedSymbolTable, program),
        namespace
    );
}

function prependNamespaceToSymbolTable(
    symbolTable: SymbolTable,
    namespace: ts.NamespaceImport | ts.NamespaceExport
): SymbolTable {
    const prependString = namespace.name.text;
    return Object.entries(symbolTable).reduce(
        (acc, [propertyName, propertyValue]) => {
            acc[propertyName as keyof SymbolTable] = propertyValue.map(
                (value) => `${prependString}.${value}`
            );
            return acc;
        },
        {} as SymbolTable
    );
}

function renameSymbolTable(
    symbolTable: SymbolTable,
    newPrefix: string
): SymbolTable {
    return Object.entries(symbolTable).reduce(
        (acc, [propertyName, propertyValue]) => {
            acc[propertyName as keyof SymbolTable] = propertyValue.map(
                (value) => {
                    const indexOfDotOperator = value.indexOf('.');
                    if (indexOfDotOperator !== -1) {
                        return value.replace(/^[^.]+/, newPrefix);
                    }
                    return value;
                }
            );
            return acc;
        },
        {} as SymbolTable
    );
}

function mergeSymbolTables(
    symbolTable1: SymbolTable,
    symbolTable2: SymbolTable
): SymbolTable {
    const mergedSymbolTable: SymbolTable = { ...symbolTable1 };

    for (const propertyName in symbolTable2) {
        const propertyValue2 = symbolTable2[propertyName as keyof SymbolTable];
        const existingPropertyValue =
            mergedSymbolTable[propertyName as keyof SymbolTable];

        if (
            Array.isArray(existingPropertyValue) &&
            Array.isArray(propertyValue2)
        ) {
            mergedSymbolTable[propertyName as keyof SymbolTable] =
                existingPropertyValue.concat(propertyValue2);
        } else {
            mergedSymbolTable[propertyName as keyof SymbolTable] =
                propertyValue2;
        }
    }

    return mergedSymbolTable;
}

// TODO this feels very janky to me. Is there a better way of determining this?
function isAzleSymbol(symbol: ts.Symbol): boolean {
    if ('parent' in symbol) {
        const parent = symbol.parent as ts.Symbol;
        if (parent) {
            if ((parent.name as string).includes('azle/src/lib/index')) {
                return true;
            }
        }
    }
    return false;
}

function processSymbol(
    originalName: ts.__String,
    symbol: ts.Symbol,
    program: ts.Program
): SymbolTable | undefined {
    if (isAzleSymbol(symbol)) {
        return createSingleEntrySymbolTable(
            originalName,
            symbol.name as ts.__String
        );
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

function createEmptyAzleSymbolTable(): SymbolTable {
    return {
        alias: [],
        call_result: [],
        blob: [],
        bool: [],
        empty: [],
        float32: [],
        float64: [],
        func: [],
        guard_result: [],
        heartbeat_decorator: [],
        init_decorator: [],
        inspect_message_decorator: [],
        int: [],
        int8: [],
        int16: [],
        int32: [],
        int64: [],
        manual: [],
        nat: [],
        nat8: [],
        nat16: [],
        nat32: [],
        nat64: [],
        null: [],
        oneway_mode: [],
        opt: [],
        post_upgrade_decorator: [],
        pre_upgrade_decorator: [],
        principal: [],
        query_decorator: [],
        query_mode: [],
        record: [],
        reserved: [],
        service: [],
        service_query_decorator: [],
        service_update_decorator: [],
        stable_b_tree_map: [],
        text: [],
        tuple: [],
        update_decorator: [],
        update_mode: [],
        variant: [],
        vec: [],
        void: []
    };
}

function createDefaultSymbolTable(): SymbolTable {
    return {
        alias: ['Alias'],
        blob: ['blob'],
        bool: [],
        call_result: ['CallResult'],
        empty: ['empty'],
        float32: ['float32'],
        float64: ['float64'],
        func: ['Func'],
        guard_result: ['GuardResult'],
        heartbeat_decorator: ['$heartbeat'],
        init_decorator: ['$init'],
        inspect_message_decorator: ['$inspectMessage'],
        int: ['int'],
        int8: ['int8'],
        int16: ['int16'],
        int32: ['int32'],
        int64: ['int64'],
        manual: ['Manual'],
        nat: ['nat'],
        nat8: ['nat8'],
        nat16: ['nat16'],
        nat32: ['nat32'],
        nat64: ['nat64'],
        null: [],
        oneway_mode: ['Oneway'],
        opt: ['Opt'],
        post_upgrade_decorator: ['$postUpgrade'],
        pre_upgrade_decorator: ['$preUpgrade'],
        principal: ['Principal'],
        query_decorator: ['$query'],
        query_mode: ['Query'],
        record: ['Record'],
        reserved: ['reserved'],
        service: ['Service'],
        service_query_decorator: ['serviceQuery'],
        service_update_decorator: ['serviceUpdate'],
        stable_b_tree_map: ['StableBTreeMap'],
        text: ['text'],
        tuple: ['Tuple'],
        update_decorator: ['$update'],
        update_mode: ['Update'],
        variant: ['Variant'],
        vec: ['Vec'],
        void: []
    };
}

function stringToSymbolTableKey(name: ts.__String): keyof SymbolTable {
    switch (name) {
        case 'Alias':
            return 'alias';
        case 'CallResult':
            return 'call_result';
        case 'blob':
            return 'blob';
        case 'bool':
            return 'bool';
        case 'empty':
            return 'empty';
        case 'float32':
            return 'float32';
        case 'float64':
            return 'float64';
        case 'Func':
            return 'func';
        case 'GuardResult':
            return 'guard_result';
        case '$heartbeat':
            return 'heartbeat_decorator';
        case '$init':
            return 'init_decorator';
        case '$inspectMessage':
            return 'inspect_message_decorator';
        case 'int':
            return 'int';
        case 'int8':
            return 'int8';
        case 'int16':
            return 'int16';
        case 'int32':
            return 'int32';
        case 'int64':
            return 'int64';
        case 'Manual':
            return 'manual';
        case 'nat':
            return 'nat';
        case 'nat8':
            return 'nat8';
        case 'nat16':
            return 'nat16';
        case 'nat32':
            return 'nat32';
        case 'nat64':
            return 'nat64';
        case 'null':
            return 'null';
        case 'Oneway':
            return 'oneway_mode';
        case 'Opt':
            return 'opt';
        case '$postUpgrade':
            return 'post_upgrade_decorator';
        case '$preUpgrade':
            return 'pre_upgrade_decorator';
        case 'Principal':
            return 'principal';
        case '$query':
            return 'query_decorator';
        case 'Query':
            return 'query_mode';
        case 'Record':
            return 'record';
        case 'reserved':
            return 'reserved';
        case 'Service':
            return 'service';
        case 'serviceQuery':
            return 'service_query_decorator';
        case 'serviceUpdate':
            return 'service_update_decorator';
        case 'StableBTreeMap':
            return 'stable_b_tree_map';
        case 'text':
            return 'text';
        case 'Tuple':
            return 'tuple';
        case '$update':
            return 'update_decorator';
        case 'Update':
            return 'update_mode';
        case 'Variant':
            return 'variant';
        case 'Vec':
            return 'vec';
        case 'void':
            return 'void';
        default:
            throw `IMPORTANT: We couldn't find ${name}`;
    }
}

function processTypeAliasDeclaration(
    originalName: ts.__String,
    declaration: ts.TypeAliasDeclaration,
    program: ts.Program
): SymbolTable | undefined {
    if (typeAliasesAreStillUnimplemented) {
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
    const symbolTable = getSymbolTableFromSourceFile(sourceFile, program);
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
                const namespaceSymbolTable = getSymbolTableForNamespace(
                    namespace,
                    program
                );
                if (!namespaceSymbolTable) {
                    // TODO there is no namespace symbol table
                    return;
                }
                const symbol = namespaceSymbolTable?.get(
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
