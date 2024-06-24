import { ActorSubclass } from '@dfinity/agent';
import { HttpResponse } from 'azle/canisters/management';
import { Test } from 'azle/test';
import decodeUtf8 from 'decode-utf8';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/outgoing_http_requests/outgoing_http_requests.did';

export function getTests(
    outgoingHttpRequestsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'xkcd',
            test: async () => {
                const result = await outgoingHttpRequestsCanister.xkcd();

                return {
                    Ok: checkXkcdResult(result as any)
                };
            }
        },
        {
            name: 'xkcdRaw',
            test: async () => {
                const result = await outgoingHttpRequestsCanister.xkcdRaw();

                return {
                    Ok: checkXkcdResult(result as any)
                };
            }
        }
    ];
}

function checkXkcdResult(result: HttpResponse | string): boolean {
    const resultJson =
        typeof result === 'string'
            ? JSON.parse(result)
            : JSON.parse(decodeUtf8(Uint8Array.from(result.body)));
    const expectedJson = JSON.parse(
        `{"month": "9", "num": 642, "link": "", "year": "2009", "news": "", "safe_title": "Creepy", "alt": "And I even got out my adorable new netbook!", "img": "https://imgs.xkcd.com/comics/creepy.png", "title": "Creepy", "day": "28"}`
    );

    return (
        resultJson.month === expectedJson.month &&
        resultJson.num === expectedJson.num &&
        resultJson.link === expectedJson.link &&
        resultJson.year === expectedJson.year &&
        resultJson.news === expectedJson.news &&
        resultJson.safeTitle === expectedJson.safeTitle &&
        resultJson.alt === expectedJson.alt &&
        resultJson.img === expectedJson.img &&
        resultJson.title === expectedJson.title &&
        resultJson.day === expectedJson.day
    );
}
