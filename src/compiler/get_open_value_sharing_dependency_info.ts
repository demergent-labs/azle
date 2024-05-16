// TODO perhaps this should be its own npm package inside of the open_value_sharing repo?
// TODO should we also put the Rust implementation in that repo?
// TODO should we then make these a crate and an npm package?

export type DependencyInfo = DependencyLevel[];
type DependencyLevel = Dependency[];
type Dependency = {
    name: string;
    weight: number;
    platform: string;
    asset: string;
    payment_mechanism: string;
    custom: Record<string, any>;
};

export function getDependencyInfo(): DependencyInfo {
    return [
        [
            {
                name: 'level_0_0',
                weight: 1,
                platform: 'icp',
                asset: 'cycles',
                payment_mechanism: 'wallet',
                custom: {
                    principal: 'bw4dl-smaaa-aaaaa-qaacq-cai'
                }
            },
            {
                name: 'level_0_1',
                weight: 1,
                platform: 'icp',
                asset: 'cycles',
                payment_mechanism: 'wallet',
                custom: {
                    principal: 'bw4dl-smaaa-aaaaa-qaacq-cai'
                }
            },
            {
                name: 'level_0_2',
                weight: 1,
                platform: 'icp',
                asset: 'cycles',
                payment_mechanism: 'wallet',
                custom: {
                    principal: 'bw4dl-smaaa-aaaaa-qaacq-cai'
                }
            },
            {
                name: 'level_0_3',
                weight: 1,
                platform: 'icp',
                asset: 'cycles',
                payment_mechanism: 'wallet',
                custom: {
                    principal: 'bw4dl-smaaa-aaaaa-qaacq-cai'
                }
            }
        ],
        [
            {
                name: 'level_1_0',
                weight: 1,
                platform: 'icp',
                asset: 'cycles',
                payment_mechanism: 'wallet',
                custom: {
                    principal: 'bw4dl-smaaa-aaaaa-qaacq-cai'
                }
            },
            {
                name: 'level_1_1',
                weight: 1,
                platform: 'icp',
                asset: 'cycles',
                payment_mechanism: 'wallet',
                custom: {
                    principal: 'bw4dl-smaaa-aaaaa-qaacq-cai'
                }
            }
        ],
        [
            {
                name: 'level_2_0',
                weight: 1,
                platform: 'icp',
                asset: 'cycles',
                payment_mechanism: 'wallet',
                custom: {
                    principal: 'bw4dl-smaaa-aaaaa-qaacq-cai'
                }
            }
        ]
    ];
}
