import { green, dim } from './colors';
import { Err, Ok, Result } from './result';
import { AzleError } from './types';
import { version } from '../../../package.json';

export function getCanisterName(args: string[]): Result<string, AzleError> {
    const canisterNames = args.slice(2).filter((arg) => !isCliFlag(arg));

    if (canisterNames.length === 0) {
        return Err({ suggestion: `azle v${version}\n\n${getUsageInfo()}` });
    }

    if (canisterNames.length > 1) {
        return Err({
            error: 'Too many arguments',
            suggestion: getUsageInfo(),
            exitCode: 1
        });
    }
    const canisterName = canisterNames[0];

    return Ok(canisterName);
}

function getUsageInfo(): string {
    return `Usage: azle ${dim('[-v|--verbose]')} ${green('<canisterName>')}`;
}

function isCliFlag(arg: string): boolean {
    return arg.startsWith('--') || arg.startsWith('-');
}
