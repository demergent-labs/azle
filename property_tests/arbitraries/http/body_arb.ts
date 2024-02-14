import fc from 'fast-check';

export function BodyArb() {
    return fc.json().map((json) => new Uint8Array(Buffer.from(json, 'utf-8')));
}
