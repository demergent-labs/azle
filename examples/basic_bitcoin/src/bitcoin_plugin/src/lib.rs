use bitcoin::hashes::Hash;
use bitcoin::psbt::serialize::Serialize;
use boa_engine::object::NativeObject;

fn _bitcoin_plugin_register(boa_context: &mut boa_engine::Context) {
    let address = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_address_from_str),
            "from_str",
            0,
        )
        .build();

    let hash = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_hash_from_slice),
            "from_slice",
            0,
        )
        .build();

    let out_point = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_out_point_new),
            "new",
            0,
        )
        .build();

    let script = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_script_new),
            "new",
            0,
        )
        .build();

    let script_builder = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_script_builder_new),
            "new",
            0,
        )
        .build();

    let transaction = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_transaction_new),
            "new",
            0,
        )
        .build();

    let txid = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_txid_from_hash),
            "from_hash",
            0,
        )
        .build();

    let tx_in = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_tx_in_new),
            "new",
            0,
        )
        .build();

    let tx_out = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_tx_out_new),
            "new",
            0,
        )
        .build();

    let witness = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_witness_new),
            "new",
            0,
        )
        .build();

    let bitcoin_plugin = boa_engine::object::ObjectInitializer::new(boa_context)
        .property(
            "BitcoinAddress",
            address,
            boa_engine::property::Attribute::all(),
        )
        .property("BitcoinHash", hash, boa_engine::property::Attribute::all())
        .property(
            "BitcoinOutPoint",
            out_point,
            boa_engine::property::Attribute::all(),
        )
        .property(
            "BitcoinScript",
            script,
            boa_engine::property::Attribute::all(),
        )
        .property(
            "BitcoinScriptBuilder",
            script_builder,
            boa_engine::property::Attribute::all(),
        )
        .property(
            "BitcoinTransaction",
            transaction,
            boa_engine::property::Attribute::all(),
        )
        .property("BitcoinTxid", txid, boa_engine::property::Attribute::all())
        .property("BitcoinTxIn", tx_in, boa_engine::property::Attribute::all())
        .property(
            "BitcoinTxOut",
            tx_out,
            boa_engine::property::Attribute::all(),
        )
        .property(
            "BitcoinWitness",
            witness,
            boa_engine::property::Attribute::all(),
        )
        .build();

    boa_context.register_global_property(
        "BitcoinPlugin",
        bitcoin_plugin,
        boa_engine::property::Attribute::all(),
    );
}

// address

struct JsBitcoinAddress(bitcoin::Address);

unsafe impl boa_gc::Trace for JsBitcoinAddress {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinAddress {}

fn _bitcoin_plugin_address_from_str(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let arg0: String = aargs[0].clone().try_from_vm_value(&mut *context).unwrap();

    let address = JsBitcoinAddress(bitcoin::Address::from_str(&arg0).unwrap());

    let address_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(address),
    );

    address_js_object
        .set(
            "script_pubkey",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_address_script_pubkey),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    Ok(address_js_object.into())
}

fn _bitcoin_plugin_address_script_pubkey(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let this_js_object = this.as_object().unwrap();
    let address = this_js_object.downcast_ref::<JsBitcoinAddress>().unwrap();

    let bitcoin_script = JsBitcoinScript(address.0.script_pubkey());

    let bitcoin_script_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(bitcoin_script),
    );

    Ok(bitcoin_script_js_object.into())
}

// hash
struct JsBitcoinHash(bitcoin::hashes::sha256d::Hash);

unsafe impl boa_gc::Trace for JsBitcoinHash {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinHash {}

fn _bitcoin_plugin_hash_from_slice(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let arg0: Vec<u8> = aargs[0].clone().try_from_vm_value(&mut *context).unwrap();

    let hash = JsBitcoinHash(bitcoin::hashes::sha256d::Hash::from_slice(&arg0).unwrap());

    let hash_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(hash),
    );

    Ok(hash_js_object.into())
}

// OutPoint
struct JsBitcoinOutPoint(bitcoin::OutPoint);

