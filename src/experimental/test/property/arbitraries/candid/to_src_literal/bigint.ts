import '#experimental/build/assert_experimental';

export function bigintToSrcLiteral(value: bigint): string {
    return `${value.toString()}n`;
}
