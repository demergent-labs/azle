export function replyRaw(replyBuffer: blob) {
    return globalThis._azleIc.replyRaw(replyBuffer.buffer);
}
