import {
    int
} from 'azle';

export const Int = {
    abs: Math.abs,
    compare: (a: int, b: int): OrderType => {
        if (a > b) {
            return OrderType.Greater;
        }
        if (a < b) {
            return OrderType.Less;
        }
        return OrderType.Equal;
    }
}

export enum OrderType {
    Less = -1,
    Equal = 0,
    Greater = 1
}

export const Order = {
    isLess: (order: OrderType) => order === OrderType.Less,
    isEqual: (order: OrderType) => order === OrderType.Equal,
    isGreater: (order: OrderType) => order === OrderType.Greater,
    equal: (o1: OrderType, o2: OrderType) => o1 === OrderType.Less && o2 === OrderType.Less
}
