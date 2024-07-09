import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

export function getThrownErrorTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('throw big int', async () => {
            await expect(errorCanister.throwBigint).rejects.toThrow('3');
        });

        it('throw boolean', async () => {
            await expect(errorCanister.throwBoolean).rejects.toThrow('false');
        });

        it('throw class', async () => {
            await expect(errorCanister.throwClass).rejects.toThrow(
                'CustomClass toString'
            );
        });

        it('throw custom error', async () => {
            await expect(errorCanister.throwCustomError).rejects.toThrow(
                'Error: This is a custom error'
            );
        });

        it('throw int', async () => {
            await expect(errorCanister.throwInt).rejects.toThrow('3');
        });

        it('throw null', async () => {
            await expect(errorCanister.throwNull).rejects.toThrow('null');
        });

        it('throw null reference', async () => {
            await expect(errorCanister.throwNullReference).rejects.toThrow(
                "TypeError: cannot convert 'null' or 'undefined' to object"
            );
        });

        it('throw object', async () => {
            await expect(errorCanister.throwObject).rejects.toThrow(
                '[object Object]'
            );
        });

        it('throw rational', async () => {
            await expect(errorCanister.throwRational).rejects.toThrow('3.14');
        });

        it('throw string', async () => {
            await expect(errorCanister.throwString).rejects.toThrow(
                'Hello World'
            );
        });

        it('throw symbol', async () => {
            await expect(errorCanister.throwSymbol).rejects.toThrow('Symbol()');
        });

        it('throw undefined', async () => {
            await expect(errorCanister.throwUndefined).rejects.toThrow(
                'undefined'
            );
        });
    };
}
