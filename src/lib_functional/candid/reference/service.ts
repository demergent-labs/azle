import { CanisterMethods } from '../../../compiler/utils/types';
import { CanisterMethodInfo } from '../../canister_methods';

type ServiceOptions = {
    [key: string]: CanisterMethodInfo;
};

export function Service(serviceOptions: ServiceOptions): CanisterMethods {
    const callbacks = Object.entries(serviceOptions).reduce((acc, entry) => {
        const key = entry[0];
        const value = entry[1];

        return {
            ...acc,
            [key]: value.callback
        };
    }, {});

    const candidTypes = Object.values(serviceOptions).reduce(
        (acc: string[], canisterMethodInfo) => {
            return [...acc, ...canisterMethodInfo.candidTypes];
        },
        []
    );

    const queries = Object.entries(serviceOptions)
        .filter((entry) => {
            const key = entry[0];
            const value = entry[1];

            return value.type === 'query';
        })
        .map((entry) => {
            const key = entry[0];
            const value = entry[1];

            return {
                name: key
            };
        });

    const updates = Object.entries(serviceOptions)
        .filter((entry) => {
            const key = entry[0];
            const value = entry[1];

            return value.type === 'update';
        })
        .map((entry) => {
            const key = entry[0];
            const value = entry[1];

            return {
                name: key
            };
        });

    // TODO loop through each key and simply grab the candid off
    // TODO grab the init/post_upgrade candid as well
    return {
        candid: `${
            candidTypes.length === 0 ? '' : candidTypes.join('\n') + '\n'
        }service: () -> {
    ${Object.entries(serviceOptions)
        .map((entry) => {
            return `${entry[0]}: ${entry[1].candid}`;
        })
        .join('\n    ')}
}
`,
        queries,
        updates,
        callbacks
    };
}
