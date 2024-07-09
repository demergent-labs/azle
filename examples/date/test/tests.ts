import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/date/date.did.d';

// NOTE: The IC has not concept of a timezone since it's a world computer. It
// uses UTC so getUTCDate and getDate will be the same. So when comparing times
// the tests always have to use getUTCDate, or getUTCFullYear, etc or else you
// will end up comparing your local time to UTC time.
export function getTests(dateCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('executes getDate on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getDate(date.toISOString());
            const expected = date.getUTCDate();

            expect(result).toBe(expected);
        });

        it('executes getDay on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getDay(date.toISOString());
            const expected = date.getUTCDay();

            expect(result).toBe(expected);
        });

        it('executes getFullYear on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getFullYear(date.toISOString());
            const expected = date.getUTCFullYear();

            expect(result).toBe(expected);
        });

        it('executes getHours on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getHours(date.toISOString());
            const expected = date.getUTCHours(); // The canister's local time is UTC, thus we check with getUTCHours

            expect(result).toBe(expected);
        });

        it('executes getMilliseconds on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getMilliseconds(
                date.toISOString()
            );
            const expected = date.getUTCMilliseconds();

            expect(result).toBe(expected);
        });

        it('executes getMinutes on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getMinutes(date.toISOString());
            const expected = date.getUTCMinutes();

            expect(result).toBe(expected);
        });

        it('executes getMonth on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getMonth(date.toISOString());
            const expected = date.getUTCMonth();

            expect(result).toBe(expected);
        });

        it('executes getSeconds on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getSeconds(date.toISOString());
            const expected = date.getUTCSeconds();

            expect(result).toBe(expected);
        });

        it('executes getTime on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getTime(date.toISOString());
            const expected = BigInt(date.getTime());

            expect(result).toBe(expected);
        });

        it('executes getTimezoneOffset on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getTimezoneOffset(
                date.toISOString()
            );
            const expected =
                date.getTimezoneOffset() - date.getTimezoneOffset(); // The canister's local time is UTC, thus the timezone offset should be 0

            expect(result).toBe(expected);
        });

        it('executes getUtcDate on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getUtcDate(date.toISOString());
            const expected = date.getUTCDate();

            expect(result).toBe(expected);
        });

        it('executes getUtcDay on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getUtcDay(date.toISOString());
            const expected = date.getUTCDay();

            expect(result).toBe(expected);
        });

        it('executes getUtcFullYear on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getUtcFullYear(
                date.toISOString()
            );
            const expected = date.getUTCFullYear();

            expect(result).toBe(expected);
        });

        it('executes getUtcHours on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getUtcHours(date.toISOString());
            const expected = date.getUTCHours();

            expect(result).toBe(expected);
        });

        it('executes getUtcMinutes on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getUtcMinutes(date.toISOString());
            const expected = date.getUTCMinutes();

            expect(result).toBe(expected);
        });

        it('executes getUtcMonth on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getUtcMonth(date.toISOString());
            const expected = date.getUTCMonth();

            expect(result).toBe(expected);
        });

        it('executes getUtcSeconds on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.getUtcSeconds(date.toISOString());
            const expected = date.getUTCSeconds();

            expect(result).toBe(expected);
        });

        it('executes setDate on a canister', async () => {
            let date = new Date();

            const newDate = 0;

            const result = await dateCanister.setDate(
                date.toISOString(),
                newDate
            );

            date.setDate(newDate);

            const expected = date.getDate();

            expect(result).toBe(expected);
        });

        it('executes setFullYear on a canister', async () => {
            let date = new Date();

            const newFullYear = 1996;

            const result = await dateCanister.setFullYear(
                date.toISOString(),
                newFullYear
            );

            date.setFullYear(newFullYear);

            const expected = date.getFullYear();

            expect(result).toBe(expected);
        });

        it('executes setHours on a canister', async () => {
            let date = new Date();

            const newHours = 22;

            const result = await dateCanister.setHours(
                date.toISOString(),
                newHours
            );

            date.setHours(newHours);

            const expected = date.getHours();

            expect(result).toBe(expected);
        });

        it('executes setMilliseconds on a canister', async () => {
            let date = new Date();

            const newMilliseconds = 500;

            const result = await dateCanister.setMilliseconds(
                date.toISOString(),
                newMilliseconds
            );

            date.setMilliseconds(newMilliseconds);

            const expected = date.getMilliseconds();

            expect(result).toBe(expected);
        });

        it('executes setMinutes on a canister', async () => {
            let date = new Date();

            const newMinutes = 46;

            const result = await dateCanister.setMinutes(
                date.toISOString(),
                newMinutes
            );

            date.setMinutes(newMinutes);

            const expected = date.getMinutes();

            expect(result).toBe(expected);
        });

        it('executes setMonth on a canister', async () => {
            let date = new Date();

            const newMonth = 11;

            const result = await dateCanister.setMonth(
                date.toISOString(),
                newMonth
            );

            date.setMonth(newMonth);

            const expected = date.getMonth();

            expect(result).toBe(expected);
        });

        it('executes setSeconds on a canister', async () => {
            let date = new Date();

            const newSeconds = 32;

            const result = await dateCanister.setSeconds(
                date.toISOString(),
                newSeconds
            );

            date.setSeconds(newSeconds);

            const expected = date.getSeconds();

            expect(result).toBe(expected);
        });

        it('executes setTime on a canister', async () => {
            let date = new Date();

            const newTime = 1_658_863_501_294;

            const result = await dateCanister.setTime(
                date.toISOString(),
                BigInt(newTime)
            );

            date.setTime(newTime);

            const expected = date.getTime();

            expect(Number(result)).toBe(expected);
        });

        it('executes setUtcDate on a canister', async () => {
            let date = new Date();

            const newUtcDate = 1;

            const result = await dateCanister.setUtcDate(
                date.toISOString(),
                newUtcDate
            );

            date.setUTCDate(newUtcDate);

            const expected = date.getUTCDate();

            expect(result).toBe(expected);
        });

        it('executes setUtcFullYear on a canister', async () => {
            let date = new Date();

            const newUtcFullYear = 1987;

            const result = await dateCanister.setUtcFullYear(
                date.toISOString(),
                newUtcFullYear
            );

            date.setUTCFullYear(newUtcFullYear);

            const expected = date.getUTCFullYear();

            expect(result).toBe(expected);
        });

        it('executes setUtcHours on a canister', async () => {
            let date = new Date();

            const newUtcHours = 14;

            const result = await dateCanister.setUtcHours(
                date.toISOString(),
                newUtcHours
            );

            date.setUTCHours(newUtcHours);

            const expected = date.getUTCHours();

            expect(result).toBe(expected);
        });

        it('executes setUtcMilliseconds on a canister', async () => {
            let date = new Date();

            const newUtcMilliseconds = 900;

            const result = await dateCanister.setUtcMilliseconds(
                date.toISOString(),
                newUtcMilliseconds
            );

            date.setUTCMilliseconds(newUtcMilliseconds);

            const expected = date.getUTCMilliseconds();

            expect(result).toBe(expected);
        });

        it('executes setUtcMinutes on a canister', async () => {
            let date = new Date();

            const newUtcMinutes = 23;

            const result = await dateCanister.setUtcMinutes(
                date.toISOString(),
                newUtcMinutes
            );

            date.setUTCMinutes(newUtcMinutes);

            const expected = date.getUTCMinutes();

            expect(result).toBe(expected);
        });

        it('executes setUtcMonth on a canister', async () => {
            let date = new Date();

            const newUtcMonth = 6;

            const result = await dateCanister.setUtcMonth(
                date.toISOString(),
                newUtcMonth
            );

            date.setUTCMonth(newUtcMonth);

            const expected = date.getUTCMonth();

            expect(result).toBe(expected);
        });

        it('executes setUtcSeconds on a canister', async () => {
            let date = new Date();

            const newUtcSeconds = 55;

            const result = await dateCanister.setUtcSeconds(
                date.toISOString(),
                newUtcSeconds
            );

            date.setUTCSeconds(newUtcSeconds);

            const expected = date.getUTCSeconds();

            expect(result).toBe(expected);
        });

        it('executes toDateString on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.dateToDateString(
                date.toISOString()
            );
            type Options = {
                timeZone: 'UTC';
                weekday: 'short';
                month: 'short';
                day: '2-digit';
                year: 'numeric';
            };
            const options: Options = {
                timeZone: 'UTC',
                weekday: 'short',
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            };
            const expected = date
                .toLocaleDateString('en-US', options)
                .replace(/,/g, '');

            expect(result).toBe(expected);
        });

        it('executes toIsoString on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.dateToISOString(
                date.toISOString()
            );
            const expected = date.toISOString();

            expect(result).toBe(expected);
        });

        it('executes toJson on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.dateToJSONString(
                date.toISOString()
            );
            const expected = date.toJSON();

            expect(result).toBe(expected);
        });

        it('executes toString on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.dateToString(date.toISOString());
            const resultSubstring = result.substring(0, result.indexOf(' GMT'));

            const expected = new Date(
                date.getTime() + date.getTimezoneOffset() * 60_000
            ); // the canister uses UTC time, thus we do a conversion
            const expectedString = expected.toString();
            const expectedSubstring = expectedString.substring(
                0,
                expectedString.indexOf(' GMT')
            );

            expect(resultSubstring).toBe(expectedSubstring);
        });

        it('executes toTimeString on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.dateToTimeString(
                date.toISOString()
            );
            const resultSubstring = result.substring(0, result.indexOf(' GMT'));

            const expected = new Date(
                date.getTime() + date.getTimezoneOffset() * 60_000
            ); // the canister uses UTC time, thus we do a conversion
            const expectedString = expected.toTimeString();
            const expectedSubstring = expectedString.substring(
                0,
                expectedString.indexOf(' GMT')
            );

            expect(resultSubstring).toBe(expectedSubstring);
        });

        it('executes toUtcString on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.dateToUtcString(
                date.toISOString()
            );
            const expected = date.toUTCString();

            expect(result).toBe(expected);
        });

        it('executes now on a canister', async () => {
            const timeBefore = new Date().getTime();
            const result = await dateCanister.now();
            const timeAfter = new Date().getTime();

            expect(result).toBeGreaterThanOrEqual(timeBefore - 30_000);
            expect(result).toBeLessThanOrEqual(timeAfter + 30_000);
        });

        it('executes parse on a canister', async () => {
            const date = new Date();

            const result = await dateCanister.parse(date.toISOString());
            const expected = BigInt(Date.parse(date.toISOString()));

            expect(result).toBe(expected);
        });

        it('executes utc on a canister', async () => {
            const result = await dateCanister.utc(2002, 4);
            const expected = BigInt(Date.UTC(2002, 4));

            expect(result).toBe(expected);
        });
    };
}
