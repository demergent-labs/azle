import { int } from 'azle';

export const Int = {
    abs: Math.abs,
    compare
};

function compare(a: int, b: int): OrderType {
    if (a > b) {
        return OrderType.Greater;
    }
    if (a < b) {
        return OrderType.Less;
    }
    return OrderType.Equal;
}

export enum OrderType {
    Less = -1,
    Equal = 0,
    Greater = 1
}

export const Order = {
    isLess,
    isEqual,
    isGreater,
    equal
};

function isLess(order: OrderType): boolean {
    return order === OrderType.Less;
}

function isEqual(order: OrderType): boolean {
    return order === OrderType.Equal;
}

function isGreater(order: OrderType): boolean {
    return order === OrderType.Greater;
}

function equal(o1: OrderType, o2: OrderType): boolean {
    return o1 === OrderType.Less && o2 === OrderType.Less;
}
