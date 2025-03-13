#!/usr/bin/env tsx

// import { execSync } from 'child_process';
import { existsSync, readFileSync, statSync } from 'fs';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Project information structure
 */
interface ProjectInfo {
    path: string;
    category: string;
    subcategory: string;
    packageJson: {
        name?: string;
        version?: string;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
    };
    fileCount: number;
    size: number; // Size in bytes
    lastModified: Date;
    features: string[]; // Detected Azle features
}

/**
 * Summary information structure
 */
interface SummaryInfo {
    totalProjects: number;
    categories: Record<string, number>;
    subcategories: Record<string, number>;
    dependencies: {
        name: string;
        count: number;
        projects: string[];
    }[];
    features: {
        name: string;
        count: number;
        projects: string[];
    }[];
    averageFileCount: number;
    averageSize: number; // Size in bytes
    oldestProject: {
        path: string;
        date: Date;
    };
    newestProject: {
        path: string;
        date: Date;
    };
}

/**
 * Detect Azle features used in a project
 *
 * @param projectPath - Path to the project
 * @returns Array of feature names
 */
const detectFeatures = async (projectPath: string): Promise<string[]> => {
    const features: string[] = [];

    try {
        // Look for common file patterns or imports that indicate features
        const sourceFiles = await findSourceFiles(projectPath);

        // Check for common patterns in files
        for (const file of sourceFiles) {
            try {
                const content = readFileSync(file, 'utf8');

                // Detect features based on imports and API usage
                if (content.includes('@azle/stable-b-tree-map'))
                    features.push('stable-b-tree-map');
                if (content.includes('$query') || content.includes('@query'))
                    features.push('query');
                if (content.includes('$update') || content.includes('@update'))
                    features.push('update');
                if (
                    content.includes('ic.call') ||
                    content.includes('ic.notify')
                )
                    features.push('inter-canister-calls');
                if (content.includes('ic.time')) features.push('ic-time');
                if (content.includes('ic.caller')) features.push('ic-caller');
                if (content.includes('ic.trap')) features.push('ic-trap');
                if (content.includes('ic.certified_data'))
                    features.push('certified-data');
                if (content.includes('$init') || content.includes('@init'))
                    features.push('init');
                if (
                    content.includes('$postUpgrade') ||
                    content.includes('@postUpgrade')
                )
                    features.push('post-upgrade');
                if (
                    content.includes('$preUpgrade') ||
                    content.includes('@preUpgrade')
                )
                    features.push('pre-upgrade');
                if (
                    content.includes('$heartbeat') ||
                    content.includes('@heartbeat')
                )
                    features.push('heartbeat');
                if (
                    content.includes('$onLowWasmMemory') ||
                    content.includes('@onLowWasmMemory')
                )
                    features.push('on-low-wasm-memory');
                if (
                    content.includes('$inspectMessage') ||
                    content.includes('@inspectMessage')
                )
                    features.push('inspect-message');
                if (
                    content.includes('http_request') ||
                    content.includes('http_request_update')
                )
                    features.push('http-request');
                if (content.includes('ic.performanceCounter'))
                    features.push('performance-counter');
                if (content.includes('ic.canisterBalance'))
                    features.push('cycles');
                if (
                    content.includes('ic.setTimer') ||
                    content.includes('ic.clearTimer')
                )
                    features.push('timers');
                if (
                    content.includes('ic.call_raw') ||
                    content.includes('ic.notify_raw')
                )
                    features.push('raw-calls');
            } catch (_error) {
                // Skip this file if there's an error reading it
                continue;
            }
        }
    } catch (error) {
        // If there's any error in feature detection, just continue
        console.error(
            `Error detecting features in ${projectPath}: ${error instanceof Error ? error.message : String(error)}`
        );
    }

    return [...new Set(features)]; // Remove duplicates
};

/**
 * Find TypeScript and JavaScript source files in a project
 *
 * @param directory - Directory to search
 * @returns Array of source file paths
 */
