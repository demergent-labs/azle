import { ActorSubclass } from '@dfinity/agent';
import { expect, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

import { _SERVICE } from './dfx_generated/hidden_methods/hidden_methods.did';

const canisterName = 'hidden_methods';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        let candid: string;

        please('load candid file', () => {
            const candidPath = join(
                '.azle',
                canisterName,
                `${canisterName}.did`
            );
            candid = readFileSync(candidPath, 'utf8');
        });

        it('includes non-hidden methods in candid interface', () => {
            expect(candid).toContain('queryUndefined');
            expect(candid).toContain('queryHiddenFalse');
            expect(candid).toContain('updateUndefined');
            expect(candid).toContain('updateHiddenFalse');
        });

        it('excludes hidden methods from candid interface', () => {
            expect(candid).not.toContain('queryHiddenTrue');
            expect(candid).not.toContain('updateHiddenTrue');
        });

        it('allows calling non-hidden query methods', async () => {
            expect(await canister.queryUndefined()).toBe(
                'query hidden undefined'
            );
            expect(await canister.queryHiddenFalse()).toBe(
                'query hidden false'
            );
        });

        it('allows calling non-hidden update methods', async () => {
            expect(await canister.updateUndefined()).toBe(
                'update hidden undefined'
            );
            expect(await canister.updateHiddenFalse()).toBe(
                'update hidden false'
            );
        });

        it('does not expose hidden methods on actor interface', () => {
            expect((canister as any).queryHiddenTrue).toBeUndefined();
            expect((canister as any).updateHiddenTrue).toBeUndefined();
        });

        it('allows calling hidden query methods via dfx', () => {
            const queryResult = execSync(
                `dfx canister call ${canisterName} queryHiddenTrue`
            )
                .toString()
                .trim();
            expect(queryResult).toBe('("query hidden true")');
        });

        it('allows calling hidden update methods via dfx', () => {
            const updateResult = execSync(
                `dfx canister call ${canisterName} updateHiddenTrue`
            )
                .toString()
                .trim();
            expect(updateResult).toBe('("update hidden true")');
        });
    };
}
