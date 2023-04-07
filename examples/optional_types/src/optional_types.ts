// TODO let's add more examples here, really test it out

import { Opt, $query, Record, Vec } from 'azle';

type Html = Record<{
    head: Opt<Head>;
}>;

type Head = Record<{
    elements: Vec<Element>;
}>;

type Element = Record<{
    id: string;
}>;

$query;
export function getHtml(): Html {
    return {
        head: null
    };
}

$query;
export function getHead(): Opt<Head> {
    return {
        elements: []
    };
}

$query;
export function getHeadWithElements(): Opt<Head> {
    return {
        elements: [
            {
                id: '0'
            }
        ]
    };
}

$query;
export function getElement(element: Opt<Opt<Element>>): Opt<Opt<Element>> {
    return element;
}
