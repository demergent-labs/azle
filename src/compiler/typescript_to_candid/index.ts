import * as tsc from 'typescript';
import { Candid } from '../../types';
import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from './ast_utilities/canister_methods';
import { generateCandidService } from './generators/service';

// TODO seems like what I need to do
// TODO get all Query functions
// TODO get the parameters and return type
// TODO then go find all of the parameters and return type and turn them into Candid

export function compileTypeScriptToCandid(tsPath: string): Candid {
    const program = tsc.createProgram(
        [tsPath],
        {}
    );
    const sourceFiles = program.getSourceFiles();

    const queryMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        'Query'
    );

    const updateMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        'Update'
    );

    // TODO once we have the query and update function nodes, pass them into a function that terms them into a Candid service
    // TODO then pass them into a function that generates all of the Candid types from the params and return values
    // TODO then concatenate the result together

    // const candid = generateCandidFromSourceFiles(sourceFiles);

    // return candid;

    const candidService = generateCandidService(
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations
    );

    return candidService;
}