unsafe impl boa_gc::Trace for JsBitcoinOutPoint {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinOutPoint {}

fn _bitcoin_plugin_out_point_new(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let txid_js_object = aargs[0].as_object().unwrap();
    let txid = txid_js_object.downcast_ref::<JsBitcoinTxid>().unwrap();

    let vout: u32 = aargs[1].clone().try_from_vm_value(&mut *context).unwrap();

    let out_point = JsBitcoinOutPoint(bitcoin::OutPoint::new(txid.0, vout));

    let out_point_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(out_point),
    );

    Ok(out_point_js_object.into())
}

// script
struct JsBitcoinScript(bitcoin::Script);

unsafe impl boa_gc::Trace for JsBitcoinScript {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinScript {}

fn _bitcoin_plugin_script_new(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let script = JsBitcoinScript(bitcoin::Script::new());

    let script_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(script),
    );

    Ok(script_js_object.into())
}

// script_builder
struct JsBitcoinScriptBuilder(bitcoin::blockdata::script::Builder);

unsafe impl boa_gc::Trace for JsBitcoinScriptBuilder {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinScriptBuilder {}

fn _bitcoin_plugin_script_builder_new(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let script_builder = JsBitcoinScriptBuilder(bitcoin::blockdata::script::Builder::new());

    let script_builder_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(script_builder),
    );

    script_builder_js_object
        .set(
            "into_script",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_script_builder_into_script),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    script_builder_js_object
        .set(
            "push_slice",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_script_builder_push_slice),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    Ok(script_builder_js_object.into())
}

fn _bitcoin_plugin_script_builder_into_script(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let this_js_object = this.as_object().unwrap();
    let script_builder = this_js_object
        .downcast_ref::<JsBitcoinScriptBuilder>()
        .unwrap();

    let bitcoin_script = JsBitcoinScript(script_builder.0.clone().into_script());

    let bitcoin_script_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(bitcoin_script),
    );

    Ok(bitcoin_script_js_object.into())
}

fn _bitcoin_plugin_script_builder_push_slice(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let this_js_object = this.as_object().unwrap();
    let script_builder = this_js_object
        .downcast_ref::<JsBitcoinScriptBuilder>()
        .unwrap();

    let arg0: Vec<u8> = aargs[0].clone().try_from_vm_value(&mut *context).unwrap();

    let bitcoin_script_builder = JsBitcoinScriptBuilder(script_builder.0.clone().push_slice(&arg0));

    let bitcoin_script_builder_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(bitcoin_script_builder),
    );

    bitcoin_script_builder_js_object
        .set(
            "into_script",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_script_builder_into_script),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    bitcoin_script_builder_js_object
        .set(
            "push_slice",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_script_builder_push_slice),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    Ok(bitcoin_script_builder_js_object.into())
}

// Sighash
struct JsBitcoinSighash(bitcoin::Sighash);

unsafe impl boa_gc::Trace for JsBitcoinSighash {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinSighash {}

fn _bitcoin_plugin_sighash_to_vec(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let this_js_object = this.as_object().unwrap();
    let sighash = &this_js_object.downcast_ref::<JsBitcoinSighash>().unwrap().0;

    Ok(sighash.to_vec().try_into_vm_value(&mut *context).unwrap())
}

// transaction
struct JsBitcoinTransaction(bitcoin::Transaction);

unsafe impl boa_gc::Trace for JsBitcoinTransaction {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinTransaction {}

fn _bitcoin_plugin_transaction_new(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let input = get_transaction_input(aargs[0].clone(), context);
    let lock_time: u32 = aargs[1].clone().try_from_vm_value(&mut *context).unwrap();
    let version: i32 = aargs[2].clone().try_from_vm_value(&mut *context).unwrap();
    let output = get_transaction_output(aargs[3].clone(), context);

    let transaction = JsBitcoinTransaction(bitcoin::Transaction {
        input,
        lock_time,
        version,
        output,
    });

    let transaction_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(transaction),
    );

    transaction_js_object
        .set("inputs", aargs[0].clone(), false, context)
        .unwrap();

