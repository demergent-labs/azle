import fc from 'fast-check';

export function BodyArb(): fc.Arbitrary<Uint8Array> {
    return fc.json().map((json) => new Uint8Array(Buffer.from(json, 'utf-8')));
}
