import {
    CallFunctionInfo,
    Rust,
    StableStorageVariableInfo
} from '../../../../types';

export function generateIcObject(
    stableStorageVariableInfos: StableStorageVariableInfo[],
    callFunctionInfos: CallFunctionInfo[]
): Rust {
    const _azle_stable_storage = generateAzleStableStorage(
        stableStorageVariableInfos
    );

    return /* rust */ `
        ${_azle_stable_storage}

        let ic = boa_engine::object::ObjectInitializer::new(&mut boa_context)
            .function(
                _azle_ic_accept_message,
                "accept_message",
                0
            )
            ${
                ''
                // TODO: See https://github.com/demergent-labs/azle/issues/496
                // .function(
                //     _azle_ic_arg_data,
                //     "arg_data",
                //     0
                // )
            }
            .function(
                _azle_ic_arg_data_raw,
                "arg_data_raw",
                0
            )
            .function(
                _azle_ic_arg_data_raw_size,
                "arg_data_raw_size",
                0
            )
            .function(
                _azle_ic_caller,
                "caller",
                0
            )
            .function(
                _azle_ic_candid_decode,
                "candid_decode",
                0
            )
            .function(
                _azle_ic_candid_encode,
                "candid_encode",
                0
            )
            .function(
                _azle_ic_canister_balance,
                "canister_balance",
                0
            )
            .function(
                _azle_ic_canister_balance128,
                "canister_balance128",
                0
            )
            .function(
                _azle_ic_data_certificate,
                "data_certificate",
                0
            )
            .function(
                _azle_ic_id,
                "id",
                0
            )
            .function(
                _azle_ic_method_name,
                "method_name",
                0
            )
            .function(
                _azle_ic_msg_cycles_accept,
                "msg_cycles_accept",
                0
            )
            .function(
                _azle_ic_msg_cycles_accept128,
                "msg_cycles_accept128",
                0
            )
            .function(
                _azle_ic_msg_cycles_available,
                "msg_cycles_available",
                0
            )
            .function(
                _azle_ic_msg_cycles_available128,
                "msg_cycles_available128",
                0
            )
            .function(
                _azle_ic_msg_cycles_refunded,
                "msg_cycles_refunded",
                0
            )
            .function(
                _azle_ic_msg_cycles_refunded128,
                "msg_cycles_refunded128",
                0
            )
            .function(
                _azle_ic_notify_raw,
                "notify_raw",
                0
            )
            .function(
                _azle_ic_performance_counter,
                "performance_counter",
                0
            )
            .function(
                _azle_ic_print,
                "print",
                0
            )
            .function(
                _azle_ic_reject,
                "reject",
                0
            )
            .function(
                _azle_ic_reject_code,
                "reject_code",
                0
            )
            .function(
                _azle_ic_reply_raw,
                "reply_raw",
                0
            )
            .function(
                _azle_ic_reject_message,
                "reject_message",
                0
            )
            .function(
                _azle_ic_reply,
                "reply",
                0
            )
            .function(
                _azle_ic_set_certified_data,
                "set_certified_data",
                0
            )
            .function(
                _azle_ic_stable_bytes,
                "stable_bytes",
                0
            )
            .function(
                _azle_ic_stable_grow,
                "stable_grow",
                0
            )
            .function(
                _azle_ic_stable_read,
                "stable_read",
                0
            )
            .function(
                _azle_ic_stable_size,
                "stable_size",
                0
            )
            .function(
                _azle_ic_stable_write,
                "stable_write",
                0
            )
            .function(
                _azle_ic_stable64_grow,
                "stable64_grow",
                0
            )
            .function(
                _azle_ic_stable64_read,
                "stable64_read",
                0
            )
            .function(
                _azle_ic_stable64_size,
                "stable64_size",
                0
            )
            .function(
                _azle_ic_stable64_write,
                "stable64_write",
                0
            )
            .function(
                _azle_ic_time,
                "time",
                0
            )
            .function(
                _azle_ic_trap,
                "trap",
                0
            )
            ${callFunctionInfos
                .map((callFunctionInfo) => {
                    return /* rust */ `
                    .function(
                        ${callFunctionInfo.notify.functionName},
                        "${callFunctionInfo.notify.functionName}",
                        0
                    )
                    .function(
                        ${callFunctionInfo.notify_with_payment128.functionName},
                        "${callFunctionInfo.notify_with_payment128.functionName}",
                        0
                    )
                `;
                })
                .join('')}
            .property(
                "_azle_stable_storage",
                _azle_stable_storage,
                boa_engine::property::Attribute::all()
            )
            .build();
    `;
}

function generateAzleStableStorage(
    stableStorageVariableInfos: StableStorageVariableInfo[]
): Rust {
    if (stableStorageVariableInfos.length === 0) {
        return `let _azle_stable_storage = boa_engine::object::ObjectInitializer::new(&mut boa_context).build();`;
    } else {
        return `
            let (${stableStorageVariableInfos
                .filter(
                    (stableStorageVariableInfo) =>
                        stableStorageVariableInfo.migrate === false
                )
                .map(
                    (stableStorageVariableInfo) =>
                        stableStorageVariableInfo.name
                )
                .join(', ')}${
            stableStorageVariableInfos.filter(
                (stableStorageVariableInfo) =>
                    stableStorageVariableInfo.migrate === false
            ).length === 1
                ? ','
                : ''
        }): (${stableStorageVariableInfos
            .filter(
                (stableStorageVariableInfo) =>
                    stableStorageVariableInfo.migrate === false
            )
            .map(
                (stableStorageVariableInfo) =>
                    stableStorageVariableInfo.rustType
            )
            .join(', ')}${
            stableStorageVariableInfos.filter(
                (stableStorageVariableInfo) =>
                    stableStorageVariableInfo.migrate === false
            ).length === 1
                ? ','
                : ''
        }) = ic_cdk::storage::stable_restore().unwrap();

            ${stableStorageVariableInfos
                .filter(
                    (stableStorageVariableInfo) =>
                        stableStorageVariableInfo.migrate === false
                )
                .map((stableStorageVariableInfo) => {
                    return `let ${stableStorageVariableInfo.name}_js_value = ${stableStorageVariableInfo.name}.azle_into_js_value(boa_context);`;
                })
                .join('\n')}

            let _azle_stable_storage = boa_engine::object::ObjectInitializer::new(&mut boa_context)
                ${stableStorageVariableInfos
                    .filter(
                        (stableStorageVariableInfo) =>
                            stableStorageVariableInfo.migrate === false
                    )
                    .map((stableStorageVariableInfo) => {
                        return `
                        .property(
                            "${stableStorageVariableInfo.name}",
                            ${stableStorageVariableInfo.name}_js_value,
                            boa_engine::property::Attribute::all()
                        )
                    `;
                    })
                    .join('\n')}
                .build();
        `;
    }
}
