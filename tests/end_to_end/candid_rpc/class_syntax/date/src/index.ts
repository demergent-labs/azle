import { IDL, query } from 'azle';

export default class {
    @query([IDL.Text], IDL.Nat32)
    getDate(isoString: string): number {
        return new Date(isoString).getDate();
    }

    @query([IDL.Text], IDL.Nat32)
    getDay(isoString: string): number {
        return new Date(isoString).getDay();
    }

    @query([IDL.Text], IDL.Nat32)
    getFullYear(isoString: string): number {
        return new Date(isoString).getFullYear();
    }

    @query([IDL.Text], IDL.Nat32)
    getHours(isoString: string): number {
        return new Date(isoString).getHours();
    }

    @query([IDL.Text], IDL.Nat32)
    getMilliseconds(isoString: string): number {
        return new Date(isoString).getMilliseconds();
    }

    @query([IDL.Text], IDL.Nat32)
    getMinutes(isoString: string): number {
        return new Date(isoString).getMinutes();
    }

    @query([IDL.Text], IDL.Nat32)
    getMonth(isoString: string): number {
        return new Date(isoString).getMonth();
    }

    @query([IDL.Text], IDL.Nat32)
    getSeconds(isoString: string): number {
        return new Date(isoString).getSeconds();
    }

    @query([IDL.Text], IDL.Nat64)
    getTime(isoString: string): bigint {
        return BigInt(new Date(isoString).getTime());
    }

    @query([IDL.Text], IDL.Nat32)
    getTimezoneOffset(isoString: string): number {
        return new Date(isoString).getTimezoneOffset();
    }

    @query([IDL.Text], IDL.Nat32)
    getUtcDate(isoString: string): number {
        return new Date(isoString).getUTCDate();
    }

    @query([IDL.Text], IDL.Nat32)
    getUtcDay(isoString: string): number {
        return new Date(isoString).getUTCDay();
    }

    @query([IDL.Text], IDL.Nat32)
    getUtcFullYear(isoString: string): number {
        return new Date(isoString).getUTCFullYear();
    }

    @query([IDL.Text], IDL.Nat32)
    getUtcHours(isoString: string): number {
        return new Date(isoString).getUTCHours();
    }

    @query([IDL.Text], IDL.Nat32)
    getUtcMilliseconds(isoString: string): number {
        return new Date(isoString).getUTCMilliseconds();
    }

    @query([IDL.Text], IDL.Nat32)
    getUtcMinutes(isoString: string): number {
        return new Date(isoString).getUTCMinutes();
    }

    @query([IDL.Text], IDL.Nat32)
    getUtcMonth(isoString: string): number {
        return new Date(isoString).getUTCMonth();
    }

    @query([IDL.Text], IDL.Nat32)
    getUtcSeconds(isoString: string): number {
        return new Date(isoString).getUTCSeconds();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setDate(isoString: string, newDate: number): number {
        let date = new Date(isoString);

        date.setDate(newDate);

        return date.getDate();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setFullYear(isoString: string, newFullYear: number): number {
        let date = new Date(isoString);

        date.setFullYear(newFullYear);

        return date.getFullYear();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setHours(isoString: string, newHours: number): number {
        let date = new Date(isoString);

        date.setHours(newHours);

        return date.getHours();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setMilliseconds(isoString: string, newMilliseconds: number): number {
        let date = new Date(isoString);

        date.setMilliseconds(newMilliseconds);

        return date.getMilliseconds();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setMinutes(isoString: string, newMinutes: number): number {
        let date = new Date(isoString);

        date.setMinutes(newMinutes);

        return date.getMinutes();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setMonth(isoString: string, newMonth: number): number {
        let date = new Date(isoString);

        date.setMonth(newMonth);

        return date.getMonth();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setSeconds(isoString: string, newSeconds: number): number {
        let date = new Date(isoString);

        date.setSeconds(newSeconds);

        return date.getSeconds();
    }

    @query([IDL.Text, IDL.Nat64], IDL.Nat64)
    setTime(isoString: string, newTime: number) {
        let date = new Date(isoString);

        date.setTime(Number(newTime));

        return BigInt(date.getTime());
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setUtcDate(isoString: string, newUtcDate: number): number {
        let date = new Date(isoString);

        date.setUTCDate(newUtcDate);

        return date.getUTCDate();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setUtcFullYear(isoString: string, newUtcFullYear: number): number {
        let date = new Date(isoString);

        date.setUTCFullYear(newUtcFullYear);

        return date.getUTCFullYear();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setUtcHours(isoString: string, newUtcHours: number): number {
        let date = new Date(isoString);

        date.setUTCHours(newUtcHours);

        return date.getUTCHours();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setUtcMilliseconds(isoString: string, newUtcMilliseconds: number): number {
        let date = new Date(isoString);

        date.setUTCMilliseconds(newUtcMilliseconds);

        return date.getUTCMilliseconds();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setUtcMinutes(isoString: string, newUtcMinutes: number): number {
        let date = new Date(isoString);

        date.setUTCMinutes(newUtcMinutes);

        return date.getUTCMinutes();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setUtcMonth(isoString: string, newUtcMonth: number): number {
        let date = new Date(isoString);

        date.setUTCMonth(newUtcMonth);

        return date.getUTCMonth();
    }

    @query([IDL.Text, IDL.Nat32], IDL.Nat32)
    setUtcSeconds(isoString: string, newUtcSeconds: number): number {
        let date = new Date(isoString);

        date.setUTCSeconds(newUtcSeconds);

        return date.getUTCSeconds();
    }

    @query([IDL.Text], IDL.Text)
    toDateString(isoString: string): string {
        return new Date(isoString).toDateString();
    }

    @query([IDL.Text], IDL.Text)
    toISOString(isoString: string): string {
        return new Date(isoString).toISOString();
    }

    @query([IDL.Text], IDL.Text)
    toJSONString(isoString: string): string {
        return new Date(isoString).toJSON();
    }

    @query([IDL.Text], IDL.Text)
    toString(isoString: string): string {
        return new Date(isoString).toString();
    }

    @query([IDL.Text], IDL.Text)
    toTimeString(isoString: string): string {
        return new Date(isoString).toTimeString();
    }

    @query([IDL.Text], IDL.Text)
    toUtcString(isoString: string): string {
        return new Date(isoString).toUTCString();
    }

    @query([], IDL.Nat64)
    now(): bigint {
        return BigInt(Date.now());
    }

    @query([IDL.Text], IDL.Nat64)
    parse(isoString: string): bigint {
        return BigInt(Date.parse(isoString));
    }

    @query([IDL.Nat32, IDL.Nat32], IDL.Nat64)
    utc(year: number, month: number): bigint {
        return BigInt(Date.UTC(year, month));
    }
}
