import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../../src/build/stable/utils/global_paths';
import { Statistics } from './statistics';

const RESULTS_FILE = join(AZLE_PACKAGE_PATH, 'benchmark_stats.json');
const MARKDOWN_FILE = RESULTS_FILE.replace('.json', '.md');

export async function reportResults(
    results: Statistics,
    version: string
): Promise<void> {
    const fileContent = await readFile(RESULTS_FILE, 'utf-8');
    const allResults: Record<string, Statistics> = JSON.parse(fileContent);

    const updatedResults = { ...allResults, [version]: results };
    await writeFile(RESULTS_FILE, JSON.stringify(updatedResults, null, 2));

    const comparisonResults = compareChanges(updatedResults);
    const analysis = analyzeResults(results);

    const markdownContent = generateMarkdownReport(
        version,
        results,
        comparisonResults,
        analysis
    );
    await writeFile(MARKDOWN_FILE, markdownContent);

    // Still log to console for immediate feedback
    console.log(`Report generated at ${MARKDOWN_FILE}`);
}

function analyzeResults(stats: Statistics): string {
    // Add efficiency analysis
    let analysis = '### Efficiency Insights\n\n';
    const efficiencyScore = stats.baselineWeightedEfficiencyScore;
    let efficiencyAnalysis = '';

    if (efficiencyScore < 100) {
        efficiencyAnalysis =
            'The codebase is performing better than the baseline';
    } else if (efficiencyScore === 100) {
        efficiencyAnalysis = 'The codebase is performing at baseline levels';
    } else {
        efficiencyAnalysis =
            'The codebase is performing below baseline expectations';
    }

    analysis += `- ${efficiencyAnalysis} with an efficiency score of ${formatNumber(
        Math.floor(efficiencyScore)
    )}\n`;
    analysis += `- The average instruction count is ${formatNumber(
        Math.floor(stats.mean)
    )}\n`;
    analysis += `- The median instruction count is ${formatNumber(
        Math.floor(stats.median)
    )}\n`;
    analysis += `- The range of instructions spans from ${formatNumber(
        Math.floor(stats.min)
    )} to ${formatNumber(Math.floor(stats.max))}\n`;

    return analysis;
}

function generateMarkdownReport(
    version: string,
    results: Statistics,
    comparisonResults: string,
    analysis: string
): string {
    const timestamp = new Date().toISOString().split('T')[0];

    return `# Benchmark Results (${timestamp})

## Version Results (\`${version}\`)

${Object.entries(results)
    .map(
        ([key, value]) =>
            `- **${camelToTitleCase(key)}**: ${formatNumber(Math.floor(value))}`
    )
    .join('\n')}

${comparisonResults}

${analysis}

---
*Report generated automatically by Azle benchmark tools*
`;
}

function compareChanges(results: Record<string, Statistics>): string {
    const versions = Object.keys(results);
    if (versions.length >= 2) {
        const [previous, current] = versions.slice(-2);
        const changes = calculateVersionChanges(
            results[previous],
            results[current]
        );

        return Object.entries(changes).reduce(
            (acc, [key, value]) =>
                `${acc}- ${camelToTitleCase(
                    key.replace('Change', '')
                )}: ${value.toFixed(2)}%\n`,
            `\nPerformance changes from \`${previous}\` to \`${current}\`:\n`
        );
    }
    return '';
}

function calculateChange(prevValue: number, currValue: number): number {
    return ((prevValue - currValue) / prevValue) * 100;
}

function calculateVersionChanges(
    previous: Statistics,
    current: Statistics
): Record<string, number> {
    return {
        baselineWeightedEfficiencyScoreChange: calculateChange(
            previous.baselineWeightedEfficiencyScore,
            current.baselineWeightedEfficiencyScore
        ),
        averageScoreChange: calculateChange(previous.mean, current.mean),
        medianScoreChange: calculateChange(previous.median, current.median),
        minScoreChange: calculateChange(previous.min, current.min)
    };
}

function camelToTitleCase(camelCase: string): string {
    // Split the camelCase string into words
    const words = camelCase.replace(/([A-Z])/g, ' $1').split(' ');

    // Capitalize first letter of each word and join
    return words
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
        .trim();
}

function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '_');
}
