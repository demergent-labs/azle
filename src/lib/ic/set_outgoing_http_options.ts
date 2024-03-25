export function setOutgoingHttpOptions(options: {
    maxResponseBytes?: bigint;
    subnetSize?: number;
    cycles?: bigint;
    transformMethodName?: string;
    transformContext?: Uint8Array;
}) {
    globalThis._azleOutgoingHttpOptionsMaxResponseBytes =
        options.maxResponseBytes;
    globalThis._azleOutgoingHttpOptionsSubnetSize = options.subnetSize;
    globalThis._azleOutgoingHttpOptionsCycles = options.cycles;
    globalThis._azleOutgoingHttpOptionsTransformMethodName =
        options.transformMethodName;
    globalThis._azleOutgoingHttpOptionsTransformContext =
        options.transformContext;
}
