// TODO let's add more examples here, really test it out

import { Query, Opt } from 'azle';

type HTML = {
    head: Opt<Head>;
};

type Head = {
    elements: Element[];
};

type Element = {
    id: string;
};

export function getHTML(): Query<HTML> {
    return {
        head: null
    };
}

export function getHead(): Query<Opt<Head>> {
    return {
        elements: []
    };
}

export function getHeadWithElements(): Query<Opt<Head>> {
    return {
        elements: [
            {
                id: '0'
            }
        ]
    };
}

export function getElement(
    element: Opt<Opt<Element>>
): Query<Opt<Opt<Element>>> {
    return element;
}
