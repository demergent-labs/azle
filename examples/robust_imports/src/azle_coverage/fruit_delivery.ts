import { $query, $update } from 'azle';

let isFruitDelivered = false;

$query;
export function isDelivered(): boolean {
    return isFruitDelivered;
}

$update;
export function deliver(): string {
    isFruitDelivered = true;
    return 'Delivering fruit';
}
