import { nat32, nat64, query, text } from 'azle';

export default class {
    @query([text], nat32)
    getDate(isoString) {
        return new Date(isoString).getDate();
    }
    @query([text], nat32)
    getDay(isoString) {
        return new Date(isoString).getDay();
    }
    @query([text], nat32)
    getFullYear(isoString) {
        return new Date(isoString).getFullYear();
    }
    @query([text], nat32)
    getHours(isoString) {
        return new Date(isoString).getHours();
    }
    @query([text], nat32)
    getMilliseconds(isoString) {
        return new Date(isoString).getMilliseconds();
    }
    @query([text], nat32)
    getMinutes(isoString) {
        return new Date(isoString).getMinutes();
    }
    @query([text], nat32)
    getMonth(isoString) {
        return new Date(isoString).getMonth();
    }
    @query([text], nat32)
    getSeconds(isoString) {
        return new Date(isoString).getSeconds();
    }
    @query([text], nat64)
    getTime(isoString) {
        return BigInt(new Date(isoString).getTime());
    }
    @query([text], nat32)
    getTimezoneOffset(isoString) {
        return new Date(isoString).getTimezoneOffset();
    }
    @query([text], nat32)
    getUtcDate(isoString) {
        return new Date(isoString).getUTCDate();
    }
    @query([text], nat32)
    getUtcDay(isoString) {
        return new Date(isoString).getUTCDay();
    }
    @query([text], nat32)
    getUtcFullYear(isoString) {
        return new Date(isoString).getUTCFullYear();
    }
    @query([text], nat32)
    getUtcHours(isoString) {
        return new Date(isoString).getUTCHours();
    }
    @query([text], nat32)
    getUtcMilliseconds(isoString) {
        return new Date(isoString).getUTCMilliseconds();
    }
    @query([text], nat32)
    getUtcMinutes(isoString) {
        return new Date(isoString).getUTCMinutes();
    }
    @query([text], nat32)
    getUtcMonth(isoString) {
        return new Date(isoString).getUTCMonth();
    }
    @query([text], nat32)
    getUtcSeconds(isoString) {
        return new Date(isoString).getUTCSeconds();
    }
    @query([text, nat32], nat32)
    setDate(isoString, newDate) {
        let date = new Date(isoString);

        date.setDate(newDate);

        return date.getDate();
    }
    @query([text, nat32], nat32)
    setFullYear(isoString, newFullYear) {
        let date = new Date(isoString);

        date.setFullYear(newFullYear);

        return date.getFullYear();
    }
    @query([text, nat32], nat32)
    setHours(isoString, newHours) {
        let date = new Date(isoString);

        date.setHours(newHours);

        return date.getHours();
    }
    @query([text, nat32], nat32)
    setMilliseconds(isoString, newMilliseconds) {
        let date = new Date(isoString);

        date.setMilliseconds(newMilliseconds);

        return date.getMilliseconds();
    }
    @query([text, nat32], nat32)
    setMinutes(isoString, newMinutes) {
        let date = new Date(isoString);

        date.setMinutes(newMinutes);

        return date.getMinutes();
    }
    @query([text, nat32], nat32)
    setMonth(isoString, newMonth) {
        let date = new Date(isoString);

        date.setMonth(newMonth);

        return date.getMonth();
    }
    @query([text, nat32], nat32)
    setSeconds(isoString, newSeconds) {
        let date = new Date(isoString);

        date.setSeconds(newSeconds);

        return date.getSeconds();
    }
    @query([text, nat64], nat64)
    setTime(isoString, newTime) {
        let date = new Date(isoString);

        date.setTime(Number(newTime));

        return BigInt(date.getTime());
    }
    @query([text, nat32], nat32)
    setUtcDate(isoString, newUtcDate) {
        let date = new Date(isoString);

        date.setUTCDate(newUtcDate);

        return date.getUTCDate();
    }
    @query([text, nat32], nat32)
    setUtcFullYear(isoString, newUtcFullYear) {
        let date = new Date(isoString);

        date.setUTCFullYear(newUtcFullYear);

        return date.getUTCFullYear();
    }
    @query([text, nat32], nat32)
    setUtcHours(isoString, newUtcHours) {
        let date = new Date(isoString);

        date.setUTCHours(newUtcHours);

        return date.getUTCHours();
    }
    @query([text, nat32], nat32)
    setUtcMilliseconds(isoString, newUtcMilliseconds) {
        let date = new Date(isoString);

        date.setUTCMilliseconds(newUtcMilliseconds);

        return date.getUTCMilliseconds();
    }
    @query([text, nat32], nat32)
    setUtcMinutes(isoString, newUtcMinutes) {
        let date = new Date(isoString);

        date.setUTCMinutes(newUtcMinutes);

        return date.getUTCMinutes();
    }
    @query([text, nat32], nat32)
    setUtcMonth(isoString, newUtcMonth) {
        let date = new Date(isoString);

        date.setUTCMonth(newUtcMonth);

        return date.getUTCMonth();
    }
    @query([text, nat32], nat32)
    setUtcSeconds(isoString, newUtcSeconds) {
        let date = new Date(isoString);

        date.setUTCSeconds(newUtcSeconds);

        return date.getUTCSeconds();
    }
    @query([text], text)
    toDateString(isoString) {
        return new Date(isoString).toDateString();
    }
    @query([text], text)
    toISOString(isoString) {
        return new Date(isoString).toISOString();
    }
    @query([text], text)
    toJSONString(isoString) {
        return new Date(isoString).toJSON();
    }
    @query([text], text)
    toString(isoString) {
        return new Date(isoString).toString();
    }
    @query([text], text)
    toTimeString(isoString) {
        return new Date(isoString).toTimeString();
    }
    @query([text], text)
    toUtcString(isoString) {
        return new Date(isoString).toUTCString();
    }
    @query([], nat64)
    now() {
        return BigInt(Date.now());
    }
    @query([text], nat64)
    parse(isoString) {
        return BigInt(Date.parse(isoString));
    }
    @query([nat32, nat32], nat64)
    utc(year, month) {
        return BigInt(Date.UTC(year, month));
    }
}
