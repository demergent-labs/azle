import '#experimental/build/assert_experimental';

export function blobToSrcLiteral(value: Uint8Array): string {
    return `new Uint8Array([${[...value].join(', ')}])`;
}
