import { ActorSubclass } from '@dfinity/agent';
import { HttpResponse } from 'azle/canisters/management';
import { AzleResult, Test, testEquality } from 'azle/test';
import decodeUtf8 from 'decode-utf8';

import { _SERVICE } from './dfx_generated/outgoing_http_requests/outgoing_http_requests.did';

export function getTests(
    outgoingHttpRequestsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'xkcd',
            test: async () => {
                const result = await outgoingHttpRequestsCanister.xkcd();

                return checkXkcdResult(result as any);
            }
        },
        {
            name: 'xkcdRaw',
            test: async () => {
                const result = await outgoingHttpRequestsCanister.xkcdRaw();

                return checkXkcdResult(result as any);
            }
        }
    ];
}

function checkXkcdResult(result: HttpResponse | string): AzleResult<string> {
    const resultJson =
        typeof result === 'string'
            ? JSON.parse(result)
            : JSON.parse(decodeUtf8(Uint8Array.from(result.body)));
    const expectedJson = JSON.parse(
        `{"month": "9", "num": 642, "link": "", "year": "2009", "news": "", "safe_title": "Creepy", "alt": "And I even got out my adorable new netbook!", "img": "https://imgs.xkcd.com/comics/creepy.png", "title": "Creepy", "day": "28", "transcript":"[[Two people are sitting on chairs.]]\\nMan: Hey, cute netbook.\\nWoman: \\nWhat.\\n\\n\\nMan: Your laptop. I just --\\nWoman: No, why are you talking to me.\\n\\nWoman: Who do you think you are? If I were even slightly interested, I'd have shown it.\\n\\nWoman: Hey everyone, this dude's hitting on me.\\nVoice #1: Haha\\nVoice #2: Creepy\\nVoice #3: Let's get his picture for Facebook to warn others.\\n\\n((This panel fades into a thought bubble of the actual man.))\\n[[The girl is typing on her laptop.]]\\nDear blog,\\nCute boy on train still ignoring me.\\n\\n{{Title text: And I even got out my adorable new netbook!}}"}`
    );

    return testEquality(resultJson, expectedJson);
}
