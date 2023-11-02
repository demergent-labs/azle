import { JsFunctionNameArb } from './js_function_name_arb';

type IdentifiersMap = {
    [key: string]: Set<string>;
};

let identifiers: IdentifiersMap = {};

/**
 * An arbitrary for creating unique Rust-keyword-avoidant identifiers. Generated
 * identifiers are checked for uniqueness based on the provided key. Duplicates
 * may occur across groupings, but never within.
 * @param key the grouping in which to keep this identifier unique
 * @returns an arbitrary identifier string
 */
export function UniqueIdentifierArb(key: string) {
    if (!(key in identifiers)) {
        identifiers[key] = new Set();
    }

    return JsFunctionNameArb.filter(
        (sample) => !identifiers[key].has(sample)
    ).map((sample) => {
        identifiers[key].add(sample);
        return sample;
    });
}
