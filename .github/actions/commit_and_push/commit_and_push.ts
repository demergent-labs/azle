import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { v4 } from 'uuid';

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
    const { addFiles, branchName, commitMessage, githubRepository } =
        extractEnvironmentVariables();

    execSync(`git add ${addFiles}`, { stdio: 'inherit' });

    const changedFiles = getChangedFiles();

    if (changedFiles.length === 0) {
        console.info('ℹ️ No changes to commit');
        return;
    }
    console.info(`📝 Found ${changedFiles.length} changed files:`);
    changedFiles.forEach((file) => console.info(`  - ${file}`));

    const expectedHeadOid = getExpectedHeadOid();

    const additions = await encodeFileContents(changedFiles);

    const input = createInput(
        additions,
        expectedHeadOid,
        branchName,
        commitMessage,
        githubRepository
    );

    await createCommitWithRetry(input);

    console.info('✅ Commit created successfully!');
}

function extractEnvironmentVariables(): {
    addFiles: string;
    branchName: string;
    commitMessage: string;
    githubRepository: string;
} {
    if (process.env.BRANCH_NAME === undefined) {
        throw new Error('Missing required environment variable: BRANCH_NAME');
    }

    if (process.env.COMMIT_MESSAGE === undefined) {
        throw new Error(
            'Missing required environment variable: COMMIT_MESSAGE'
        );
    }

    if (process.env.GITHUB_REPOSITORY === undefined) {
        throw new Error(
            'Missing required environment variable: GITHUB_REPOSITORY'
        );
    }

    return {
        addFiles: process.env.ADD_FILES?.trim() ?? '--all',
        branchName: process.env.BRANCH_NAME.trim(),
        commitMessage: process.env.COMMIT_MESSAGE.trim(),
        githubRepository: process.env.GITHUB_REPOSITORY.trim()
    };
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

async function encodeFileContents(changedFiles: string[]): Promise<Addition[]> {
    return Promise.all(
        changedFiles.map(async (file) => {
            try {
                const content = (await readFile(file)).toString('base64');
                return {
                    path: file,
                    contents: content
                };
            } catch (error) {
                throw new Error(`Failed to read file ${file}: ${error}`);
            }
        })
    );
}

function createInput(
    additions: Addition[],
    expectedHeadOid: string,
    branchName: string,
    commitMessage: string,
    repositoryNameWithOwner: string
): CreateCommitInput {
    return {
        branch: {
            repositoryNameWithOwner,
            branchName
        },
        fileChanges: {
            additions
        },
        message: {
            headline: commitMessage
        },
        expectedHeadOid
    };
}

async function createCommitWithRetry(
    input: CreateCommitInput,
    retries = 1
): Promise<void> {
    try {
        await createCommit(input);
    } catch (error: any) {
        const errorMessage = error.message || error.toString();
        if (errorMessage.includes('rate limit') && retries > 0) {
            console.warn('⚠️ Rate limit exceeded.');
            console.info(
                'Rate limit will reset automatically. Retrying in 60 seconds...'
            );

            await new Promise((resolve) => setTimeout(resolve, 60_000));

            console.info('🔄 Retrying commit after rate limit wait...');
            await createCommitWithRetry(input, retries - 1);
        }

        console.error('GraphQL operation failed:', errorMessage);
        throw error;
    }
}

async function createCommit(input: CreateCommitInput): Promise<void> {
    const payload = {
        query: `
                mutation ($input: CreateCommitOnBranchInput!) {
                    createCommitOnBranch(input: $input) {
                        clientMutationId
                    }
                }
            `,
        variables: { input }
    };

    const tempFile = join(tmpdir(), `graphql-${v4()}.json`);
    await writeFile(tempFile, JSON.stringify(payload));

    const responseJson = execSync(`gh api graphql --input="${tempFile}"`, {
        encoding: 'utf8',
        env: {
            ...process.env,
            GH_TOKEN: process.env.GH_TOKEN
        }
    });

    const response = JSON.parse(responseJson);
    console.info(response);
}

commitAndPush();
