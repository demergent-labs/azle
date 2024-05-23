import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';
import { Test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/func_types/func_types.did';

type Func = [Principal, string];

export function getTests(funcTypesCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'getStableFunc',
            test: async () => {
                const result = await funcTypesCanister.getStableFunc();
                const expectedFunc = [
                    Principal.from('aaaaa-aa'),
                    'start_canister'
                ];

                return testEquality(result, expectedFunc);
            }
        },
        {
            name: 'getNullFunc',
            test: async () => {
                const expected: Func = [
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
                    'returnNull'
                ];
                const result = await funcTypesCanister.nullFuncParam(expected);

                return testEquality(result, expected);
            }
        },
        {
            name: 'basicFuncParam',
            test: async () => {
                const expected: Func = [
                    Principal.fromText('aaaaa-aa'),
                    'create_canister'
                ];
                const result = await funcTypesCanister.basicFuncParam(expected);

                return testEquality(result, expected);
            }
        },
        {
            name: 'basicFuncParamArray',
            test: async () => {
                const expected: Func[] = [
                    [Principal.fromText('aaaaa-aa'), 'create_canister'],
                    [Principal.fromText('aaaaa-aa'), 'update_settings'],
                    [Principal.fromText('aaaaa-aa'), 'install_code']
                ];
                const result =
                    await funcTypesCanister.basicFuncParamArray(expected);

                return testEquality(result, expected);
            }
        },
        {
            name: 'basicFuncReturnType',
            test: async () => {
                const expected: Func = [
                    Principal.fromText('aaaaa-aa'),
                    'create_canister'
                ];
                const result = await funcTypesCanister.basicFuncReturnType();

                return testEquality(result, expected);
            }
        },
        {
            name: 'basicFuncReturnTypeArray',
            test: async () => {
                const expected: Func[] = [
                    [Principal.fromText('aaaaa-aa'), 'create_canister'],
                    [Principal.fromText('aaaaa-aa'), 'update_settings'],
                    [Principal.fromText('aaaaa-aa'), 'install_code']
                ];
                const result =
                    await funcTypesCanister.basicFuncReturnTypeArray();

                return testEquality(result, expected);
            }
        },
        {
            name: 'complexFuncParam',
            test: async () => {
                const expected: Func = [
                    Principal.fromText('aaaaa-aa'),
                    'stop_canister'
                ];
                const result =
                    await funcTypesCanister.complexFuncParam(expected);

                return testEquality(result, expected);
            }
        },
        {
            name: 'complexFuncReturnType',
            test: async () => {
                const expected = [
                    Principal.fromText('aaaaa-aa'),
                    'stop_canister'
                ];
                const result = await funcTypesCanister.complexFuncReturnType();

                return testEquality(result, expected);
            }
        },
        {
            name: 'getNotifierFromNotifiersCanister',
            test: async () => {
                const expected = [
                    Principal.fromText(getCanisterId('notifiers')),
                    'notify'
                ];
                const result =
                    await funcTypesCanister.getNotifierFromNotifiersCanister();

                return testEquality(result, expected);
            }
        }
    ];
}
