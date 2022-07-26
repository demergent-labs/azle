import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/date';

const date_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('date'),
    {
        name: 'get_date',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_date(date.toISOString());
            const expected = date.getDate();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_day',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_day(date.toISOString());
            const expected = date.getDay();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_full_year',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_full_year(
                date.toISOString()
            );
            const expected = date.getFullYear();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_hours',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_hours(date.toISOString());
            const expected = date.getUTCHours(); // The canister's local time is UTC, thus we check with getUTCHours

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_milliseconds',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_milliseconds(
                date.toISOString()
            );
            const expected = date.getMilliseconds();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_minutes',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_minutes(date.toISOString());
            const expected = date.getMinutes();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_month',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_month(date.toISOString());
            const expected = date.getMonth();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_seconds',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_seconds(date.toISOString());
            const expected = date.getSeconds();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_time',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_time(date.toISOString());
            const expected = BigInt(date.getTime());

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_timezone_offset',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_timezone_offset(
                date.toISOString()
            );
            const expected =
                date.getTimezoneOffset() - date.getTimezoneOffset(); // The canister's local time is UTC, thus the timezone offset should be 0

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_utc_date',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_utc_date(date.toISOString());
            const expected = date.getUTCDate();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_utc_day',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_utc_day(date.toISOString());
            const expected = date.getUTCDay();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_utc_full_year',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_utc_full_year(
                date.toISOString()
            );
            const expected = date.getUTCFullYear();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_utc_hours',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_utc_hours(
                date.toISOString()
            );
            const expected = date.getUTCHours();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_utc_minutes',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_utc_minutes(
                date.toISOString()
            );
            const expected = date.getUTCMinutes();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_utc_month',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_utc_month(
                date.toISOString()
            );
            const expected = date.getUTCMonth();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'get_utc_seconds',
        test: async () => {
            const date = new Date();

            const result = await date_canister.get_utc_seconds(
                date.toISOString()
            );
            const expected = date.getUTCSeconds();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_date',
        test: async () => {
            let date = new Date();

            const new_date = 0;

            const result = await date_canister.set_date(
                date.toISOString(),
                new_date
            );

            date.setDate(new_date);

            const expected = date.getDate();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_full_year',
        test: async () => {
            let date = new Date();

            const new_full_year = 1996;

            const result = await date_canister.set_full_year(
                date.toISOString(),
                new_full_year
            );

            date.setFullYear(new_full_year);

            const expected = date.getFullYear();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_hours',
        test: async () => {
            let date = new Date();

            const new_hours = 22;

            const result = await date_canister.set_hours(
                date.toISOString(),
                new_hours
            );

            date.setHours(new_hours);

            const expected = date.getHours();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_milliseconds',
        test: async () => {
            let date = new Date();

            const new_milliseconds = 500;

            const result = await date_canister.set_milliseconds(
                date.toISOString(),
                new_milliseconds
            );

            date.setMilliseconds(new_milliseconds);

            const expected = date.getMilliseconds();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_minutes',
        test: async () => {
            let date = new Date();

            const new_minutes = 46;

            const result = await date_canister.set_minutes(
                date.toISOString(),
                new_minutes
            );

            date.setMinutes(new_minutes);

            const expected = date.getMinutes();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_month',
        test: async () => {
            let date = new Date();

            const new_month = 11;

            const result = await date_canister.set_month(
                date.toISOString(),
                new_month
            );

            date.setMonth(new_month);

            const expected = date.getMonth();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_seconds',
        test: async () => {
            let date = new Date();

            const new_seconds = 32;

            const result = await date_canister.set_seconds(
                date.toISOString(),
                new_seconds
            );

            date.setSeconds(new_seconds);

            const expected = date.getSeconds();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_time',
        test: async () => {
            let date = new Date();

            const new_time = 1_658_863_501_294;

            const result = await date_canister.set_time(
                date.toISOString(),
                BigInt(new_time)
            );

            date.setTime(new_time);

            const expected = date.getTime();

            return {
                ok: Number(result) === expected
            };
        }
    },
    {
        name: 'set_utc_date',
        test: async () => {
            let date = new Date();

            const new_utc_date = 1;

            const result = await date_canister.set_utc_date(
                date.toISOString(),
                new_utc_date
            );

            date.setUTCDate(new_utc_date);

            const expected = date.getUTCDate();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_utc_full_year',
        test: async () => {
            let date = new Date();

            const new_utc_full_year = 1987;

            const result = await date_canister.set_utc_full_year(
                date.toISOString(),
                new_utc_full_year
            );

            date.setUTCFullYear(new_utc_full_year);

            const expected = date.getUTCFullYear();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_utc_hours',
        test: async () => {
            let date = new Date();

            const new_utc_hours = 14;

            const result = await date_canister.set_utc_hours(
                date.toISOString(),
                new_utc_hours
            );

            date.setUTCHours(new_utc_hours);

            const expected = date.getUTCHours();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_utc_milliseconds',
        test: async () => {
            let date = new Date();

            const new_utc_milliseconds = 900;

            const result = await date_canister.set_utc_milliseconds(
                date.toISOString(),
                new_utc_milliseconds
            );

            date.setUTCMilliseconds(new_utc_milliseconds);

            const expected = date.getUTCMilliseconds();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_utc_minutes',
        test: async () => {
            let date = new Date();

            const new_utc_minutes = 23;

            const result = await date_canister.set_utc_minutes(
                date.toISOString(),
                new_utc_minutes
            );

            date.setUTCMinutes(new_utc_minutes);

            const expected = date.getUTCMinutes();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_utc_month',
        test: async () => {
            let date = new Date();

            const new_utc_month = 6;

            const result = await date_canister.set_utc_month(
                date.toISOString(),
                new_utc_month
            );

            date.setUTCMonth(new_utc_month);

            const expected = date.getUTCMonth();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'set_utc_seconds',
        test: async () => {
            let date = new Date();

            const new_utc_seconds = 55;

            const result = await date_canister.set_utc_seconds(
                date.toISOString(),
                new_utc_seconds
            );

            date.setUTCSeconds(new_utc_seconds);

            const expected = date.getUTCSeconds();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'to_date_string',
        test: async () => {
            const date = new Date();

            const result = await date_canister.to_date_string(
                date.toISOString()
            );
            const expected = date.toDateString();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'to_iso_string',
        test: async () => {
            const date = new Date();

            const result = await date_canister.to_iso_string(
                date.toISOString()
            );
            const expected = date.toISOString();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'to_json',
        test: async () => {
            const date = new Date();

            const result = await date_canister.to_json(date.toISOString());
            const expected = date.toJSON();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'to_string',
        test: async () => {
            const date = new Date();

            const result = await date_canister.to_string(date.toISOString());
            const result_substring = result.substring(
                0,
                result.indexOf(' GMT')
            );

            const expected = new Date(
                date.getTime() + date.getTimezoneOffset() * 60_000
            ); // the canister uses UTC time, thus we do a conversion
            const expected_string = expected.toString();
            const expected_substring = expected_string.substring(
                0,
                expected_string.indexOf(' GMT')
            );

            return {
                ok: result_substring === expected_substring
            };
        }
    },
    {
        name: 'to_time_string',
        test: async () => {
            const date = new Date();

            const result = await date_canister.to_time_string(
                date.toISOString()
            );
            const result_substring = result.substring(
                0,
                result.indexOf(' GMT')
            );

            const expected = new Date(
                date.getTime() + date.getTimezoneOffset() * 60_000
            ); // the canister uses UTC time, thus we do a conversion
            const expected_string = expected.toTimeString();
            const expected_substring = expected_string.substring(
                0,
                expected_string.indexOf(' GMT')
            );

            return {
                ok: result_substring === expected_substring
            };
        }
    },
    {
        name: 'to_utc_string',
        test: async () => {
            const date = new Date();

            const result = await date_canister.to_utc_string(
                date.toISOString()
            );
            const expected = date.toUTCString();

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'now',
        test: async () => {
            const time_before = new Date().getTime();
            const result = await date_canister.now();
            const time_after = new Date().getTime();

            return {
                ok:
                    result >= BigInt(time_before - 30_000) &&
                    result <= BigInt(time_after + 30_000)
            };
        }
    },
    {
        name: 'parse',
        test: async () => {
            const date = new Date();

            const result = await date_canister.parse(date.toISOString());
            const expected = BigInt(Date.parse(date.toISOString()));

            return {
                ok: result === expected
            };
        }
    },
    {
        name: 'utc',
        test: async () => {
            const result = await date_canister.utc(2002, 4);
            const expected = BigInt(Date.UTC(2002, 4));

            return {
                ok: result === expected
            };
        }
    }
];

run_tests(tests);
