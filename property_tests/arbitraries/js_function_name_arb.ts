import fc from 'fast-check';

export const JsFunctionNameArb = fc.stringMatching(
    /^(_[a-zA-Z0-9]+|[a-zA-Z][a-zA-Z0-9]*)$/
);