const findSourceFiles = async (directory: string): Promise<string[]> => {
    const sourceFiles: string[] = [];

    try {
        const entries = await fs.readdir(directory);

        for (const entry of entries) {
            if (
                entry === 'node_modules' ||
                entry === '.git' ||
                entry === '.dfx' ||
                entry === '.azle'
            ) {
                continue;
            }

            const fullPath = path.join(directory, entry);

            try {
                const stats = statSync(fullPath);

                if (stats.isDirectory()) {
                    const subFiles = await findSourceFiles(fullPath);
                    sourceFiles.push(...subFiles);
                } else if (
                    entry.endsWith('.ts') ||
                    entry.endsWith('.js') ||
                    entry.endsWith('.tsx') ||
                    entry.endsWith('.jsx')
                ) {
                    sourceFiles.push(fullPath);
                }
            } catch (_error) {
                // Skip files with permission issues
                continue;
            }
        }
    } catch (_error) {
        // If directory read fails, return empty array
    }

    return sourceFiles;
};

/**
 * Calculate total size of a directory in bytes
 *
 * @param directory - Directory to calculate size for
 * @returns Size in bytes
 */
const calculateDirectorySize = async (directory: string): Promise<number> => {
    let totalSize = 0;

    try {
        const entries = await fs.readdir(directory);

        for (const entry of entries) {
            if (
                entry === 'node_modules' ||
                entry === '.git' ||
                entry === '.dfx' ||
                entry === '.azle'
            ) {
                continue;
            }

            const fullPath = path.join(directory, entry);

            try {
                const stats = statSync(fullPath);

                if (stats.isDirectory()) {
                    totalSize += await calculateDirectorySize(fullPath);
                } else {
                    totalSize += stats.size;
                }
            } catch (_error) {
                // Skip files with permission issues
                continue;
            }
        }
    } catch (_error) {
        // If directory read fails, return 0
    }

    return totalSize;
};

/**
 * Get the last modified date of a directory (latest of any file)
 *
 * @param directory - Directory to check
 * @returns Last modified date
 */
const getLastModifiedDate = async (directory: string): Promise<Date> => {
    let lastModified = new Date(0); // Start with oldest possible date

    try {
        const entries = await fs.readdir(directory);

        for (const entry of entries) {
            if (
                entry === 'node_modules' ||
                entry === '.git' ||
                entry === '.dfx' ||
                entry === '.azle'
            ) {
                continue;
            }

            const fullPath = path.join(directory, entry);

            try {
                const stats = statSync(fullPath);

                if (stats.isDirectory()) {
                    const subLastModified = await getLastModifiedDate(fullPath);
                    if (subLastModified > lastModified) {
                        lastModified = subLastModified;
                    }
                } else {
                    if (stats.mtime > lastModified) {
                        lastModified = stats.mtime;
                    }
                }
            } catch (_error) {
                // Skip files with permission issues
                continue;
            }
        }
    } catch (_error) {
        // If directory read fails, return current date
        return new Date();
    }

    return lastModified;
};

/**
 * Count files in a directory
 *
 * @param directory - Directory to count files in
 * @returns File count
 */
const countFiles = async (directory: string): Promise<number> => {
    let fileCount = 0;

    try {
        const entries = await fs.readdir(directory);

        for (const entry of entries) {
            if (
                entry === 'node_modules' ||
                entry === '.git' ||
                entry === '.dfx' ||
                entry === '.azle'
            ) {
                continue;
            }

            const fullPath = path.join(directory, entry);

            try {
                const stats = statSync(fullPath);

                if (stats.isDirectory()) {
                    fileCount += await countFiles(fullPath);
                } else {
                    fileCount += 1;
                }
            } catch (_error) {
                // Skip files with permission issues
                continue;
            }
        }
    } catch (_error) {
        // If directory read fails, return 0
    }

    return fileCount;
};

/**
 * Recursively searches for Node.js projects and collects information about them
 *
 * @param directory - The directory to search in
 * @param projects - Array to collect project information
 */
