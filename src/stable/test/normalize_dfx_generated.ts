import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export function normalizeDfxGeneratedFiles(
    generatedDirectoryPath: string = join(
        process.cwd(),
        'test',
        'dfx_generated'
    )
): void {
    if (existsSync(generatedDirectoryPath) === false) {
        return;
    }

    getDfxGeneratedFilePaths(generatedDirectoryPath).forEach(
        normalizeDfxGeneratedFile
    );
}

function getDfxGeneratedFilePaths(directoryPath: string): string[] {
    return readdirSync(directoryPath, { withFileTypes: true }).flatMap(
        (directoryEntry) => {
            const entryPath = join(directoryPath, directoryEntry.name);

            if (directoryEntry.isDirectory() === true) {
                return getDfxGeneratedFilePaths(entryPath);
            }

            if (
                entryPath.endsWith('.d.ts') === true ||
                entryPath.endsWith('.js') === true
            ) {
                return [entryPath];
            }

            return [];
        }
    );
}

function normalizeDfxGeneratedFile(filePath: string): void {
    const file = readFileSync(filePath, 'utf-8');
    const normalizedFile = getImportReplacements(filePath).reduce(
        (currentFile, [from, to]) => {
            return currentFile.replaceAll(from, to);
        },
        file
    );

    if (normalizedFile === file) {
        return;
    }

    writeFileSync(filePath, normalizedFile);
}

function getImportReplacements(filePath: string): [string, string][] {
    if (filePath.endsWith('.d.ts') === true) {
        return [
            ['@dfinity/agent', '@icp-sdk/core/agent'],
            ['@dfinity/candid', '@icp-sdk/core/candid'],
            ['@dfinity/principal', '@icp-sdk/core/principal']
        ];
    }

    if (filePath.endsWith('.js') === true) {
        return [['@dfinity/agent', '@icp-sdk/core/agent']];
    }

    return [];
}
