// TODO this file should be removed as soon as the robust imports epic is completed
import { AliasTables, AliasTable } from '../../utils/types';
import { Program } from 'typescript';

export const FILES_OF_INTEREST = [
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

export const timing = false;
const verbose = false;
export let debug: { print: boolean } = { print: false };

export function generateTimedResults(
    files: string[],
    funcToTime: (filename: string, program: Program) => AliasTable | undefined,
    program: Program
): AliasTables {
    const processingTimes: number[] = []; // Array to store processing times

    const aliasTables = files.reduce(
        (accumulator: AliasTables, filename: string) => {
            const startTime = Date.now(); // Start timing for each file
            const result = funcToTime(filename, program);
            if (result) accumulator[filename] = result;
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
        `Processing ${files.length} files took ${totalProcessingTime}ms`
    );
    console.log(`Min time: ${Math.min(...processingTimes)}ms`);
    console.log(`Max time: ${Math.max(...processingTimes)}ms`);
    console.log(`Mean processing time: ${meanProcessingTime.toFixed(2)}ms`);
    console.log(`Median processing time: ${medianProcessingTime}ms`);
    console.log(`Mode processing time: ${modeProcessingTime}ms`);

    return aliasTables;
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
