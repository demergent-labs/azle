import { nat32, nat64, query, Service, text } from 'azle';

export default class extends Service {
    @query([text], nat32)
    getDate(isoString: text): nat32 {
        return new Date(isoString).getDate();
    }

    @query([text], nat32)
    getDay(isoString: text): nat32 {
        return new Date(isoString).getDay();
    }

    @query([text], nat32)
    getFullYear(isoString: text): nat32 {
        return new Date(isoString).getFullYear();
    }

    @query([text], nat32)
    getHours(isoString: text): nat32 {
        return new Date(isoString).getHours();
    }

    @query([text], nat32)
    getMilliseconds(isoString: text): nat32 {
        return new Date(isoString).getMilliseconds();
    }

    @query([text], nat32)
    getMinutes(isoString: text): nat32 {
        return new Date(isoString).getMinutes();
    }

    @query([text], nat32)
    getMonth(isoString: text): nat32 {
        return new Date(isoString).getMonth();
    }

    @query([text], nat32)
    getSeconds(isoString: text): nat32 {
        return new Date(isoString).getSeconds();
    }

    @query([text], nat64)
    getTime(isoString: text): nat64 {
        return BigInt(new Date(isoString).getTime());
    }

    @query([text], nat32)
    getTimezoneOffset(isoString: text): nat32 {
        return new Date(isoString).getTimezoneOffset();
    }

    @query([text], nat32)
    getUtcDate(isoString: text): nat32 {
        return new Date(isoString).getUTCDate();
    }

    @query([text], nat32)
    getUtcDay(isoString: text): nat32 {
        return new Date(isoString).getUTCDay();
    }

    @query([text], nat32)
    getUtcFullYear(isoString: text): nat32 {
        return new Date(isoString).getUTCFullYear();
    }

    @query([text], nat32)
    getUtcHours(isoString: text): nat32 {
        return new Date(isoString).getUTCHours();
    }

    @query([text], nat32)
    getUtcMilliseconds(isoString: text): nat32 {
        return new Date(isoString).getUTCMilliseconds();
    }

    @query([text], nat32)
    getUtcMinutes(isoString: text): nat32 {
        return new Date(isoString).getUTCMinutes();
    }

    @query([text], nat32)
    getUtcMonth(isoString: text): nat32 {
        return new Date(isoString).getUTCMonth();
    }

    @query([text], nat32)
    getUtcSeconds(isoString: text): nat32 {
        return new Date(isoString).getUTCSeconds();
    }

    @query([text, nat32], nat32)
    setDate(isoString: text, newDate: nat32): nat32 {
        let date = new Date(isoString);

        date.setDate(newDate);

        return date.getDate();
    }

    @query([text, nat32], nat32)
    setFullYear(isoString: text, newFullYear: nat32): nat32 {
        let date = new Date(isoString);

        date.setFullYear(newFullYear);

        return date.getFullYear();
    }

    @query([text, nat32], nat32)
    setHours(isoString: text, newHours: nat32): nat32 {
        let date = new Date(isoString);

        date.setHours(newHours);

        return date.getHours();
    }

    @query([text, nat32], nat32)
    setMilliseconds(isoString: text, newMilliseconds: nat32): nat32 {
        let date = new Date(isoString);

        date.setMilliseconds(newMilliseconds);

        return date.getMilliseconds();
    }

    @query([text, nat32], nat32)
    setMinutes(isoString: text, newMinutes: nat32): nat32 {
        let date = new Date(isoString);

        date.setMinutes(newMinutes);

        return date.getMinutes();
    }

    @query([text, nat32], nat32)
    setMonth(isoString: text, newMonth: nat32): nat32 {
        let date = new Date(isoString);

        date.setMonth(newMonth);

        return date.getMonth();
    }

    @query([text, nat32], nat32)
    setSeconds(isoString: text, newSeconds: nat32): nat32 {
        let date = new Date(isoString);

        date.setSeconds(newSeconds);

        return date.getSeconds();
    }

    @query([text, nat64], nat64)
    setTime(isoString: text, newTime: nat64): nat64 {
        let date = new Date(isoString);

        date.setTime(Number(newTime));

        return BigInt(date.getTime());
    }

    @query([text, nat32], nat32)
    setUtcDate(isoString: text, newUtcDate: nat32): nat32 {
        let date = new Date(isoString);

        date.setUTCDate(newUtcDate);

        return date.getUTCDate();
    }

    @query([text, nat32], nat32)
    setUtcFullYear(isoString: text, newUtcFullYear: nat32): nat32 {
        let date = new Date(isoString);

        date.setUTCFullYear(newUtcFullYear);

        return date.getUTCFullYear();
    }

    @query([text, nat32], nat32)
    setUtcHours(isoString: text, newUtcHours: nat32): nat32 {
        let date = new Date(isoString);

        date.setUTCHours(newUtcHours);

        return date.getUTCHours();
    }

    @query([text, nat32], nat32)
    setUtcMilliseconds(isoString: text, newUtcMilliseconds: nat32): nat32 {
        let date = new Date(isoString);

        date.setUTCMilliseconds(newUtcMilliseconds);

        return date.getUTCMilliseconds();
    }

    @query([text, nat32], nat32)
    setUtcMinutes(isoString: text, newUtcMinutes: nat32): nat32 {
        let date = new Date(isoString);

        date.setUTCMinutes(newUtcMinutes);

        return date.getUTCMinutes();
    }

    @query([text, nat32], nat32)
    setUtcMonth(isoString: text, newUtcMonth: nat32): nat32 {
        let date = new Date(isoString);

        date.setUTCMonth(newUtcMonth);

        return date.getUTCMonth();
    }

    @query([text, nat32], nat32)
    setUtcSeconds(isoString: text, newUtcSeconds: nat32): nat32 {
        let date = new Date(isoString);

        date.setUTCSeconds(newUtcSeconds);

        return date.getUTCSeconds();
    }

    @query([text], text)
    toDateString(isoString: text): text {
        return new Date(isoString).toDateString();
    }

    @query([text], text)
    toISOString(isoString: text): text {
        return new Date(isoString).toISOString();
    }

    @query([text], text)
    toJSON(isoString: text): text {
        return new Date(isoString).toJSON();
    }

    @query([text], text)
    toString(isoString: text): text {
        return new Date(isoString).toString();
    }

    @query([text], text)
    toTimeString(isoString: text): text {
        return new Date(isoString).toTimeString();
    }

    @query([text], text)
    toUtcString(isoString: text): text {
        return new Date(isoString).toUTCString();
    }

    @query([], nat64)
    now(): nat64 {
        return BigInt(Date.now());
    }

    @query([text], nat64)
    parse(isoString: text): nat64 {
        return BigInt(Date.parse(isoString));
    }

    @query([nat32, nat32], nat64)
    utc(year: nat32, month: nat32): nat64 {
        return BigInt(Date.UTC(year, month));
    }
}
