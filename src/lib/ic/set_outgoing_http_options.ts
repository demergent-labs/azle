export function setOutgoingHttpOptions(options: {
    maxResponseBytes?: bigint;
    cycles?: bigint;
    transformMethodName?: string;
    transformContext?: Uint8Array;
}) {
    globalThis._azleOutgoingHttpOptionsMaxResponseBytes =
        options.maxResponseBytes;
    globalThis._azleOutgoingHttpOptionsCycles = options.cycles;
    globalThis._azleOutgoingHttpOptionsTransformMethodName =
        options.transformMethodName;
    globalThis._azleOutgoingHttpOptionsTransformContext =
        options.transformContext;
}
