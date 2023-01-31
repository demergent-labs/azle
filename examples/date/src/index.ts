import { nat32, nat64, $query } from 'azle';

$query;
export function get_date(iso_string: string): nat32 {
    return new Date(iso_string).getDate();
}

$query;
export function get_day(iso_string: string): nat32 {
    return new Date(iso_string).getDay();
}

$query;
export function get_full_year(iso_string: string): nat32 {
    return new Date(iso_string).getFullYear();
}

$query;
export function get_hours(iso_string: string): nat32 {
    return new Date(iso_string).getHours();
}

$query;
export function get_milliseconds(iso_string: string): nat32 {
    return new Date(iso_string).getMilliseconds();
}

$query;
export function get_minutes(iso_string: string): nat32 {
    return new Date(iso_string).getMinutes();
}

$query;
export function get_month(iso_string: string): nat32 {
    return new Date(iso_string).getMonth();
}

$query;
export function get_seconds(iso_string: string): nat32 {
    return new Date(iso_string).getSeconds();
}

$query;
export function get_time(iso_string: string): nat64 {
    return BigInt(new Date(iso_string).getTime());
}

$query;
export function get_timezone_offset(iso_string: string): nat32 {
    return new Date(iso_string).getTimezoneOffset();
}

$query;
export function get_utc_date(iso_string: string): nat32 {
    return new Date(iso_string).getUTCDate();
}

$query;
export function get_utc_day(iso_string: string): nat32 {
    return new Date(iso_string).getUTCDay();
}

$query;
export function get_utc_full_year(iso_string: string): nat32 {
    return new Date(iso_string).getUTCFullYear();
}

$query;
export function get_utc_hours(iso_string: string): nat32 {
    return new Date(iso_string).getUTCHours();
}

$query;
export function get_utc_milliseconds(iso_string: string): nat32 {
    return new Date(iso_string).getUTCMilliseconds();
}

$query;
export function get_utc_minutes(iso_string: string): nat32 {
    return new Date(iso_string).getUTCMinutes();
}

$query;
export function get_utc_month(iso_string: string): nat32 {
    return new Date(iso_string).getUTCMonth();
}

$query;
export function get_utc_seconds(iso_string: string): nat32 {
    return new Date(iso_string).getUTCSeconds();
}

$query;
export function set_date(iso_string: string, new_date: nat32): nat32 {
    let date = new Date(iso_string);

    date.setDate(new_date);

    return date.getDate();
}

$query;
export function set_full_year(iso_string: string, new_full_year: nat32): nat32 {
    let date = new Date(iso_string);

    date.setFullYear(new_full_year);

    return date.getFullYear();
}

$query;
export function set_hours(iso_string: string, new_hours: nat32): nat32 {
    let date = new Date(iso_string);

    date.setHours(new_hours);

    return date.getHours();
}

$query;
export function set_milliseconds(
    iso_string: string,
    new_milliseconds: nat32
): nat32 {
    let date = new Date(iso_string);

    date.setMilliseconds(new_milliseconds);

    return date.getMilliseconds();
}

$query;
export function set_minutes(iso_string: string, new_minutes: nat32): nat32 {
    let date = new Date(iso_string);

    date.setMinutes(new_minutes);

    return date.getMinutes();
}

$query;
export function set_month(iso_string: string, new_month: nat32): nat32 {
    let date = new Date(iso_string);

    date.setMonth(new_month);

    return date.getMonth();
}

$query;
export function set_seconds(iso_string: string, new_seconds: nat32): nat32 {
    let date = new Date(iso_string);

    date.setSeconds(new_seconds);

    return date.getSeconds();
}

$query;
export function set_time(iso_string: string, new_time: nat64): nat64 {
    let date = new Date(iso_string);

    date.setTime(Number(new_time));

    return BigInt(date.getTime());
}

$query;
export function set_utc_date(iso_string: string, new_utc_date: nat32): nat32 {
    let date = new Date(iso_string);

    date.setUTCDate(new_utc_date);

    return date.getUTCDate();
}

$query;
export function set_utc_full_year(
    iso_string: string,
    new_utc_full_year: nat32
): nat32 {
    let date = new Date(iso_string);

    date.setUTCFullYear(new_utc_full_year);

    return date.getUTCFullYear();
}

$query;
export function set_utc_hours(iso_string: string, new_utc_hours: nat32): nat32 {
    let date = new Date(iso_string);

    date.setUTCHours(new_utc_hours);

    return date.getUTCHours();
}

$query;
export function set_utc_milliseconds(
    iso_string: string,
    new_utc_milliseconds: nat32
): nat32 {
    let date = new Date(iso_string);

    date.setUTCMilliseconds(new_utc_milliseconds);

    return date.getUTCMilliseconds();
}

$query;
export function set_utc_minutes(
    iso_string: string,
    new_utc_minutes: nat32
): nat32 {
    let date = new Date(iso_string);

    date.setUTCMinutes(new_utc_minutes);

    return date.getUTCMinutes();
}

$query;
export function set_utc_month(iso_string: string, new_utc_month: nat32): nat32 {
    let date = new Date(iso_string);

    date.setUTCMonth(new_utc_month);

    return date.getUTCMonth();
}

$query;
export function set_utc_seconds(
    iso_string: string,
    new_utc_seconds: nat32
): nat32 {
    let date = new Date(iso_string);

    date.setUTCSeconds(new_utc_seconds);

    return date.getUTCSeconds();
}

$query;
export function to_date_string(iso_string: string): string {
    return new Date(iso_string).toDateString();
}

$query;
export function to_iso_string(iso_string: string): string {
    return new Date(iso_string).toISOString();
}

$query;
export function to_json(iso_string: string): string {
    return new Date(iso_string).toJSON();
}

$query;
export function to_string(iso_string: string): string {
    return new Date(iso_string).toString();
}

$query;
export function to_time_string(iso_string: string): string {
    return new Date(iso_string).toTimeString();
}

$query;
export function to_utc_string(iso_string: string): string {
    return new Date(iso_string).toUTCString();
}

$query;
export function now(): nat64 {
    return BigInt(Date.now());
}

$query;
export function parse(iso_string: string): nat64 {
    return BigInt(Date.parse(iso_string));
}

$query;
export function utc(year: nat32, month: nat32): nat64 {
    return BigInt(Date.UTC(year, month));
}
