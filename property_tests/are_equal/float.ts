export function areFloatsEqual(paramName: string, paramLiteral: string) {
    return `((Number.isNaN(${paramName}) && Number.isNaN(${paramLiteral})) || ${paramName} === ${paramLiteral})`;
}
