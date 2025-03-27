import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

const TEST_PACKAGE_DIR = join(__dirname, 'test_packages');
const AZLE_ROOT = resolve(__dirname, '..', '..', '..', '..', '..', '..', '..');
const ORIG_PACKAGE_JSON_PATH = join(AZLE_ROOT, 'package.json');
const BACKUP_PACKAGE_JSON_PATH = join(AZLE_ROOT, 'package.json.bak');

type PackageJson = Record<string, unknown>;

/**
 * Removes all previously created test packages from the test package directory.
 */
export async function cleanTestPackages(): Promise<void> {
    // Clean any previous test packages
    const existingPackages = await readdir(TEST_PACKAGE_DIR);
    await Promise.all(
        existingPackages.map((file) =>
            rm(join(TEST_PACKAGE_DIR, file), {
                recursive: true,
                force: true
            })
        )
    );
}

/**
 * Prepares a test package with the specified version
 *
 * @param version - The version string to use for the test package
 */
export async function prepareTestPackage(version: string): Promise<void> {
    await ensureTestPackageDir();

    await backupOriginalPackageJson();

    try {
        await writeTempPackageJson(version);
        npmPack();
    } finally {
        await restoreOriginalPackageJson();
    }
}

/**
 * Ensures that the test package directory exists, creating it if necessary.
 */
async function ensureTestPackageDir(): Promise<void> {
    if (!existsSync(TEST_PACKAGE_DIR)) {
        await mkdir(TEST_PACKAGE_DIR, { recursive: true });
    }
}

/**
 * Creates a backup of the original package.json file to allow for safe restoration
 * after testing is complete.
 */
async function backupOriginalPackageJson(): Promise<void> {
    await copyFile(ORIG_PACKAGE_JSON_PATH, BACKUP_PACKAGE_JSON_PATH);
}

/**
 * Restores the original package.json from the backup and removes the backup file.
 */
async function restoreOriginalPackageJson(): Promise<void> {
    await copyFile(BACKUP_PACKAGE_JSON_PATH, ORIG_PACKAGE_JSON_PATH);
    await rm(BACKUP_PACKAGE_JSON_PATH);
}

/**
 * Creates a temporary package.json file with the specified version number.
 *
 * @param version - The version string to use in the temporary package.json
 */
async function writeTempPackageJson(version: string): Promise<void> {
    const originalPackageJson = await getOriginalPackageJson();

    // Create a temporary package.json with our test version
    const tempPackageJson = { ...originalPackageJson, version };
    await writeFile(
        ORIG_PACKAGE_JSON_PATH,
        JSON.stringify(tempPackageJson, null, 4),
        'utf-8'
    );
}

/**
 * Reads and parses the original package.json file.
 *
 * @returns The parsed package.json object
 */
async function getOriginalPackageJson(): Promise<PackageJson> {
    return JSON.parse(await readFile(ORIG_PACKAGE_JSON_PATH, 'utf-8'));
}

/**
 * Executes the npm pack command to create a tarball of the package.
 * The resulting package is saved to the test package directory.
 */
function npmPack(): void {
    execSync(
        `cd ${AZLE_ROOT} && npm pack --pack-destination ${TEST_PACKAGE_DIR}`
    );
}
