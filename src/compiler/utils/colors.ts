export function red(text: string): string {
    return `\x1b[31m${text}\x1b[0m`;
}

export function yellow(text: string): string {
    return `\x1b[33m${text}\x1b[0m`;
}

export function green(text: string): string {
    return `\x1b[32m${text}\x1b[0m`;
}

export function blue(text: string): string {
    return `\x1b[34m${text}\x1b[0m`;
}

export function purple(text: string): string {
    return `\x1b[35m${text}\x1b[0m`;
}

export function dim(text: string): string {
    return `\x1b[2m${text}\x1b[0m`;
}
