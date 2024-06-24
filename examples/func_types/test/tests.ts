import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/func_types/func_types.did';

type Func = [Principal, string];

export function getTests(funcTypesCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('gets a func from stable memory', async () => {
            const result = await funcTypesCanister.getStableFunc();
            const expected = [Principal.from('aaaaa-aa'), 'start_canister'];

            expect(result).toStrictEqual(expected);
        });

        it('gets a func with various null types', async () => {
            const func: Func = [
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
                'returnNull'
            ];
            const result = await funcTypesCanister.nullFuncParam(func);

            expect(result).toStrictEqual(func);
        });

        it('uses a basic func as a parameter', async () => {
            const func: Func = [
                Principal.fromText('aaaaa-aa'),
                'create_canister'
            ];
            const result = await funcTypesCanister.basicFuncParam(func);

            expect(result).toStrictEqual(func);
        });

        it('uses an array of basic funcs as a parameter', async () => {
            const funcs: Func[] = [
                [Principal.fromText('aaaaa-aa'), 'create_canister'],
                [Principal.fromText('aaaaa-aa'), 'update_settings'],
                [Principal.fromText('aaaaa-aa'), 'install_code']
            ];
            const result = await funcTypesCanister.basicFuncParamArray(funcs);

            expect(result).toStrictEqual(funcs);
        });

        it('uses a basic func as a return value', async () => {
            const result = await funcTypesCanister.basicFuncReturnType();

            const expected: Func = [
                Principal.fromText('aaaaa-aa'),
                'create_canister'
            ];

            expect(result).toStrictEqual(expected);
        });

        it('uses an array of basic funcs as a return value', async () => {
            const result = await funcTypesCanister.basicFuncReturnTypeArray();

            const expected: Func[] = [
                [Principal.fromText('aaaaa-aa'), 'create_canister'],
                [Principal.fromText('aaaaa-aa'), 'update_settings'],
                [Principal.fromText('aaaaa-aa'), 'install_code']
            ];

            expect(result).toStrictEqual(expected);
        });

        it('uses a complex func as a parameter', async () => {
            const func: Func = [
                Principal.fromText('aaaaa-aa'),
                'stop_canister'
            ];
            const result = await funcTypesCanister.complexFuncParam(func);

            expect(result).toStrictEqual(func);
        });

        it('uses a complex func as a return value', async () => {
            const result = await funcTypesCanister.complexFuncReturnType();

            const expected = [Principal.fromText('aaaaa-aa'), 'stop_canister'];

            expect(result).toStrictEqual(expected);
        });

        it('gets a func from a cross canister call', async () => {
            const result =
                await funcTypesCanister.getNotifierFromNotifiersCanister();

            const expected = [
                Principal.fromText(getCanisterId('notifiers')),
                'notify'
            ];

            expect(result).toStrictEqual(expected);
        });
    };
}
