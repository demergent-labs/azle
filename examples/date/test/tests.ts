import { ActorSubclass } from '@dfinity/agent';
import { createTestResult, equals, Test } from 'azle/test';

import { _SERVICE } from './dfx_generated/date/date.did.d';

// NOTE: The IC has not concept of a timezone since it's a world computer. It
// uses UTC so getUTCDate and getDate will be the same. So when comparing times
// the tests always have to use getUTCDate, or getUTCFullYear, etc or else you
// will end up comparing your local time to UTC time.
export function getTests(dateCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'getDate',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getDate(date.toISOString());
                const expected = date.getUTCDate();

                return equals(result, expected);
            }
        },
        {
            name: 'getDay',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getDay(date.toISOString());
                const expected = date.getUTCDay();

                return equals(result, expected);
            }
        },
        {
            name: 'getFullYear',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getFullYear(
                    date.toISOString()
                );
                const expected = date.getUTCFullYear();

                return equals(result, expected);
            }
        },
        {
            name: 'getHours',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getHours(date.toISOString());
                const expected = date.getUTCHours(); // The canister's local time is UTC, thus we check with getUTCHours

                return equals(result, expected);
            }
        },
        {
            name: 'getMilliseconds',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getMilliseconds(
                    date.toISOString()
                );
                const expected = date.getUTCMilliseconds();

                return equals(result, expected);
            }
        },
        {
            name: 'getMinutes',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getMinutes(
                    date.toISOString()
                );
                const expected = date.getUTCMinutes();

                return equals(result, expected);
            }
        },
        {
            name: 'getMonth',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getMonth(date.toISOString());
                const expected = date.getUTCMonth();

                return equals(result, expected);
            }
        },
        {
            name: 'getSeconds',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getSeconds(
                    date.toISOString()
                );
                const expected = date.getUTCSeconds();

                return equals(result, expected);
            }
        },
        {
            name: 'getTime',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getTime(date.toISOString());
                const expected = BigInt(date.getTime());

                return equals(result, expected);
            }
        },
        {
            name: 'getTimezoneOffset',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getTimezoneOffset(
                    date.toISOString()
                );
                const expected =
                    date.getTimezoneOffset() - date.getTimezoneOffset(); // The canister's local time is UTC, thus the timezone offset should be 0

                return equals(result, expected);
            }
        },
        {
            name: 'getUtcDate',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getUtcDate(
                    date.toISOString()
                );
                const expected = date.getUTCDate();

                return equals(result, expected);
            }
        },
        {
            name: 'getUtcDay',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getUtcDay(date.toISOString());
                const expected = date.getUTCDay();

                return equals(result, expected);
            }
        },
        {
            name: 'getUtcFullYear',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getUtcFullYear(
                    date.toISOString()
                );
                const expected = date.getUTCFullYear();

                return equals(result, expected);
            }
        },
        {
            name: 'getUtcHours',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getUtcHours(
                    date.toISOString()
                );
                const expected = date.getUTCHours();

                return equals(result, expected);
            }
        },
        {
            name: 'getUtcMinutes',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getUtcMinutes(
                    date.toISOString()
                );
                const expected = date.getUTCMinutes();

                return equals(result, expected);
            }
        },
        {
            name: 'getUtcMonth',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getUtcMonth(
                    date.toISOString()
                );
                const expected = date.getUTCMonth();

                return equals(result, expected);
            }
        },
        {
            name: 'getUtcSeconds',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.getUtcSeconds(
                    date.toISOString()
                );
                const expected = date.getUTCSeconds();

                return equals(result, expected);
            }
        },
        {
            name: 'setDate',
            test: async () => {
                let date = new Date();

                const newDate = 0;

                const result = await dateCanister.setDate(
                    date.toISOString(),
                    newDate
                );

                date.setDate(newDate);

                const expected = date.getDate();

                return equals(result, expected);
            }
        },
        {
            name: 'setFullYear',
            test: async () => {
                let date = new Date();

                const newFullYear = 1996;

                const result = await dateCanister.setFullYear(
                    date.toISOString(),
                    newFullYear
                );

                date.setFullYear(newFullYear);

                const expected = date.getFullYear();

                return equals(result, expected);
            }
        },
        {
            name: 'setHours',
            test: async () => {
                let date = new Date();

                const newHours = 22;

                const result = await dateCanister.setHours(
                    date.toISOString(),
                    newHours
                );

                date.setHours(newHours);

                const expected = date.getHours();

                return equals(result, expected);
            }
        },
        {
            name: 'setMilliseconds',
            test: async () => {
                let date = new Date();

                const newMilliseconds = 500;

                const result = await dateCanister.setMilliseconds(
                    date.toISOString(),
                    newMilliseconds
                );

                date.setMilliseconds(newMilliseconds);

                const expected = date.getMilliseconds();

                return equals(result, expected);
            }
        },
        {
            name: 'setMinutes',
            test: async () => {
                let date = new Date();

                const newMinutes = 46;

                const result = await dateCanister.setMinutes(
                    date.toISOString(),
                    newMinutes
                );

                date.setMinutes(newMinutes);

                const expected = date.getMinutes();

                return equals(result, expected);
            }
        },
        {
            name: 'setMonth',
            test: async () => {
                let date = new Date();

                const newMonth = 11;

                const result = await dateCanister.setMonth(
                    date.toISOString(),
                    newMonth
                );

                date.setMonth(newMonth);

                const expected = date.getMonth();

                return equals(result, expected);
            }
        },
        {
            name: 'setSeconds',
            test: async () => {
                let date = new Date();

                const newSeconds = 32;

                const result = await dateCanister.setSeconds(
                    date.toISOString(),
                    newSeconds
                );

                date.setSeconds(newSeconds);

                const expected = date.getSeconds();

                return equals(result, expected);
            }
        },
        {
            name: 'setTime',
            test: async () => {
                let date = new Date();

                const newTime = 1_658_863_501_294;

                const result = await dateCanister.setTime(
                    date.toISOString(),
                    BigInt(newTime)
                );

                date.setTime(newTime);

                const expected = date.getTime();

                return equals(Number(result), expected);
            }
        },
        {
            name: 'setUtcDate',
            test: async () => {
                let date = new Date();

                const newUtcDate = 1;

                const result = await dateCanister.setUtcDate(
                    date.toISOString(),
                    newUtcDate
                );

                date.setUTCDate(newUtcDate);

                const expected = date.getUTCDate();

                return equals(result, expected);
            }
        },
        {
            name: 'setUtcFullYear',
            test: async () => {
                let date = new Date();

                const newUtcFullYear = 1987;

                const result = await dateCanister.setUtcFullYear(
                    date.toISOString(),
                    newUtcFullYear
                );

                date.setUTCFullYear(newUtcFullYear);

                const expected = date.getUTCFullYear();

                return equals(result, expected);
            }
        },
        {
            name: 'setUtcHours',
            test: async () => {
                let date = new Date();

                const newUtcHours = 14;

                const result = await dateCanister.setUtcHours(
                    date.toISOString(),
                    newUtcHours
                );

                date.setUTCHours(newUtcHours);

                const expected = date.getUTCHours();

                return equals(result, expected);
            }
        },
        {
            name: 'setUtcMilliseconds',
            test: async () => {
                let date = new Date();

                const newUtcMilliseconds = 900;

                const result = await dateCanister.setUtcMilliseconds(
                    date.toISOString(),
                    newUtcMilliseconds
                );

                date.setUTCMilliseconds(newUtcMilliseconds);

                const expected = date.getUTCMilliseconds();

                return equals(result, expected);
            }
        },
        {
            name: 'setUtcMinutes',
            test: async () => {
                let date = new Date();

                const newUtcMinutes = 23;

                const result = await dateCanister.setUtcMinutes(
                    date.toISOString(),
                    newUtcMinutes
                );

                date.setUTCMinutes(newUtcMinutes);

                const expected = date.getUTCMinutes();

                return equals(result, expected);
            }
        },
        {
            name: 'setUtcMonth',
            test: async () => {
                let date = new Date();

                const newUtcMonth = 6;

                const result = await dateCanister.setUtcMonth(
                    date.toISOString(),
                    newUtcMonth
                );

                date.setUTCMonth(newUtcMonth);

                const expected = date.getUTCMonth();

                return equals(result, expected);
            }
        },
        {
            name: 'setUtcSeconds',
            test: async () => {
                let date = new Date();

                const newUtcSeconds = 55;

                const result = await dateCanister.setUtcSeconds(
                    date.toISOString(),
                    newUtcSeconds
                );

                date.setUTCSeconds(newUtcSeconds);

                const expected = date.getUTCSeconds();

                return equals(result, expected);
            }
        },
        {
            name: 'toDateString',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.toDateString(
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

                return equals(result, expected);
            }
        },
        {
            name: 'toIsoString',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.toISOString(
                    date.toISOString()
                );
                const expected = date.toISOString();

                return equals(result, expected);
            }
        },
        {
            name: 'toJson',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.toJSONString(
                    date.toISOString()
                );
                const expected = date.toJSON();

                return equals(result, expected);
            }
        },
        {
            name: 'toString',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.toString(date.toISOString());
                const resultSubstring = result.substring(
                    0,
                    result.indexOf(' GMT')
                );

                const expected = new Date(
                    date.getTime() + date.getTimezoneOffset() * 60_000
                ); // the canister uses UTC time, thus we do a conversion
                const expectedString = expected.toString();
                const expectedSubstring = expectedString.substring(
                    0,
                    expectedString.indexOf(' GMT')
                );

                return equals(resultSubstring, expectedSubstring);
            }
        },
        {
            name: 'toTimeString',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.toTimeString(
                    date.toISOString()
                );
                const resultSubstring = result.substring(
                    0,
                    result.indexOf(' GMT')
                );

                const expected = new Date(
                    date.getTime() + date.getTimezoneOffset() * 60_000
                ); // the canister uses UTC time, thus we do a conversion
                const expectedString = expected.toTimeString();
                const expectedSubstring = expectedString.substring(
                    0,
                    expectedString.indexOf(' GMT')
                );

                return equals(resultSubstring, expectedSubstring);
            }
        },
        {
            name: 'toUtcString',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.toUtcString(
                    date.toISOString()
                );
                const expected = date.toUTCString();

                return equals(result, expected);
            }
        },
        {
            name: 'now',
            test: async () => {
                const timeBefore = new Date().getTime();
                const result = await dateCanister.now();
                const timeAfter = new Date().getTime();

                return createTestResult(
                    () =>
                        result >= BigInt(timeBefore - 30_000) &&
                        result <= BigInt(timeAfter + 30_000),
                    `Expected result to be between ${timeBefore - 30_000} and ${
                        timeAfter + 30_000
                    }. Received ${result}`
                );
            }
        },
        {
            name: 'parse',
            test: async () => {
                const date = new Date();

                const result = await dateCanister.parse(date.toISOString());
                const expected = BigInt(Date.parse(date.toISOString()));

                return equals(result, expected);
            }
        },
        {
            name: 'utc',
            test: async () => {
                const result = await dateCanister.utc(2002, 4);
                const expected = BigInt(Date.UTC(2002, 4));

                return equals(result, expected);
            }
        }
    ];
}
