// TODO let's add more examples here, really test it out

import { Opt, Query } from 'azle';

type Html = {
    head: Opt<Head>;
};

type Head = {
    elements: Element[];
};

type Element = {
    id: string;
};

export function get_html(): Query<Html> {
    return {
        head: null
    };
}

export function get_head(): Query<Opt<Head>> {
    return {
        elements: []
    };
}

export function get_head_with_elements(): Query<Opt<Head>> {
    return {
        elements: [
            {
                id: '0'
            }
        ]
    };
}

export function get_element(
    element: Opt<Opt<Element>>
): Query<Opt<Opt<Element>>> {
    return element;
}
