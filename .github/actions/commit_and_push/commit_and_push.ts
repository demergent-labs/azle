import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

type CreateCommitInput = {
    branch: {
        repositoryNameWithOwner: string;
        branchName: string;
    };
    fileChanges: {
        additions: Addition[];
    };
    message: {
        headline: string;
    };
    expectedHeadOid: string;
};

type Addition = {
    path: string;
    contents: string;
};

async function commitAndPush(): Promise<void> {
    verifyEnvironmentVariables();

    execSync(`git add ${process.env.ADD_FILES || '--all'}`, {
        stdio: 'inherit'
    });

    const changedFiles = getChangedFiles();

    if (changedFiles.length === 0) {
        console.log('ℹ️ No changes to commit');
        return;
    }
    console.log(`📝 Found ${changedFiles.length} changed files:`);
    changedFiles.forEach((file) => console.log(`  - ${file}`));

    const expectedHeadOid = getExpectedHeadOid();

    const additions = encodeFileContents(changedFiles);

    const input = createInput(additions, expectedHeadOid);

    await createCommitWithRetry(input);

    console.log('✅ Commit created successfully!');
}

function verifyEnvironmentVariables(): void {
    // Validate required environment variables
    const requiredEnvVars = [
        'GH_TOKEN',
        'BRANCH_NAME',
        'COMMIT_MESSAGE',
        'GITHUB_REPOSITORY'
    ];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
}

function getChangedFiles(): string[] {
    const changedFilesOutput = execSync('git diff --cached --name-only', {
        encoding: 'utf8'
    });
    const changedFiles = changedFilesOutput
        .trim()
        .split('\n')
        .filter((f) => f.length > 0);

    return changedFiles;
}

function getExpectedHeadOid(): string {
    return execSync('git rev-parse HEAD', {
        encoding: 'utf8'
    }).trim();
}

function encodeFileContents(changedFiles: string[]): Addition[] {
    return changedFiles.map((file) => {
        try {
            const content = readFileSync(file).toString('base64');
            return {
                path: file,
                contents: content
            };
        } catch (error) {
            throw new Error(`Failed to read file ${file}: ${error}`);
        }
    });
}

function createInput(
    additions: Addition[],
    expectedHeadOid: string
): CreateCommitInput {
    return {
        branch: {
            repositoryNameWithOwner: process.env.GITHUB_REPOSITORY!,
            branchName: process.env.BRANCH_NAME!
        },
        fileChanges: {
            additions
        },
        message: {
            headline: process.env.COMMIT_MESSAGE!
        },
        expectedHeadOid
    };
}

async function createCommitWithRetry(
    input: CreateCommitInput,
    retries = 1
): Promise<void> {
    try {
        createCommit(input);
    } catch (error: any) {
        // Handle rate limit errors specifically
        const errorMessage = error.message || error.toString();
        if (errorMessage.includes('rate limit') && retries > 0) {
            console.log('⚠️ Rate limit exceeded.');
            console.log(
                'Rate limit will reset automatically. Retrying in 60 seconds...'
            );

            await new Promise((resolve) => setTimeout(resolve, 60000));

            console.log('🔄 Retrying commit after rate limit wait...');
            createCommitWithRetry(input, retries - 1);
        }

        console.error('GraphQL operation failed:', errorMessage);
        throw error;
    }
}

function createCommit(input: CreateCommitInput): void {
    // Build GraphQL payload
    const payload = {
        query: `
                mutation ($input: CreateCommitOnBranchInput!) {
                    createCommitOnBranch(input: $input) {
                        commit {
                            oid
                            url
                        }
                    }
                }
            `,
        variables: { input }
    };

    // Write payload to temp file
    const tempFile = join(tmpdir(), `graphql-${Date.now()}.json`);
    writeFileSync(tempFile, JSON.stringify(payload));

    try {
        // Execute GraphQL via gh CLI
        const responseJson = execSync(`gh api graphql --input="${tempFile}"`, {
            encoding: 'utf8',
            env: {
                ...process.env,
                GH_TOKEN: process.env.GH_TOKEN
            }
        });

        const response = JSON.parse(responseJson);
        console.log(response);
    } finally {
        // Cleanup temp file
        try {
            execSync(`rm -f "${tempFile}"`);
        } catch {
            // Ignore cleanup errors
        }
    }
}

commitAndPush();
