import { deploy_and_generate } from 'azle/test';

export async function pretest() {
    deploy_and_generate('null_example');
}

pretest();
