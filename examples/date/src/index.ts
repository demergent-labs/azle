import { nat32, nat64, Query } from 'azle';

export function get_date(iso_string: string): Query<nat32> {
    return new Date(iso_string).getDate();
}

export function get_day(iso_string: string): Query<nat32> {
    return new Date(iso_string).getDay();
}

export function get_full_year(iso_string: string): Query<nat32> {
    return new Date(iso_string).getFullYear();
}

export function get_hours(iso_string: string): Query<nat32> {
    return new Date(iso_string).getHours();
}

export function get_milliseconds(iso_string: string): Query<nat32> {
    return new Date(iso_string).getMilliseconds();
}

export function get_minutes(iso_string: string): Query<nat32> {
    return new Date(iso_string).getMinutes();
}

export function get_month(iso_string: string): Query<nat32> {
    return new Date(iso_string).getMonth();
}

export function get_seconds(iso_string: string): Query<nat32> {
    return new Date(iso_string).getSeconds();
}

export function get_time(iso_string: string): Query<nat64> {
    return BigInt(new Date(iso_string).getTime());
}

export function get_timezone_offset(iso_string: string): Query<nat32> {
    return new Date(iso_string).getTimezoneOffset();
}

export function get_utc_date(iso_string: string): Query<nat32> {
    return new Date(iso_string).getUTCDate();
}

export function get_utc_day(iso_string: string): Query<nat32> {
    return new Date(iso_string).getUTCDay();
}

export function get_utc_full_year(iso_string: string): Query<nat32> {
    return new Date(iso_string).getUTCFullYear();
}

export function get_utc_hours(iso_string: string): Query<nat32> {
    return new Date(iso_string).getUTCHours();
}

export function get_utc_milliseconds(iso_string: string): Query<nat32> {
    return new Date(iso_string).getUTCMilliseconds();
}

export function get_utc_minutes(iso_string: string): Query<nat32> {
    return new Date(iso_string).getUTCMinutes();
}

export function get_utc_month(iso_string: string): Query<nat32> {
    return new Date(iso_string).getUTCMonth();
}

export function get_utc_seconds(iso_string: string): Query<nat32> {
    return new Date(iso_string).getUTCSeconds();
}

export function set_date(iso_string: string, new_date: nat32): Query<nat32> {
    let date = new Date(iso_string);

    date.setDate(new_date);

    return date.getDate();
}

export function set_full_year(
    iso_string: string,
    new_full_year: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setFullYear(new_full_year);

    return date.getFullYear();
}

export function set_hours(iso_string: string, new_hours: nat32): Query<nat32> {
    let date = new Date(iso_string);

    date.setHours(new_hours);

    return date.getHours();
}

export function set_milliseconds(
    iso_string: string,
    new_milliseconds: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setMilliseconds(new_milliseconds);

    return date.getMilliseconds();
}

export function set_minutes(
    iso_string: string,
    new_minutes: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setMinutes(new_minutes);

    return date.getMinutes();
}

export function set_month(iso_string: string, new_month: nat32): Query<nat32> {
    let date = new Date(iso_string);

    date.setMonth(new_month);

    return date.getMonth();
}

export function set_seconds(
    iso_string: string,
    new_seconds: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setSeconds(new_seconds);

    return date.getSeconds();
}

export function set_time(iso_string: string, new_time: nat64): Query<nat64> {
    let date = new Date(iso_string);

    date.setTime(Number(new_time));

    return BigInt(date.getTime());
}

export function set_utc_date(
    iso_string: string,
    new_utc_date: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setUTCDate(new_utc_date);

    return date.getUTCDate();
}

export function set_utc_full_year(
    iso_string: string,
    new_utc_full_year: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setUTCFullYear(new_utc_full_year);

    return date.getUTCFullYear();
}

export function set_utc_hours(
    iso_string: string,
    new_utc_hours: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setUTCHours(new_utc_hours);

    return date.getUTCHours();
}

export function set_utc_milliseconds(
    iso_string: string,
    new_utc_milliseconds: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setUTCMilliseconds(new_utc_milliseconds);

    return date.getUTCMilliseconds();
}

export function set_utc_minutes(
    iso_string: string,
    new_utc_minutes: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setUTCMinutes(new_utc_minutes);

    return date.getUTCMinutes();
}

export function set_utc_month(
    iso_string: string,
    new_utc_month: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setUTCMonth(new_utc_month);

    return date.getUTCMonth();
}

export function set_utc_seconds(
    iso_string: string,
    new_utc_seconds: nat32
): Query<nat32> {
    let date = new Date(iso_string);

    date.setUTCSeconds(new_utc_seconds);

    return date.getUTCSeconds();
}

export function to_date_string(iso_string: string): Query<string> {
    return new Date(iso_string).toDateString();
}

export function to_iso_string(iso_string: string): Query<string> {
    return new Date(iso_string).toISOString();
}

export function to_json(iso_string: string): Query<string> {
    return new Date(iso_string).toJSON();
}

export function to_string(iso_string: string): Query<string> {
    return new Date(iso_string).toString();
}

export function to_time_string(iso_string: string): Query<string> {
    return new Date(iso_string).toTimeString();
}

export function to_utc_string(iso_string: string): Query<string> {
    return new Date(iso_string).toUTCString();
}

export function now(): Query<nat64> {
    return BigInt(Date.now());
}

export function parse(iso_string: string): Query<nat64> {
    return BigInt(Date.parse(iso_string));
}

export function utc(year: nat32, month: nat32): Query<nat64> {
    return BigInt(Date.UTC(year, month));
}
