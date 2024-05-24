// TODO perhaps this should be its own npm package inside of the open_value_sharing repo?
// TODO should we also put the Rust implementation in that repo?
// TODO should we then make these a crate and an npm package?

import { execSync } from 'child_process';
import { readFile } from 'fs/promises';
import { glob } from 'glob';

type DepthWeights = {
    [key: number]: number;
};

export type ConsumerConfig = {
    killSwitch: boolean;
    sharedPercentage: number;
    period: number;
    sharingHeuristic: 'BURNED_WEIGHTED_HALVING';
    dependencyInfos: DependencyInfo[];
    depthWeights: DepthWeights;
};

export type DependencyInfo = {
    name: string;
    depth: number;
    weight: number;
    platform: string;
    asset: string;
    paymentMechanism: string;
    custom: Record<string, any>;
};

export type DependencyDefinition = {
    platform: string;
    asset: string;
    payment_mechanism: string;
    custom: Record<string, any>;
};

export type OpenValueSharingConfig = {
    killSwitch?: ConsumerConfig['killSwitch'];
    sharedPercentage?: ConsumerConfig['sharedPercentage'];
    period?: ConsumerConfig['period'];
    sharingHeuristic?: ConsumerConfig['sharingHeuristic'];
    weights?: {
        [packageName: string]: number;
    };
};

export async function getConsumerConfig(): Promise<ConsumerConfig> {
    const openValueSharingConfig: OpenValueSharingConfig | undefined =
        JSON.parse(
            (await readFile('./package.json')).toString()
        ).openValueSharing;

    const openValueSharingNpmPackagePaths = await glob(
        'node_modules/**/.openvaluesharing.json'
    );

    const dependencyTree = JSON.parse(
        execSync(`npm ls --all --json`).toString().trim()
    );

    const dependencyInfos = await openValueSharingNpmPackagePaths.reduce(
        async (acc: Promise<DependencyInfo[]>, npmPackagePath) => {
            const accResolved = await acc;

            const packageJsonString = (
                await readFile(
                    `${npmPackagePath.replace(
                        '/.openvaluesharing.json',
                        ''
                    )}/package.json`
                )
            ).toString();
            const packageJson = JSON.parse(packageJsonString);
            const npmPackageName = packageJson.name;

            const dependencyDefinitions: DependencyDefinition[] = JSON.parse(
                (await readFile(npmPackagePath)).toString()
            );

            const icpDependencyDefinitions = dependencyDefinitions.filter(
                (dependencyDefinition) =>
                    dependencyDefinition.platform === 'icp'
            );
            // TODO explain that the dev should only have one config object per platform
            // TODO as at least in Azle only the first ICP entry will be used
            const icpDependencyDefinition = icpDependencyDefinitions[0];

            if (icpDependencyDefinition === undefined) {
                return accResolved;
            }

            const { payment_mechanism, ...icpDependencyDefinitionProps } =
                icpDependencyDefinition;

            const depth = getNpmPackageDepth(
                dependencyTree.dependencies,
                npmPackageName
            );

            if (depth === null) {
                throw new Error(
                    `Open Value Sharing: could not determine depth for package "${npmPackageName}"`
                );
            }

            return [
                ...accResolved,
                {
                    name: npmPackageName,
                    depth,
                    weight:
                        openValueSharingConfig?.weights?.[npmPackageName] ?? 1,
                    ...icpDependencyDefinitionProps,
                    paymentMechanism: payment_mechanism
                }
            ];
        },
        Promise.resolve([])
    );

    const depthWeights = dependencyInfos.reduce((acc, dependencyInfo) => {
        return {
            ...acc,
            [dependencyInfo.depth]:
                (acc[dependencyInfo.depth] ?? 0) + dependencyInfo.weight
        };
    }, {} as DepthWeights);

    return {
        killSwitch: openValueSharingConfig?.killSwitch ?? true, // TODO this is off by default only for now
        sharedPercentage: openValueSharingConfig?.sharedPercentage ?? 10,
        period: 1, // TODO just testing this
        // period: 1_440,
        // period: openValueSharingConfig.period ?? 1_440, // TODO all devs to set the period once we the IC APIs allow us to query total cycle burn accurately
        sharingHeuristic:
            openValueSharingConfig?.sharingHeuristic ??
            'BURNED_WEIGHTED_HALVING',
        dependencyInfos,
        depthWeights
    };
}

function getNpmPackageDepth(
    dependencies: any,
    name: string,
    depth: number = 0
): number | null {
    const finalDepth = Object.entries(dependencies ?? {}).reduce(
        (
            acc: number | null,
            [dependencyName, dependencyValue]: [string, any]
        ) => {
            if (acc !== null) {
                return acc;
            } else {
                if (dependencyName === name) {
                    return depth;
                }

                return getNpmPackageDepth(
                    dependencyValue.dependencies,
                    name,
                    depth + 1
                );
            }
        },
        null
    );

    return finalDepth;
}