    transaction_js_object
        .set(
            "serialize",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_transaction_serialize),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    transaction_js_object
        .set(
            "signature_hash",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_transaction_signature_hash),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    transaction_js_object
        .set(
            "txid",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_transaction_txid),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    transaction_js_object
        .set(
            "prepare_script_sig",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_copy_closure(
                    |this: &boa_engine::JsValue,
                     aargs: &[boa_engine::JsValue],
                     context: &mut boa_engine::Context| {
                        let this_js_object = this.as_object().unwrap();
                        let transaction = &mut this_js_object
                            .downcast_mut::<JsBitcoinTransaction>()
                            .unwrap()
                            .0;

                        let index: u32 = aargs[0].clone().try_from_vm_value(&mut *context).unwrap();

                        let script_js_object = aargs[1].as_object().unwrap();
                        let script = &script_js_object
                            .downcast_ref::<JsBitcoinScript>()
                            .unwrap()
                            .0;

                        let mut input = &mut transaction.input[index as usize];

                        input.script_sig = script.clone();

                        input.witness.clear();

                        Ok(boa_engine::JsValue::Undefined)
                    },
                ),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    Ok(transaction_js_object.into())
}

fn _bitcoin_plugin_transaction_serialize(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let this_js_object = this.as_object().unwrap();
    let transaction = &this_js_object
        .downcast_ref::<JsBitcoinTransaction>()
        .unwrap()
        .0;

    let serialized_transaction = transaction.serialize().try_into_vm_value(context).unwrap();

    Ok(serialized_transaction)
}

fn _bitcoin_plugin_transaction_signature_hash(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let this_js_object = this.as_object().unwrap();
    let transaction = &this_js_object
        .downcast_ref::<JsBitcoinTransaction>()
        .unwrap()
        .0;

    let input_index: u32 = aargs[0].clone().try_from_vm_value(&mut *context).unwrap();

    let script_pubkey_js_object = aargs[1].as_object().unwrap();
    let script_pubkey = &script_pubkey_js_object
        .downcast_ref::<JsBitcoinScript>()
        .unwrap()
        .0;

    let sighash_u32: u32 = aargs[2].clone().try_from_vm_value(&mut *context).unwrap();

    let sighash = JsBitcoinSighash(transaction.signature_hash(
        input_index as usize,
        &script_pubkey,
        sighash_u32,
    ));

    let sighash_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(sighash),
    );

    sighash_js_object
        .set(
            "to_vec",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_sighash_to_vec),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    Ok(sighash_js_object.into())
}

fn _bitcoin_plugin_transaction_txid(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let this_js_object = this.as_object().unwrap();
    let transaction = &this_js_object
        .downcast_ref::<JsBitcoinTransaction>()
        .unwrap()
        .0;

    let txid = JsBitcoinTxid(transaction.txid());

    let txid_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(txid),
    );

    txid_js_object
        .set(
            "to_string",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_copy_closure(
                    |this: &boa_engine::JsValue,
                     aargs: &[boa_engine::JsValue],
                     context: &mut boa_engine::Context| {
                        let this_js_object = this.as_object().unwrap();
                        let tx_id = &this_js_object.downcast_mut::<JsBitcoinTxid>().unwrap().0;

                        let string = tx_id.to_string();

                        Ok(string.into())
                    },
                ),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    Ok(txid_js_object.into())
}

fn get_transaction_input(
    input_js_value: boa_engine::JsValue,
    context: &mut boa_engine::Context,
) -> Vec<bitcoin::TxIn> {
    let input_js_object = input_js_value.as_object().unwrap();

    let mut processing: bool = true;
    let mut index: usize = 0;

    let mut result = vec![];

    while processing == true {
        let item_js_value = input_js_object.get(index, context).unwrap();

        if item_js_value.is_undefined() {
            processing = false;
        } else {
            let tx_in_js_object = item_js_value.as_object().unwrap();
            let tx_in = &tx_in_js_object.downcast_ref::<JsBitcoinTxIn>().unwrap().0;

            result.push(tx_in.clone());
            index += 1;
        }
    }

    result
}

fn get_transaction_output(
    output_js_value: boa_engine::JsValue,
    context: &mut boa_engine::Context,
) -> Vec<bitcoin::TxOut> {
    let output_js_object = output_js_value.as_object().unwrap();

    let mut processing: bool = true;
    let mut index: usize = 0;

    let mut result = vec![];

    while processing == true {
        let item_js_value = output_js_object.get(index, context).unwrap();

        if item_js_value.is_undefined() {
            processing = false;
        } else {
            let tx_out_js_object = item_js_value.as_object().unwrap();
            let tx_out = &tx_out_js_object.downcast_ref::<JsBitcoinTxOut>().unwrap().0;

            result.push(tx_out.clone());
            index += 1;
        }
    }

    result
}

// txid
struct JsBitcoinTxid(bitcoin::Txid);

unsafe impl boa_gc::Trace for JsBitcoinTxid {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinTxid {}

fn _bitcoin_plugin_txid_from_hash(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let hash_js_object = aargs[0].as_object().unwrap();
    let hash = hash_js_object.downcast_ref::<JsBitcoinHash>().unwrap();

    let txid = JsBitcoinTxid(bitcoin::hash_types::Txid::from_hash(hash.0));

    let txid_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(txid),
    );

