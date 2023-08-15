import { Record, $update, Variant } from './types';
import { $query } from 'azle';

export type FakeVariant = Variant<{ fake: null }>;

$update;
export function fakeEverything(): FakeVariant {
    return { fake: null };
}

$update;
export function fakeDecorator(): Record {
    return 3;
}

$query;
export function makeRealRecord(): Record {
    return 3;
}
