import { IDL, query, update } from 'azle';

export default class {
    @query([IDL.Text], nat32)
    getDate(isoString) {
        return new Date(isoString).getDate();
    }
    @query([IDL.Text], nat32)
    getDay(isoString) {
        return new Date(isoString).getDay();
    }
    @query([IDL.Text], nat32)
    getFullYear(isoString) {
        return new Date(isoString).getFullYear();
    }
    @query([IDL.Text], nat32)
    getHours(isoString) {
        return new Date(isoString).getHours();
    }
    @query([IDL.Text], nat32)
    getMilliseconds(isoString) {
        return new Date(isoString).getMilliseconds();
    }
    @query([IDL.Text], nat32)
    getMinutes(isoString) {
        return new Date(isoString).getMinutes();
    }
    @query([IDL.Text], nat32)
    getMonth(isoString) {
        return new Date(isoString).getMonth();
    }
    @query([IDL.Text], nat32)
    getSeconds(isoString) {
        return new Date(isoString).getSeconds();
    }
    @query([IDL.Text], nat64)
    getTime(isoString) {
        return BigInt(new Date(isoString).getTime());
    }
    @query([IDL.Text], nat32)
    getTimezoneOffset(isoString) {
        return new Date(isoString).getTimezoneOffset();
    }
    @query([IDL.Text], nat32)
    getUtcDate(isoString) {
        return new Date(isoString).getUTCDate();
    }
    @query([IDL.Text], nat32)
    getUtcDay(isoString) {
        return new Date(isoString).getUTCDay();
    }
    @query([IDL.Text], nat32)
    getUtcFullYear(isoString) {
        return new Date(isoString).getUTCFullYear();
    }
    @query([IDL.Text], nat32)
    getUtcHours(isoString) {
        return new Date(isoString).getUTCHours();
    }
    @query([IDL.Text], nat32)
    getUtcMilliseconds(isoString) {
        return new Date(isoString).getUTCMilliseconds();
    }
    @query([IDL.Text], nat32)
    getUtcMinutes(isoString) {
        return new Date(isoString).getUTCMinutes();
    }
    @query([IDL.Text], nat32)
    getUtcMonth(isoString) {
        return new Date(isoString).getUTCMonth();
    }
    @query([IDL.Text], nat32)
    getUtcSeconds(isoString) {
        return new Date(isoString).getUTCSeconds();
    }
    @query([IDL.Text, nat32], nat32)
    setDate(isoString, newDate) {
        let date = new Date(isoString);

        date.setDate(newDate);

        return date.getDate();
    }
    @query([IDL.Text, nat32], nat32)
    setFullYear(isoString, newFullYear) {
        let date = new Date(isoString);

        date.setFullYear(newFullYear);

        return date.getFullYear();
    }
    @query([IDL.Text, nat32], nat32)
    setHours(isoString, newHours) {
        let date = new Date(isoString);

        date.setHours(newHours);

        return date.getHours();
    }
    @query([IDL.Text, nat32], nat32)
    setMilliseconds(isoString, newMilliseconds) {
        let date = new Date(isoString);

        date.setMilliseconds(newMilliseconds);

        return date.getMilliseconds();
    }
    @query([IDL.Text, nat32], nat32)
    setMinutes(isoString, newMinutes) {
        let date = new Date(isoString);

        date.setMinutes(newMinutes);

        return date.getMinutes();
    }
    @query([IDL.Text, nat32], nat32)
    setMonth(isoString, newMonth) {
        let date = new Date(isoString);

        date.setMonth(newMonth);

        return date.getMonth();
    }
    @query([IDL.Text, nat32], nat32)
    setSeconds(isoString, newSeconds) {
        let date = new Date(isoString);

        date.setSeconds(newSeconds);

        return date.getSeconds();
    }
    @query([IDL.Text, nat64], nat64)
    setTime(isoString, newTime) {
        let date = new Date(isoString);

        date.setTime(Number(newTime));

        return BigInt(date.getTime());
    }
    @query([IDL.Text, nat32], nat32)
    setUtcDate(isoString, newUtcDate) {
        let date = new Date(isoString);

        date.setUTCDate(newUtcDate);

        return date.getUTCDate();
    }
    @query([IDL.Text, nat32], nat32)
    setUtcFullYear(isoString, newUtcFullYear) {
        let date = new Date(isoString);

        date.setUTCFullYear(newUtcFullYear);

        return date.getUTCFullYear();
    }
    @query([IDL.Text, nat32], nat32)
    setUtcHours(isoString, newUtcHours) {
        let date = new Date(isoString);

        date.setUTCHours(newUtcHours);

        return date.getUTCHours();
    }
    @query([IDL.Text, nat32], nat32)
    setUtcMilliseconds(isoString, newUtcMilliseconds) {
        let date = new Date(isoString);

        date.setUTCMilliseconds(newUtcMilliseconds);

        return date.getUTCMilliseconds();
    }
    @query([IDL.Text, nat32], nat32)
    setUtcMinutes(isoString, newUtcMinutes) {
        let date = new Date(isoString);

        date.setUTCMinutes(newUtcMinutes);

        return date.getUTCMinutes();
    }
    @query([IDL.Text, nat32], nat32)
    setUtcMonth(isoString, newUtcMonth) {
        let date = new Date(isoString);

        date.setUTCMonth(newUtcMonth);

        return date.getUTCMonth();
    }
    @query([IDL.Text, nat32], nat32)
    setUtcSeconds(isoString, newUtcSeconds) {
        let date = new Date(isoString);

        date.setUTCSeconds(newUtcSeconds);

        return date.getUTCSeconds();
    }
    @query([IDL.Text], IDL.Text)
    toDateString(isoString) {
        return new Date(isoString).toDateString();
    }
    @query([IDL.Text], IDL.Text)
    toISOString(isoString) {
        return new Date(isoString).toISOString();
    }
    @query([IDL.Text], IDL.Text)
    toJSONString(isoString) {
        return new Date(isoString).toJSON();
    }
    @query([IDL.Text], IDL.Text)
    toString(isoString) {
        return new Date(isoString).toString();
    }
    @query([IDL.Text], IDL.Text)
    toTimeString(isoString) {
        return new Date(isoString).toTimeString();
    }
    @query([IDL.Text], IDL.Text)
    toUtcString(isoString) {
        return new Date(isoString).toUTCString();
    }
    @query([], nat64)
    now() {
        return BigInt(Date.now());
    }
    @query([IDL.Text], nat64)
    parse(isoString) {
        return BigInt(Date.parse(isoString));
    }
    @query([nat32, nat32], nat64)
    utc(year, month) {
        return BigInt(Date.UTC(year, month));
    }
}
