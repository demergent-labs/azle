import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/outgoing_http_requests';
import { HttpResponse } from './dfx_generated/outgoing_http_requests/outgoing_http_requests.did';
import decodeUtf8 from 'decode-utf8';

const outgoing_http_requests_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    ...deploy('outgoing_http_requests'),
    {
        name: 'xkcd',
        test: async () => {
            const result = await outgoing_http_requests_canister.xkcd();

            return {
                ok: check_xkcd_result(result)
            };
        }
    },
    {
        name: 'xkcd_raw',
        test: async () => {
            const result = await outgoing_http_requests_canister.xkcd_raw();

            return {
                ok: check_xkcd_result(result)
            };
        }
    }
];

run_tests(tests);

function check_xkcd_result(result: HttpResponse): boolean {
    const result_json = JSON.parse(decodeUtf8(Uint8Array.from(result.body)));
    const expected_json = JSON.parse(
        `{"month": "9", "num": 642, "link": "", "year": "2009", "news": "", "safe_title": "Creepy", "alt": "And I even got out my adorable new netbook!", "img": "https://imgs.xkcd.com/comics/creepy.png", "title": "Creepy", "day": "28"}`
    );

    return (
        result_json.month === expected_json.month &&
        result_json.num === expected_json.num &&
        result_json.link === expected_json.link &&
        result_json.year === expected_json.year &&
        result_json.news === expected_json.news &&
        result_json.safe_title === expected_json.safe_title &&
        result_json.alt === expected_json.alt &&
        result_json.img === expected_json.img &&
        result_json.title === expected_json.title &&
        result_json.day === expected_json.day
    );
}
