import { Rust, StableStorageVariableInfo } from '../../../../types';

export function generateIcObject(stableStorageVariableInfos: StableStorageVariableInfo[]): Rust {
    const _azleStableStorage = generate_AzleStableStorage(stableStorageVariableInfos);

    return `
        ${_azleStableStorage}

        let ic = boa_engine::object::ObjectInitializer::new(&mut boa_context)
            .function(
                azle_ic_caller,
                "caller",
                0
            )
            .function(
                azle_ic_canister_balance,
                "canisterBalance",
                0
            )
            .function(
                azle_ic_id,
                "id",
                0
            )
            .function(
                azle_ic_print,
                "print",
                0
            )
            .function(
                azle_ic_time,
                "time",
                0
            )
            .function(
                azle_ic_trap,
                "trap",
                0
            )
            .property(
                "_azleStableStorage",
                _azleStableStorage,
                boa_engine::property::Attribute::all()
            )
            .build();
    `;
}

function generate_AzleStableStorage(stableStorageVariableInfos: StableStorageVariableInfo[]): Rust {
    if (stableStorageVariableInfos.length === 0) {
        return `let _azleStableStorage = boa_engine::object::ObjectInitializer::new(&mut boa_context).build();`;
    }
    else {
        return `
            let (${stableStorageVariableInfos.filter((stableStorageVariableInfo) => stableStorageVariableInfo.migrate === false).map((stableStorageVariableInfo) => stableStorageVariableInfo.name).join(', ')}${stableStorageVariableInfos.filter((stableStorageVariableInfo) => stableStorageVariableInfo.migrate === false).length === 1 ? ',' : ''}): (${stableStorageVariableInfos.filter((stableStorageVariableInfo) => stableStorageVariableInfo.migrate === false).map((stableStorageVariableInfo) => stableStorageVariableInfo.rustType).join(', ')}${stableStorageVariableInfos.filter((stableStorageVariableInfo) => stableStorageVariableInfo.migrate === false).length === 1 ? ',' : ''}) = ic_cdk::storage::stable_restore().unwrap();

            ${stableStorageVariableInfos.filter((stableStorageVariableInfo) => stableStorageVariableInfo.migrate === false).map((stableStorageVariableInfo) => {
                return `let ${stableStorageVariableInfo.name}_js_value = ${stableStorageVariableInfo.name}.azle_into_js_value(boa_context);`;
            }).join('\n')}

            let _azleStableStorage = boa_engine::object::ObjectInitializer::new(&mut boa_context)
                ${stableStorageVariableInfos.filter((stableStorageVariableInfo) => stableStorageVariableInfo.migrate === false).map((stableStorageVariableInfo) => {
                    return `
                        .property(
                            "${stableStorageVariableInfo.name}",
                            ${stableStorageVariableInfo.name}_js_value,
                            boa_engine::property::Attribute::all()
                        )
                    `;
                }).join('\n')}
                .build();
        `;
    }
}