import { CanisterMethods } from '../../../compiler/utils/types';
import { CanisterMethodInfo, query } from '../../canister_methods/query';

// type CanisterMethodType = 'query';
// type CanisterMethods = (typeof query & {
//     canisterMethodType: CanisterMethodType;
// })[];

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

    // TODO loop through each key and simply grab the candid off
    // TODO grab the init/post_upgrade candid as well
    return {
        candid: `service: () -> {
    ${Object.entries(serviceOptions)
        .map((entry) => {
            return `${entry[0]}: ${entry[1].candid}`;
        })
        .join('')}
}
`,
        queries,
        updates: [],
        callbacks
    };
}
