import { Canister, nat32, nat64, query, text } from 'azle';

export default Canister({
    getDate: query([text], nat32, (isoString) => {
        return new Date(isoString).getDate();
    }),
    getDay: query([text], nat32, (isoString) => {
        return new Date(isoString).getDay();
    }),
    getFullYear: query([text], nat32, (isoString) => {
        return new Date(isoString).getFullYear();
    }),
    getHours: query([text], nat32, (isoString) => {
        return new Date(isoString).getHours();
    }),
    getMilliseconds: query([text], nat32, (isoString) => {
        return new Date(isoString).getMilliseconds();
    }),
    getMinutes: query([text], nat32, (isoString) => {
        return new Date(isoString).getMinutes();
    }),
    getMonth: query([text], nat32, (isoString) => {
        return new Date(isoString).getMonth();
    }),
    getSeconds: query([text], nat32, (isoString) => {
        return new Date(isoString).getSeconds();
    }),
    getTime: query([text], nat64, (isoString) => {
        return BigInt(new Date(isoString).getTime());
    }),
    getTimezoneOffset: query([text], nat32, (isoString) => {
        return new Date(isoString).getTimezoneOffset();
    }),
    getUtcDate: query([text], nat32, (isoString) => {
        return new Date(isoString).getUTCDate();
    }),
    getUtcDay: query([text], nat32, (isoString) => {
        return new Date(isoString).getUTCDay();
    }),
    getUtcFullYear: query([text], nat32, (isoString) => {
        return new Date(isoString).getUTCFullYear();
    }),
    getUtcHours: query([text], nat32, (isoString) => {
        return new Date(isoString).getUTCHours();
    }),
    getUtcMilliseconds: query([text], nat32, (isoString) => {
        return new Date(isoString).getUTCMilliseconds();
    }),
    getUtcMinutes: query([text], nat32, (isoString) => {
        return new Date(isoString).getUTCMinutes();
    }),
    getUtcMonth: query([text], nat32, (isoString) => {
        return new Date(isoString).getUTCMonth();
    }),
    getUtcSeconds: query([text], nat32, (isoString) => {
        return new Date(isoString).getUTCSeconds();
    }),
    setDate: query([text, nat32], nat32, (isoString, newDate) => {
        let date = new Date(isoString);

        date.setDate(newDate);

        return date.getDate();
    }),
    setFullYear: query([text, nat32], nat32, (isoString, newFullYear) => {
        let date = new Date(isoString);

        date.setFullYear(newFullYear);

        return date.getFullYear();
    }),
    setHours: query([text, nat32], nat32, (isoString, newHours) => {
        let date = new Date(isoString);

        date.setHours(newHours);

        return date.getHours();
    }),
    setMilliseconds: query(
        [text, nat32],
        nat32,
        (isoString, newMilliseconds) => {
            let date = new Date(isoString);

            date.setMilliseconds(newMilliseconds);

            return date.getMilliseconds();
        }
    ),
    setMinutes: query([text, nat32], nat32, (isoString, newMinutes) => {
        let date = new Date(isoString);

        date.setMinutes(newMinutes);

        return date.getMinutes();
    }),
    setMonth: query([text, nat32], nat32, (isoString, newMonth) => {
        let date = new Date(isoString);

        date.setMonth(newMonth);

        return date.getMonth();
    }),
    setSeconds: query([text, nat32], nat32, (isoString, newSeconds) => {
        let date = new Date(isoString);

        date.setSeconds(newSeconds);

        return date.getSeconds();
    }),
    setTime: query([text, nat64], nat64, (isoString, newTime) => {
        let date = new Date(isoString);

        date.setTime(Number(newTime));

        return BigInt(date.getTime());
    }),
    setUtcDate: query([text, nat32], nat32, (isoString, newUtcDate) => {
        let date = new Date(isoString);

        date.setUTCDate(newUtcDate);

        return date.getUTCDate();
    }),
    setUtcFullYear: query([text, nat32], nat32, (isoString, newUtcFullYear) => {
        let date = new Date(isoString);

        date.setUTCFullYear(newUtcFullYear);

        return date.getUTCFullYear();
    }),
    setUtcHours: query([text, nat32], nat32, (isoString, newUtcHours) => {
        let date = new Date(isoString);

        date.setUTCHours(newUtcHours);

        return date.getUTCHours();
    }),
    setUtcMilliseconds: query(
        [text, nat32],
        nat32,
        (isoString, newUtcMilliseconds) => {
            let date = new Date(isoString);

            date.setUTCMilliseconds(newUtcMilliseconds);

            return date.getUTCMilliseconds();
        }
    ),
    setUtcMinutes: query([text, nat32], nat32, (isoString, newUtcMinutes) => {
        let date = new Date(isoString);

        date.setUTCMinutes(newUtcMinutes);

        return date.getUTCMinutes();
    }),
    setUtcMonth: query([text, nat32], nat32, (isoString, newUtcMonth) => {
        let date = new Date(isoString);

        date.setUTCMonth(newUtcMonth);

        return date.getUTCMonth();
    }),
    setUtcSeconds: query([text, nat32], nat32, (isoString, newUtcSeconds) => {
        let date = new Date(isoString);

        date.setUTCSeconds(newUtcSeconds);

        return date.getUTCSeconds();
    }),
    toDateString: query([text], text, (isoString) => {
        return new Date(isoString).toDateString();
    }),
    toISOString: query([text], text, (isoString) => {
        return new Date(isoString).toISOString();
    }),
    toJSONString: query([text], text, (isoString) => {
        return new Date(isoString).toJSON();
    }),
    toString: query([text], text, (isoString) => {
        return new Date(isoString).toString();
    }),
    toTimeString: query([text], text, (isoString) => {
        return new Date(isoString).toTimeString();
    }),
    toUtcString: query([text], text, (isoString) => {
        return new Date(isoString).toUTCString();
    }),
    now: query([], nat64, () => {
        return BigInt(Date.now());
    }),
    parse: query([text], nat64, (isoString) => {
        return BigInt(Date.parse(isoString));
    }),
    utc: query([nat32, nat32], nat64, (year, month) => {
        return BigInt(Date.UTC(year, month));
    })
});
