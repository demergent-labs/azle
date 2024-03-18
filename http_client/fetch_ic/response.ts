import { CallResult } from './call';

export function createResponse(callResult: CallResult): Response {
    return new Response(Uint8Array.from(callResult.body), {
        headers: new Headers(callResult.headers),
        status: callResult.status_code
    });
}
