import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId, Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/func_types/func_types.did';

export function getTests(funcTypesCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'getStableFunc',
            test: async () => {
                const result = await funcTypesCanister.getStableFunc();

                return {
                    Ok:
                        result[0].toText() === 'aaaaa-aa' &&
                        result[1] === 'start_canister'
                };
            }
        },
        {
            name: 'getNullFunc',
            test: async () => {
                const result = await funcTypesCanister.nullFuncParam([
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
                    'returnNull'
                ]);

                return {
                    Ok:
                        result[0].toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai' &&
                        result[1] === 'returnNull'
                };
            }
        },
        {
            name: 'basicFuncParam',
            test: async () => {
                const result = await funcTypesCanister.basicFuncParam([
                    Principal.fromText('aaaaa-aa'),
                    'create_canister'
                ]);

                return {
                    Ok:
                        result[0].toText() === 'aaaaa-aa' &&
                        result[1] === 'create_canister'
                };
            }
        },
        {
            name: 'basicFuncParamArray',
            test: async () => {
                const result = await funcTypesCanister.basicFuncParamArray([
                    [Principal.fromText('aaaaa-aa'), 'create_canister'],
                    [Principal.fromText('aaaaa-aa'), 'update_settings'],
                    [Principal.fromText('aaaaa-aa'), 'install_code']
                ]);

                return {
                    Ok:
                        result[0][0].toText() === 'aaaaa-aa' &&
                        result[0][1] === 'create_canister' &&
                        result[1][0].toText() === 'aaaaa-aa' &&
                        result[1][1] === 'update_settings' &&
                        result[2][0].toText() === 'aaaaa-aa' &&
                        result[2][1] === 'install_code'
                };
            }
        },
        {
            name: 'basicFuncReturnType',
            test: async () => {
                const result = await funcTypesCanister.basicFuncReturnType();

                return {
                    Ok:
                        result[0].toText() === 'aaaaa-aa' &&
                        result[1] === 'create_canister'
                };
            }
        },
        {
            name: 'basicFuncReturnTypeArray',
            test: async () => {
                const result =
                    await funcTypesCanister.basicFuncReturnTypeArray();

                return {
                    Ok:
                        result[0][0].toText() === 'aaaaa-aa' &&
                        result[0][1] === 'create_canister' &&
                        result[1][0].toText() === 'aaaaa-aa' &&
                        result[1][1] === 'update_settings' &&
                        result[2][0].toText() === 'aaaaa-aa' &&
                        result[2][1] === 'install_code'
                };
            }
        },
        {
            name: 'complexFuncParam',
            test: async () => {
                const result = await funcTypesCanister.complexFuncParam([
                    Principal.fromText('aaaaa-aa'),
                    'stop_canister'
                ]);

                return {
                    Ok:
                        result[0].toText() === 'aaaaa-aa' &&
                        result[1] === 'stop_canister'
                };
            }
        },
        {
            name: 'complexFuncReturnType',
            test: async () => {
                const result = await funcTypesCanister.complexFuncReturnType();

                return {
                    Ok:
                        result[0].toText() === 'aaaaa-aa' &&
                        result[1] === 'stop_canister'
                };
            }
        },
        {
            name: 'getNotifierFromNotifiersCanister',
            test: async () => {
                const result =
                    await funcTypesCanister.getNotifierFromNotifiersCanister();

                return {
                    Ok:
                        result[0].toText() === getCanisterId('notifiers') &&
                        result[1] === 'notify'
                };
            }
        }
    ];
}
