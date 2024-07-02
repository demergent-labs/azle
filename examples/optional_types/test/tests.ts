import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

import { Element } from '../src';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/optional_types/optional_types.did';

export function getTests(optionalTypesCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('getHtml', async () => {
            const result = await optionalTypesCanister.getHtml();

            expect(result.head).toHaveLength(0);
        });

        it('getHead', async () => {
            const result = await optionalTypesCanister.getHead();

            expect(result).toStrictEqual([{ elements: [] }]);
        });

        it('getHeadWithElements', async () => {
            const result = await optionalTypesCanister.getHeadWithElements();

            expect(result).toStrictEqual([{ elements: [{ id: '0' }] }]);
        });

        it('getElement(None)', async () => {
            const element: [] = [];
            const result = await optionalTypesCanister.getElement(element);

            expect(result).toStrictEqual(element);
        });

        it('getElement(Some(None))', async () => {
            const element: [[]] = [[]];
            const result = await optionalTypesCanister.getElement(element);

            expect(result).toStrictEqual(element);
        });

        it('getElement(Some(Some({ id: "0" })))', async () => {
            const element: [[Element]] = [[{ id: '0' }]];
            const result = await optionalTypesCanister.getElement(element);

            expect(result).toStrictEqual(element);
        });

        it('getNull', async () => {
            const result = await optionalTypesCanister.getNull();

            expect(result).toBeNull();
        });

        it('getOptNull', async () => {
            const result = await optionalTypesCanister.getOptNull();

            expect(result).toHaveLength(0);
        });

        it('stringToBoolean(Some("something"))', async () => {
            const result = await optionalTypesCanister.stringToBoolean([
                'something'
            ]);

            expect(result).toBe(true);
        });

        it('stringToBoolean(None)', async () => {
            const result = await optionalTypesCanister.stringToBoolean([]);

            expect(result).toBe(false);
        });
    };
}
