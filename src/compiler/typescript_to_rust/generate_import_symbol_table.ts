import { SymbolTable, SymbolTables } from '../utils/types';
import * as ts from 'typescript';

const FILES_OF_INTEREST = [
    '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/canister_methods/import_coverage.ts'
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/azle_wrapper.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/fruit.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/deep/deep.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/deep/deeper.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/deep/deepest.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/deep/shallow.ts',
    // '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/index.ts'
];

const timing = true;
const verbose = false;
let debug = false;

export function generateImportSymbolTable(files: string[]): SymbolTables {
    if (timing) {
        return generateImportSymbolTableTimed(files);
    }
    return files.reduce((accumulator: SymbolTables, filename: string) => {
        accumulator[filename] = createSymbolTableFromFileName(filename);
        return accumulator;
    }, {});
}

export function generateImportSymbolTableTimed(files: string[]): SymbolTables {
    const processingTimes: number[] = []; // Array to store processing times

    const symbolTables = files.reduce(
        (accumulator: SymbolTables, filename: string) => {
            const startTime = Date.now(); // Start timing for each file
            accumulator[filename] = createSymbolTableFromFileName(filename);
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

function createSymbolTableFromFileName(filename: string): SymbolTable {
    const sourceFilePath = filename;
    const program = ts.createProgram([sourceFilePath], {});
    const sourceFile = program.getSourceFile(sourceFilePath);

    if (!sourceFile) {
        return createEmptySymbolTable();
    }

    const tsSymbolTable = getSymbolTable(filename, program);
    if (tsSymbolTable) {
        const symbolTable = createSymbolTable(tsSymbolTable, program);
        if (FILES_OF_INTEREST.includes(filename) && false) {
            console.log('Symbol Table for:');
            console.log(filename);
            console.log(symbolTable);
        }
        return symbolTable;
    }

    return createEmptySymbolTable();
}

function createSymbolTable(
    tsSymbolTable: ts.SymbolTable,
    program: ts.Program
): SymbolTable {
    const keys = tsSymbolTable.keys();
    let symbolTable = createEmptySymbolTable();
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
        //  TODO there was no value declaration on the source file symbol. I
        //  don't understand what the value declaration is or under what
        //  circumstances we wouldn't have it
        return;
    }

    if (!('locals' in valueDeclaration)) {
        // TODO there was no symbol table in the source file symbol
        return;
    }

    return valueDeclaration.locals as ts.SymbolTable; // TODO I am not 100% sure that this is a valid cast
}

function getSymbolTable(
    filename: string,
    program: ts.Program
): ts.SymbolTable | undefined {
    const sourceFile = program.getSourceFile(filename);
    if (!sourceFile) {
        // TODO could not get source file from filename
        return;
    }
    return getSymbolTableFromSourceFile(sourceFile, program);
}

function createSingleEntrySymbolTable(
    originalName: ts.__String,
    name: ts.__String
): SymbolTable | undefined {
    const symbolTable = createEmptySymbolTable();
    try {
        const key = stringToSymbolTableKey(name);
        symbolTable[key].push(originalName as string);
        return symbolTable;
    } catch {
        // TODO the key isn't part of the azle symbol table
        return;
    }
}

function getAzleEquivalent(
    originalName: ts.__String,
    name: ts.__String, // TODO should this be a ts.__String?
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): SymbolTable | undefined {
    if (moduleSpecifier.text === 'azle') {
        return createSingleEntrySymbolTable(originalName, name);
    }
    const tsType = getTsTypeForImportDecl(moduleSpecifier, program);
    if (tsType) {
        const exports = tsType.symbol.exports;
        if (!exports) {
            return; // If the source doesn't export anything then what it can't export anything from azle
        }
        const symbol = exports.get(name as ts.__String);
        if (symbol) {
            return processSymbol(originalName, symbol, program);
        } else {
            // TODO we couldn't find the symbol in the symbol table for this file
            // What might have happened is that it came from a export * from 'thing'
            // Get all of the * exports
            // get the symbol tables for all of those and check which one has the name we are looking for
            // The order of operations is
            // 1) if there is something in the symbol table it will override anything from a * import
            // 2) if there are two things from two different * exports then that will cause a compiler error
            return findSymbolInStarExportsFromModule(
                originalName,
                name,
                moduleSpecifier,
                program
            );
        }
    }
    return;
}

function findSymbolInStarExportsFromModule(
    originalName: ts.__String,
    name: ts.__String,
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): SymbolTable | undefined {
    // TODO WORK HERE
    // Get sourcefile from module specifier
    const typeChecker = program.getTypeChecker();
    const namespacedSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
    for (const exportDeclaration of namespacedSymbol?.exports?.get(
        '__export' as ts.__String
    )?.declarations ?? []) {
        if (ts.isExportDeclaration(exportDeclaration)) {
            // Get the module specifiers from export
            const exportModSpecifier = exportDeclaration.moduleSpecifier;
            if (exportModSpecifier && ts.isStringLiteral(exportModSpecifier)) {
                if (exportModSpecifier.text === 'azle') {
                    return createSingleEntrySymbolTable(originalName, name);
                }
                // Get each symbol table from each module specifier
                const symbolTable = getSymbolTableForModuleSpecifier(
                    exportModSpecifier,
                    program
                );
                if (symbolTable) {
                    // Check to see if the symbol is in that symbol table
                    let symbol = symbolTable.get(name);
                    if (symbol) {
                        // Process the symbol
                        return processSymbol(originalName, symbol, program);
                    }
                }
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
    const name = getNameFromSpecifier(specifier);
    const declaration = getDeclarationFromSpecifier(specifier);

    if (declaration.moduleSpecifier !== undefined) {
        return getAzleEquivalent(
            originalName,
            name as ts.__String,
            declaration.moduleSpecifier as ts.StringLiteral,
            program
        );
    }
}

function getNameFromSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier
): string {
    if (!specifier.propertyName) {
        return specifier.name.text;
    } else {
        return specifier.propertyName.text;
    }
}

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
    const name = getNameFromSpecifier(exportSpecifier);
    const sourceFile = getSourceFile(exportSpecifier);
    if (sourceFile) {
        const symbolTable = getSymbolTableFromSourceFile(sourceFile, program);
        if (symbolTable) {
            const symbol = symbolTable.get(name as ts.__String);
            if (symbol) {
                const result = processSymbol(originalName, symbol, program);
                if (result) {
                    if (exportSpecifier.propertyName) {
                        return renameSymbolTable(
                            result,
                            exportSpecifier.name.text
                        );
                    }
                    return result;
                }
            }
        }
    }
}

function processExportAssignment(
    originalName: ts.__String,
    declaration: ts.ExportAssignment,
    program: ts.Program
): SymbolTable | undefined {
    const exportAssignment = declaration as ts.ExportAssignment;
    const exportName = exportAssignment.expression as ts.Identifier;
    // We need to look that up in the locals
    const sourceFile = exportAssignment.parent;
    if (!('locals' in sourceFile)) {
        // TODO what if there is no locals
        return;
    }
    const symbolTable = sourceFile.locals as ts.SymbolTable;
    const symbol = symbolTable.get(exportName.text as ts.__String);
    if (!symbol) {
        return; // TODO can't find symbol
    }
    return processSymbol(originalName, symbol, program);
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
    const importDeclaration = declaration.parent;
    const thing = getAzleEquivalent(
        originalName,
        'default' as ts.__String,
        importDeclaration.moduleSpecifier as ts.StringLiteral,
        program
    );
    return thing;
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

function getProgram(node: ts.Node): ts.Program | undefined {
    let sourceFile = getSourceFile(node);
    if (sourceFile) {
        if ('program' in sourceFile) {
            return sourceFile.program as ts.Program;
        }
    }
}

function processTypeAliasDeclaration(
    originalName: ts.__String,
    declaration: ts.TypeAliasDeclaration,
    program: ts.Program
): SymbolTable | undefined {
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
    const namespacedSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
    if (!namespacedSymbol) {
        return;
    }
    return namespacedSymbol.exports;
}

function processExportDeclaration(
    declaration: ts.ExportDeclaration,
    program: ts.Program
): SymbolTable | undefined {
    const moduleSpecifier = declaration.moduleSpecifier;
    if (!moduleSpecifier || !ts.isStringLiteral(moduleSpecifier)) {
        console.log("I'm not sure if this is going to be true in this case");
        // Unreachable: An export declaration with a namespace export will always have a FromClause
        // https://262.ecma-international.org/13.0/#sec-exports
        return;
    }
    if (declaration.exportClause) {
        console.log(
            'I think if we get an export clause then we should be handling this' +
                "somewhere else. I only want things like export * from 'thing'"
        );
        return;
    }
    if (moduleSpecifier.text == 'azle') {
        return createDefaultSymbolTable();
    }
    const namespacedSymbolTable = getSymbolTableForDeclaration(
        declaration,
        program
    );
    if (!namespacedSymbolTable) {
        return;
    }
    return createSymbolTable(namespacedSymbolTable, program);
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
        createSymbolTable(namespacedSymbolTable, program),
        namespace
    );
}

function prependNamespaceToSymbolTable(
    symbolTable: SymbolTable,
    namespace: ts.NamespaceImport | ts.NamespaceExport
): SymbolTable {
    const prependString = namespace.name.text;
    for (const propertyName in symbolTable) {
        const propertyValue = symbolTable[propertyName as keyof SymbolTable];
        if (Array.isArray(propertyValue)) {
            for (let i = 0; i < propertyValue.length; i++) {
                propertyValue[i] = `${prependString}.${propertyValue[i]}`;
            }
        }
    }
    return symbolTable;
}

function renameSymbolTable(
    symbolTable: SymbolTable,
    newPrefix: string
): SymbolTable {
    for (const propertyName in symbolTable) {
        const propertyValue = symbolTable[propertyName as keyof SymbolTable];
        if (Array.isArray(propertyValue)) {
            for (let i = 0; i < propertyValue.length; i++) {
                const indexOfDotOperator = propertyValue[i].indexOf('.');
                if (indexOfDotOperator !== -1) {
                    propertyValue[i] = propertyValue[i].replace(
                        /^[^.]+/,
                        newPrefix
                    );
                }
            }
        }
    }
    return symbolTable;
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

function processSymbol(
    originalName: ts.__String,
    symbol: ts.Symbol,
    program: ts.Program
): SymbolTable | undefined {
    // if (debug) {
    //     console.log(`we are debugging ${symbol.name}`);
    // }
    const declarations = symbol.declarations;
    if (!declarations) {
        console.log("I guess we don't have declarations");
        return; // We need one declaration. If there isn't one then it can't be an export from azle right?
    }
    if (declarations.length !== 1) {
        // console.log('Did we finally find a long declaration?');
        return; // TODO I don't know what to do if there are multiple declarations
    }
    const declaration = declarations[0];
    if (debug) {
        console.log(`${symbol.name} is ${ts.SyntaxKind[declaration.kind]}`);
    }
    const sourceFile = getSourceFile(declaration);
    const thing = declaration.getText(sourceFile);
    const isSpecifierOfInterest = thing == 'text';
    if (isSpecifierOfInterest) {
        console.log('================================================');
        console.log(`Start debugging for ${thing}`);
        debug = true;
    }
    // if (debug) {
    //     console.log(`This should show for everyone: ${thing}`);
    // }
    // if (sourceFile) {
    //     if (FILES_OF_INTEREST.includes(sourceFile.fileName) && false) {
    //         console.log(`Analyzing: ${ts.SyntaxKind[declaration.kind]}`);
    //         console.log(sourceFile?.fileName);
    //         console.log(declaration.getText(sourceFile));
    //     }
    // }
    switch (declaration.kind) {
        case ts.SyntaxKind.ExportSpecifier:
            // {thing} or {thing as other}
            // as in `export {thing};` or
            // `export {thing as other};`
            const result = processExportSpecifier(
                originalName,
                declaration as ts.ExportSpecifier,
                program
            );
            return result;
        case ts.SyntaxKind.ExportAssignment:
            // export default thing
            // if (debug) {
            //     console.log(
            //         `Export Assignment: ${declaration.getText(sourceFile)}`
            //     );
            // }
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
            // if (debug) {
            //     console.log(
            //         `Import Specifier: ${declaration.getText(sourceFile)}`
            //     );
            // }
            return processImportSpecifier(
                originalName,
                declaration as ts.ImportSpecifier,
                program
            );
        case ts.SyntaxKind.TypeAliasDeclaration:
            // export type AliasName = TypeName;
            // type AliasName = TypeName;
            return;
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
            // Should look like export * from 'place';
            // There are other export declarations, but the only ones that will
            // be a symbol are these unnamed export from clauses
            return processExportDeclaration(
                declaration as ts.ExportDeclaration,
                program
            );
        default:
            if (sourceFile) {
                if (FILES_OF_INTEREST.includes(sourceFile.fileName) && false) {
                    console.log(`MISSING: ${ts.SyntaxKind[declaration.kind]}`);
                    console.log(sourceFile?.fileName);
                    console.log(declaration.getText(sourceFile));
                }
            }
    }
}

function getTsTypeForImportDecl(
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): ts.Type | undefined {
    const importSymbol = program
        .getTypeChecker()
        .getSymbolAtLocation(moduleSpecifier);
    if (importSymbol) {
        const importType = program
            .getTypeChecker()
            .getTypeOfSymbolAtLocation(
                importSymbol,
                importSymbol.valueDeclaration as ts.Node
            );
        return importType.getNonNullableType(); // TODO why are we doing this instead of just returning importType?
    }
    return;
}

function createEmptySymbolTable(): SymbolTable {
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
        case 'func':
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
        case '$serviceQuery':
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
