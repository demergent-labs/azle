import { ActorSubclass } from '@dfinity/agent';
import { HttpResponse } from 'azle/experimental/canisters/management';
import { expect, it, Test } from 'azle/test';
import decodeUtf8 from 'decode-utf8';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/outgoing_http_requests/outgoing_http_requests.did';

export function getTests(
    outgoingHttpRequestsCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('xkcd', async () => {
            const result = await outgoingHttpRequestsCanister.xkcd();

            checkXkcdResult(result as any);
        });

        it('xkcdRaw', async () => {
            const result = await outgoingHttpRequestsCanister.xkcdRaw();

            checkXkcdResult(result as any);
        });
    };
}

function checkXkcdResult(result: HttpResponse | string): void {
    const resultJson =
        typeof result === 'string'
            ? JSON.parse(result)
            : JSON.parse(decodeUtf8(Uint8Array.from(result.body)));
    const expectedJson = JSON.parse(
        `{"month": "9", "num": 642, "link": "", "year": "2009", "news": "", "safe_title": "Creepy", "alt": "And I even got out my adorable new netbook!", "img": "https://imgs.xkcd.com/comics/creepy.png", "title": "Creepy", "day": "28", "transcript":"[[Two people are sitting on chairs.]]\\nMan: Hey, cute netbook.\\nWoman: \\nWhat.\\n\\n\\nMan: Your laptop. I just --\\nWoman: No, why are you talking to me.\\n\\nWoman: Who do you think you are? If I were even slightly interested, I'd have shown it.\\n\\nWoman: Hey everyone, this dude's hitting on me.\\nVoice #1: Haha\\nVoice #2: Creepy\\nVoice #3: Let's get his picture for Facebook to warn others.\\n\\n((This panel fades into a thought bubble of the actual man.))\\n[[The girl is typing on her laptop.]]\\nDear blog,\\nCute boy on train still ignoring me.\\n\\n{{Title text: And I even got out my adorable new netbook!}}"}`
    );

    expect(resultJson).toStrictEqual(expectedJson);
}
