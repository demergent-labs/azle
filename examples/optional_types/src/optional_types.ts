import {
    Query,
    opt
} from 'azle';

type HTML = {
    head: opt<Head>;
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

export function getHead(): Query<opt<Head>> {
    return {
        elements: []
    };
}

export function getElement(element: opt<opt<Element>>): Query<opt<opt<Element>>> {
    return element;
}