    Ok(txid_js_object.into())
}

// txin
struct JsBitcoinTxIn(bitcoin::TxIn);

unsafe impl boa_gc::Trace for JsBitcoinTxIn {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinTxIn {}

fn _bitcoin_plugin_tx_in_new(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let previous_output_js_object = aargs[0].as_object().unwrap();
    let previous_output = previous_output_js_object
        .downcast_ref::<JsBitcoinOutPoint>()
        .unwrap()
        .0;

    let script_sig_js_object = aargs[1].as_object().unwrap();
    let script_sig = script_sig_js_object
        .downcast_ref::<JsBitcoinScript>()
        .unwrap()
        .0
        .clone();

    let sequence: u32 = aargs[2].clone().try_from_vm_value(&mut *context).unwrap();

    let witness_js_object = aargs[3].as_object().unwrap();
    let witness = witness_js_object
        .downcast_ref::<JsBitcoinWitness>()
        .unwrap()
        .0
        .clone();

    let tx_in = JsBitcoinTxIn(bitcoin::TxIn {
        previous_output,
        script_sig,
        sequence,
        witness,
    });

    let tx_in_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(tx_in),
    );

    Ok(tx_in_js_object.into())
}

// txout
struct JsBitcoinTxOut(bitcoin::TxOut);

unsafe impl boa_gc::Trace for JsBitcoinTxOut {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinTxOut {}

fn _bitcoin_plugin_tx_out_new(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let value: u64 = aargs[0].clone().try_from_vm_value(&mut *context).unwrap();

    let script_pubkey_js_object = aargs[1].as_object().unwrap();
    let script_pubkey = script_pubkey_js_object
        .downcast_ref::<JsBitcoinScript>()
        .unwrap()
        .0
        .clone();

    let tx_out = JsBitcoinTxOut(bitcoin::TxOut {
        value,
        script_pubkey,
    });

    let tx_out_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(tx_out),
    );

    Ok(tx_out_js_object.into())
}

// witness
struct JsBitcoinWitness(bitcoin::blockdata::witness::Witness);

unsafe impl boa_gc::Trace for JsBitcoinWitness {
    boa_gc::empty_trace!();
}

impl boa_gc::Finalize for JsBitcoinWitness {}

fn _bitcoin_plugin_witness_new(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let witness = JsBitcoinWitness(bitcoin::blockdata::witness::Witness::new());

    let witness_js_object = boa_engine::object::JsObject::from_proto_and_data(
        context.intrinsics().constructors().object().prototype(),
        boa_engine::object::ObjectData::native_object(witness),
    );

    witness_js_object
        .set(
            "clear",
            boa_engine::object::FunctionObjectBuilder::new(
                context,
                boa_engine::NativeFunction::from_fn_ptr(_bitcoin_plugin_witness_clear),
            )
            .build(),
            false,
            context,
        )
        .unwrap();

    Ok(witness_js_object.into())
}

fn _bitcoin_plugin_witness_clear(
    this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let this_js_object = this.as_object().unwrap();
    let mut witness = &mut this_js_object.downcast_mut::<JsBitcoinWitness>().unwrap().0;

    witness.clear();

    Ok(boa_engine::JsValue::Undefined)
}
