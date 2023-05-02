import { dim } from './colors';

export function time<T>(
    label: string,
    mode: 'inline' | 'default',
    callback: () => T
): T {
    const startTime = process.hrtime();
    console.info(label);
    const result = callback();
    const endTime = process.hrtime(startTime);
    const duration = parseHrTimeToSeconds(endTime);

    if (mode === 'inline') {
        const leadingNewLinesCount = (label.match(/^[\n]+/g) || [''])[0].length;
        const cursorUp = `\x1b[${1 + leadingNewLinesCount}A`;
        process.stdout.write(`${cursorUp}${label} ${dim(`${duration}s`)}\n`);
    } else {
        console.info(`\nDone in ${duration}s.`);
    }

    return result;
}

function parseHrTimeToSeconds(
    hrTime: [number, number],
    precision: number = 2
): string {
    const seconds = (hrTime[0] + hrTime[1] / 1_000_000_000).toFixed(precision);
    return seconds;
}
