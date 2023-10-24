export function areFloatsEqual(paramName: string, paramValue: number) {
    if (Number.isNaN(paramValue)) {
        return `(Number.isNaN(${paramName}) && Number.isNaN(${paramValue}))`;
    } else {
        return `${paramName} === ${paramValue}`;
    }
}
