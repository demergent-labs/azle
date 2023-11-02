function escapeStringForJavaScript(input: string) {
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/'/g, "\\'") // Escape single quotes
        .replace(/"/g, '\\"'); // Escape double quotes
}

export function stringToSrcLiteral(value: string): string {
    return `'${escapeStringForJavaScript(value)}'`;
}
