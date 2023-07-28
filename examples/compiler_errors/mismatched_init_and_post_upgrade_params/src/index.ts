import { $init, $postUpgrade, int32 } from 'azle';

$init;
export function init(p1: boolean, p2: string, p3: int32): void {
    console.log('Initialization complete.');
}

$postUpgrade;
export function postUpgrade(p1: int32, p2: boolean): void {
    console.log('PostUpgrade complete.');
}
