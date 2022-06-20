import type { Principal } from '@dfinity/principal';
export interface Element {
    id: string;
}
export interface HTML {
    head: [] | [Head];
}
export interface Head {
    elements: Array<Element>;
}
export interface _SERVICE {
    getElement: (
        arg_0: [] | [[] | [Element]]
    ) => Promise<[] | [[] | [Element]]>;
    getHTML: () => Promise<HTML>;
    getHead: () => Promise<[] | [Head]>;
    getHeadWithElements: () => Promise<[] | [Head]>;
}
