import { nat32, nat64, $query } from 'azle';

$query;
export function getDate(isoString: string): nat32 {
    return new Date(isoString).getDate();
}

$query;
export function getDay(isoString: string): nat32 {
    return new Date(isoString).getDay();
}

$query;
export function getFullYear(isoString: string): nat32 {
    return new Date(isoString).getFullYear();
}

$query;
export function getHours(isoString: string): nat32 {
    return new Date(isoString).getHours();
}

$query;
export function getMilliseconds(isoString: string): nat32 {
    return new Date(isoString).getMilliseconds();
}

$query;
export function getMinutes(isoString: string): nat32 {
    return new Date(isoString).getMinutes();
}

$query;
export function getMonth(isoString: string): nat32 {
    return new Date(isoString).getMonth();
}

$query;
export function getSeconds(isoString: string): nat32 {
    return new Date(isoString).getSeconds();
}

$query;
export function getTime(isoString: string): nat64 {
    return BigInt(new Date(isoString).getTime());
}

$query;
export function getTimezoneOffset(isoString: string): nat32 {
    return new Date(isoString).getTimezoneOffset();
}

$query;
export function getUtcDate(isoString: string): nat32 {
    return new Date(isoString).getUTCDate();
}

$query;
export function getUtcDay(isoString: string): nat32 {
    return new Date(isoString).getUTCDay();
}

$query;
export function getUtcFullYear(isoString: string): nat32 {
    return new Date(isoString).getUTCFullYear();
}

$query;
export function getUtcHours(isoString: string): nat32 {
    return new Date(isoString).getUTCHours();
}

$query;
export function getUtcMilliseconds(isoString: string): nat32 {
    return new Date(isoString).getUTCMilliseconds();
}

$query;
export function getUtcMinutes(isoString: string): nat32 {
    return new Date(isoString).getUTCMinutes();
}

$query;
export function getUtcMonth(isoString: string): nat32 {
    return new Date(isoString).getUTCMonth();
}

$query;
export function getUtcSeconds(isoString: string): nat32 {
    return new Date(isoString).getUTCSeconds();
}

$query;
export function setDate(isoString: string, newDate: nat32): nat32 {
    let date = new Date(isoString);

    date.setDate(newDate);

    return date.getDate();
}

$query;
export function setFullYear(isoString: string, newFullYear: nat32): nat32 {
    let date = new Date(isoString);

    date.setFullYear(newFullYear);

    return date.getFullYear();
}

$query;
export function setHours(isoString: string, newHours: nat32): nat32 {
    let date = new Date(isoString);

    date.setHours(newHours);

    return date.getHours();
}

$query;
export function setMilliseconds(
    isoString: string,
    newMilliseconds: nat32
): nat32 {
    let date = new Date(isoString);

    date.setMilliseconds(newMilliseconds);

    return date.getMilliseconds();
}

$query;
export function setMinutes(isoString: string, newMinutes: nat32): nat32 {
    let date = new Date(isoString);

    date.setMinutes(newMinutes);

    return date.getMinutes();
}

$query;
export function setMonth(isoString: string, newMonth: nat32): nat32 {
    let date = new Date(isoString);

    date.setMonth(newMonth);

    return date.getMonth();
}

$query;
export function setSeconds(isoString: string, newSeconds: nat32): nat32 {
    let date = new Date(isoString);

    date.setSeconds(newSeconds);

    return date.getSeconds();
}

$query;
export function setTime(isoString: string, newTime: nat64): nat64 {
    let date = new Date(isoString);

    date.setTime(Number(newTime));

    return BigInt(date.getTime());
}

$query;
export function setUtcDate(isoString: string, newUtcDate: nat32): nat32 {
    let date = new Date(isoString);

    date.setUTCDate(newUtcDate);

    return date.getUTCDate();
}

$query;
export function setUtcFullYear(
    isoString: string,
    newUtcFullYear: nat32
): nat32 {
    let date = new Date(isoString);

    date.setUTCFullYear(newUtcFullYear);

    return date.getUTCFullYear();
}

$query;
export function setUtcHours(isoString: string, newUtcHours: nat32): nat32 {
    let date = new Date(isoString);

    date.setUTCHours(newUtcHours);

    return date.getUTCHours();
}

$query;
export function setUtcMilliseconds(
    isoString: string,
    newUtcMilliseconds: nat32
): nat32 {
    let date = new Date(isoString);

    date.setUTCMilliseconds(newUtcMilliseconds);

    return date.getUTCMilliseconds();
}

$query;
export function setUtcMinutes(isoString: string, newUtcMinutes: nat32): nat32 {
    let date = new Date(isoString);

    date.setUTCMinutes(newUtcMinutes);

    return date.getUTCMinutes();
}

$query;
export function setUtcMonth(isoString: string, newUtcMonth: nat32): nat32 {
    let date = new Date(isoString);

    date.setUTCMonth(newUtcMonth);

    return date.getUTCMonth();
}

$query;
export function setUtcSeconds(isoString: string, newUtcSeconds: nat32): nat32 {
    let date = new Date(isoString);

    date.setUTCSeconds(newUtcSeconds);

    return date.getUTCSeconds();
}

$query;
export function toDateString(isoString: string): string {
    return new Date(isoString).toDateString();
}

$query;
export function toISOString(isoString: string): string {
    return new Date(isoString).toISOString();
}

$query;
export function toJSON(isoString: string): string {
    return new Date(isoString).toJSON();
}

$query;
export function toString(isoString: string): string {
    return new Date(isoString).toString();
}

$query;
export function toTimeString(isoString: string): string {
    return new Date(isoString).toTimeString();
}

$query;
export function toUtcString(isoString: string): string {
    return new Date(isoString).toUTCString();
}

$query;
export function now(): nat64 {
    return BigInt(Date.now());
}

$query;
export function parse(isoString: string): nat64 {
    return BigInt(Date.parse(isoString));
}

$query;
export function utc(year: nat32, month: nat32): nat64 {
    return BigInt(Date.UTC(year, month));
}
