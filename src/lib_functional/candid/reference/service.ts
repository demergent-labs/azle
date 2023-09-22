import { Principal, TypeMapping } from '../../';
import { serviceCall } from '../../../lib_new';
import { CanisterMethodInfo } from '../../canister_methods';

type ServiceOptions = {
    [key: string]: CanisterMethodInfo<any, any>;
};

type ServiceReturn<T extends ServiceOptions> = {
    [EndpointName in keyof T]: T[EndpointName] extends CanisterMethodInfo<
        infer Params,
        infer Return
    >
        ? (
              ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
          ) => Promise<TypeMapping<Return>>
        : never;
};

export function Service<T extends ServiceOptions>(
    serviceOptions: T,
    principal?: Principal
): ServiceReturn<T> {
    const callbacks = Object.entries(serviceOptions).reduce((acc, entry) => {
        const key = entry[0];
        const value = entry[1];

        if (value.callback === undefined) {
            return {
                ...acc,
                [key]: (...args: any[]) => {
                    return serviceCall(
                        principal as any,
                        key,
                        value.paramsIdls,
                        value.returnIdl
                    )(...args);
                }
            };
        } else {
            return {
                ...acc,
                [key]: value.callback
            };
        }
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
        callbacks,
        ...callbacks // TODO then we can't use any names that could collide in this object
    } as any;
}
