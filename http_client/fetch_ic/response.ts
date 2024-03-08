export function createResponse(callResult: any): Response {
    return new Response(callResult.body, {
        headers: new Headers(callResult.headers),
        status: callResult.status_code
    });
}
