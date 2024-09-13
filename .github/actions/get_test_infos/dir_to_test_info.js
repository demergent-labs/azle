import { basename } from 'path';

export function dirToTestInfo(dir) {
    const path = dir;
    const name = basename(dir);
    const type = getType(dir);
    const displayPath = generateDisplayPath(dir);

    return { path, name, type, displayPath };
}

function getType(dir) {
    if (dir.includes('examples/')) return 'ex';
    if (dir.includes('/end_to_end/')) return 'e2e';
    if (dir.includes('/property/')) return 'prop';
    return '';
}

function generateDisplayPath(path) {
    const replacements = {
        examples: 'ex',
        property: 'prop',
        end_to_end: 'e2e',
        functional_syntax: 'func',
        functional_api: 'func',
        class_syntax: 'class',
        class_api: 'class',
        candid_rpc: 'crpc',
        http_server: 'http',
        tests: 't'
    };

    return path
        .split('/')
        .map((dir) => {
            return replacements[dir] || dir;
        })
        .join('/');
}
