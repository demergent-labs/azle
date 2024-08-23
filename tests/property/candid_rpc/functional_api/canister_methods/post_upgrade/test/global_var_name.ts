export function globalInitVarName(i: number): string {
    return `initParam${i}`;
}

export function globalPostUpgradeVarName(i: number): string {
    return `postUpgradeParam${i}`;
}