const surveyProjects = async (
    directory: string,
    projects: ProjectInfo[]
): Promise<void> => {
    try {
        // Check if this directory is a Node.js project
        const isNodeProject = existsSync(path.join(directory, 'package.json'));

        // If it's a Node.js project, collect information
        if (isNodeProject) {
            console.info(`Found Node.js project in: ${directory}`);

            try {
                // Determine category and subcategory from path
                const relPath = path.relative(process.cwd(), directory);
                const pathParts = relPath.split(path.sep);
                let category = 'unknown';
                let subcategory = 'unknown';

                // Examples structure typically follows examples/{stable|experimental}/test|demo/...
                if (pathParts.length >= 2 && pathParts[0] === 'examples') {
                    category = pathParts[1] || 'unknown'; // stable or experimental
                    subcategory = pathParts[2] || 'unknown'; // test or demo or something else
                }

                // Read package.json
                const packageJsonPath = path.join(directory, 'package.json');
                let packageJson: any = {};

                try {
                    const packageJsonContent = await fs.readFile(
                        packageJsonPath,
                        'utf8'
                    );
                    packageJson = JSON.parse(packageJsonContent);
                } catch (_error) {
                    // If package.json can't be read or parsed, continue with empty object
                }

                // Calculate file count and size
                const fileCount = await countFiles(directory);
                const size = await calculateDirectorySize(directory);

                // Get last modified date
                const lastModified = await getLastModifiedDate(directory);

                // Detect features
                const features = await detectFeatures(directory);

                // Create project info object
                const projectInfo: ProjectInfo = {
                    path: directory,
                    category,
                    subcategory,
                    packageJson,
                    fileCount,
                    size,
                    lastModified,
                    features
                };

                // Add to projects array
                projects.push(projectInfo);
            } catch (error) {
                console.error(
                    `Error analyzing project in ${directory}: ${error instanceof Error ? error.message : String(error)}`
                );
            }
        }

        // Read all entries in the current directory
        const entries = await fs.readdir(directory);

        // Process subdirectories
        for (const entry of entries) {
            // Skip node_modules directories
            if (
                entry === 'node_modules' ||
                entry === '.git' ||
                entry === '.dfx' ||
                entry === '.azle'
            ) {
                continue;
            }

            const fullPath = path.join(directory, entry);

            // Check if this is a directory
            const stats = statSync(fullPath); // Using sync for simplicity in the loop
            if (stats.isDirectory()) {
                // Recursively process this subdirectory
                await surveyProjects(fullPath, projects);
            }
        }
    } catch (error) {
        console.error(
            `Error processing directory ${directory}: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

/**
 * Generate a summary of the surveyed projects
 *
 * @param projects - Array of project information
 * @returns Summary information
 */
const generateSummary = (projects: ProjectInfo[]): SummaryInfo => {
    // Calculate total projects
    const totalProjects = projects.length;

    // Count projects by category
    const categories: Record<string, number> = {};
    const subcategories: Record<string, number> = {};

    // Collect dependencies
    const dependenciesMap = new Map<
        string,
        { count: number; projects: string[] }
    >();

    // Collect features
    const featuresMap = new Map<
        string,
        { count: number; projects: string[] }
    >();

    // Calculate averages and find oldest/newest projects
    let totalFileCount = 0;
    let totalSize = 0;
    let oldestProject = { path: '', date: new Date() };
    let newestProject = { path: '', date: new Date(0) };

    // Process each project
    projects.forEach((project) => {
        // Update categories
        categories[project.category] = (categories[project.category] || 0) + 1;
        subcategories[project.subcategory] =
            (subcategories[project.subcategory] || 0) + 1;

        // Update dependencies
        const allDeps = {
            ...(project.packageJson.dependencies || {}),
            ...(project.packageJson.devDependencies || {})
        };

        Object.keys(allDeps).forEach((dep) => {
            const existing = dependenciesMap.get(dep) || {
                count: 0,
                projects: []
            };
            existing.count++;
            existing.projects.push(project.path);
            dependenciesMap.set(dep, existing);
        });

        // Update features
        project.features.forEach((feature) => {
            const existing = featuresMap.get(feature) || {
                count: 0,
                projects: []
            };
            existing.count++;
            existing.projects.push(project.path);
            featuresMap.set(feature, existing);
        });

        // Update totals
        totalFileCount += project.fileCount;
        totalSize += project.size;

        // Update oldest/newest
        if (project.lastModified < oldestProject.date) {
            oldestProject = { path: project.path, date: project.lastModified };
        }

        if (project.lastModified > newestProject.date) {
            newestProject = { path: project.path, date: project.lastModified };
        }
    });

    // Convert maps to arrays and sort by count
    const dependencies = Array.from(dependenciesMap.entries())
        .map(([name, data]) => ({
            name,
            count: data.count,
            projects: data.projects
        }))
        .sort((a, b) => b.count - a.count);

    const features = Array.from(featuresMap.entries())
        .map(([name, data]) => ({
            name,
            count: data.count,
            projects: data.projects
        }))
        .sort((a, b) => b.count - a.count);

    // Calculate averages
    const averageFileCount =
        totalProjects > 0 ? totalFileCount / totalProjects : 0;
    const averageSize = totalProjects > 0 ? totalSize / totalProjects : 0;

    // Return summary
    return {
        totalProjects,
        categories,
        subcategories,
        dependencies,
        features,
        averageFileCount,
        averageSize,
        oldestProject,
        newestProject
    };
};

/**
 * Format bytes to a human-readable string
 */
const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Print summary in a readable format
 */
const printSummary = (summary: SummaryInfo): void => {
    console.info('\n========== AZLE EXAMPLES SURVEY ==========\n');

    console.info(`Total projects: ${summary.totalProjects}`);

    console.info('\n---------- Projects by Category ----------');
    Object.entries(summary.categories)
        .sort((a, b) => b[1] - a[1])
        .forEach(([category, count]) => {
            console.info(`${category}: ${count} projects`);
        });

    console.info('\n---------- Projects by Subcategory ----------');
    Object.entries(summary.subcategories)
        .sort((a, b) => b[1] - a[1])
        .forEach(([subcategory, count]) => {
            console.info(`${subcategory}: ${count} projects`);
        });

    console.info('\n---------- Most Common Dependencies ----------');
    summary.dependencies
        .slice(0, 15) // Show top 15
        .forEach((dep) => {
            console.info(`${dep.name}: Used in ${dep.count} projects`);
        });

    console.info('\n---------- Features Usage ----------');
    summary.features.forEach((feature) => {
        console.info(`${feature.name}: Used in ${feature.count} projects`);
    });

    console.info('\n---------- Size Statistics ----------');
    console.info(
        `Average file count: ${Math.round(summary.averageFileCount)} files per project`
    );
    console.info(`Average project size: ${formatBytes(summary.averageSize)}`);

    console.info('\n---------- Date Statistics ----------');
    console.info(
        `Oldest project: ${summary.oldestProject.path} (${summary.oldestProject.date.toLocaleDateString()})`
    );
    console.info(
        `Newest project: ${summary.newestProject.path} (${summary.newestProject.date.toLocaleDateString()})`
    );

    console.info('\n=========================================\n');
};

// Main function
const main = async (): Promise<void> => {
    try {
        // Get the starting directory from command line or use examples directory
        const startDirectory =
            process.argv[2] || path.join(process.cwd(), 'examples');
        console.info(
            `Starting to survey Node.js projects in: ${startDirectory}`
        );

        // Initialize projects array
        const projects: ProjectInfo[] = [];

        // Survey projects
        await surveyProjects(startDirectory, projects);

        // Generate summary
        const summary = generateSummary(projects);

        // Print summary
        printSummary(summary);

        // Optionally write detailed results to a JSON file
        const outputPath = path.join(process.cwd(), 'examples-survey.json');
        await fs.writeFile(
            outputPath,
            JSON.stringify(
                {
                    summary,
                    projects
                },
                null,
                2
            )
        );

        console.info(`Detailed survey results written to: ${outputPath}`);
    } catch (error) {
        console.error(
            `Error in main execution: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

// Start the script
main();
