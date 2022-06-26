import { execSync } from 'child_process';
import { createActor as createActorAzle } from '../benchmark/dfx_generated/azle';
import { createActor as createActorMotoko } from '../benchmark/dfx_generated/motoko';
import { createActor as createActorRust } from '../benchmark/dfx_generated/rust';

const azle_canister = createActorAzle('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const motoko_canister = createActorMotoko('ryjl3-tyaaa-aaaaa-aaaba-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const rust_canister = createActorRust('rkp4c-7iaaa-aaaaa-aaaca-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_benchmarks();

async function run_benchmarks() {
    await setup();
    const {
        azle_wasm_instructions,
        motoko_wasm_instructions,
        rust_wasm_instructions
    } = await query_benchmark('query_empty');
    await query_benchmark('query_nat64_add_one', azle_wasm_instructions, motoko_wasm_instructions, rust_wasm_instructions);
    await query_benchmark('query_nat64_add_many', azle_wasm_instructions, motoko_wasm_instructions, rust_wasm_instructions);
    await query_benchmark('query_string_initialize', azle_wasm_instructions, motoko_wasm_instructions, rust_wasm_instructions);
}

async function setup() {
    execSync(`dfx canister uninstall-code azle || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code motoko || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code rust || true`, {
        stdio: 'inherit'
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister create azle`, {
        stdio: 'inherit'
    });

    execSync(`dfx build azle`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx canister install azle --wasm target/wasm32-unknown-unknown/release/azle.wasm.gz`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx deploy motoko`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy rust`, {
        stdio: 'inherit'
    });
}

async function query_benchmark(
    canister_method: string,
    azle_baseline: number = 0,
    motoko_baseline: number = 0,
    rust_baseline: number = 0
): Promise<{
    azle_wasm_instructions: number;
    motoko_wasm_instructions: number;
    rust_wasm_instructions: number;
}> {
    console.log(`benchmark ${canister_method}\n`);

    const azle_wasm_instructions = Number(await azle_canister[canister_method]()) - azle_baseline;
    const motoko_wasm_instructions = Number(await motoko_canister[canister_method]()) - motoko_baseline;
    const rust_wasm_instructions = Number(await rust_canister[canister_method]()) - rust_baseline;

    console.log('azle_wasm_instructions', azle_wasm_instructions);
    console.log('motoko_wasm_instructions', motoko_wasm_instructions);
    console.log('rust_wasm_instructions', rust_wasm_instructions, '\n');

    const {
        motoko_percentage_change,
        rust_percentage_change
    } = calculate_percentage_change(
        azle_wasm_instructions,
        motoko_wasm_instructions,
        rust_wasm_instructions
    );

    console.log(`Azle/Motoko percentage change: ${motoko_percentage_change}%`);
    console.log(`Azle/Motoko change multiplier: ${rust_percentage_change}x\n`);

    const {
        motoko_change_multiplier,
        rust_change_multiplier
    } = calculate_change_multiplier(
        azle_wasm_instructions,
        motoko_wasm_instructions,
        rust_wasm_instructions
    );

    console.log(`Azle/Rust percentage change: ${motoko_change_multiplier}%`);
    console.log(`Azle/Rust change multiplier: ${rust_change_multiplier}x\n\n`);

    return {
        azle_wasm_instructions,
        motoko_wasm_instructions,
        rust_wasm_instructions
    };
}

function calculate_percentage_change(
    azle_wasm_instructions: number,
    motoko_wasm_instructions: number,
    rust_wasm_instructions: number
): {
    motoko_percentage_change: string;
    rust_percentage_change: string;
} {
    return {
        motoko_percentage_change: (((azle_wasm_instructions - motoko_wasm_instructions) / motoko_wasm_instructions) * 100).toFixed(0),
        rust_percentage_change: (((azle_wasm_instructions - rust_wasm_instructions) / rust_wasm_instructions) * 100).toFixed(0)
    };
}

function calculate_change_multiplier(
    azle_wasm_instructions: number,
    motoko_wasm_instructions: number,
    rust_wasm_instructions: number
): {
    motoko_change_multiplier: string;
    rust_change_multiplier: string;
} {
    return {
        motoko_change_multiplier: (azle_wasm_instructions / motoko_wasm_instructions).toFixed(2),
        rust_change_multiplier: (azle_wasm_instructions / rust_wasm_instructions).toFixed(2)
    };
}