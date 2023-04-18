// The main functionality of this code has the following license: https://github.com/froghub-io/ic-sqlite/blob/main/LICENSE

fn _ic_sqlite_plugin_register(boa_context: &mut boa_engine::Context) {
    let SQLite = boa_engine::object::ObjectInitializer::new(boa_context)
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_ic_sqlite_plugin_execute),
            "execute",
            0,
        )
        .function(
            boa_engine::NativeFunction::from_fn_ptr(_ic_sqlite_plugin_query),
            "query",
            0,
        )
        .build();

    boa_context.register_global_property("SQLite", SQLite, boa_engine::property::Attribute::all());
}

fn _ic_sqlite_plugin_execute(
    _this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let sql: String = aargs[0].clone().try_from_vm_value(&mut *context).unwrap();

    let conn = ic_sqlite::CONN.lock().unwrap();

    return match conn.execute(&sql, []) {
        Ok(e) => Ok(ExecuteResult::Ok(Box::new(format!("{:?}", e)))
            .try_into_vm_value(context)
            .unwrap()),
        Err(err) => Ok(
            ExecuteResult::Err(Box::new(SQLiteError::CanisterError(Box::new(
                SQLiteCanisterError {
                    message: Box::new(format!("{:?}", err)),
                },
            ))))
            .try_into_vm_value(context)
            .unwrap(),
        ),
    };
}

fn _ic_sqlite_plugin_query(
    _this: &boa_engine::JsValue,
    aargs: &[boa_engine::JsValue],
    context: &mut boa_engine::Context,
) -> boa_engine::JsResult<boa_engine::JsValue> {
    let sql: String = aargs[0].clone().try_from_vm_value(&mut *context).unwrap();

    let conn = ic_sqlite::CONN.lock().unwrap();
    let mut stmt = conn.prepare(&sql).unwrap();
    let cnt = stmt.column_count();
    let mut rows = stmt.query([]).unwrap();
    let mut res: Vec<Vec<String>> = Vec::new();

    loop {
        match rows.next() {
            Ok(row) => match row {
                Some(row) => {
                    let mut vec: Vec<String> = Vec::new();
                    for idx in 0..cnt {
                        let v = row.get_ref_unwrap(idx);
                        match v.data_type() {
                            rusqlite::types::Type::Null => vec.push(String::from("")),
                            rusqlite::types::Type::Integer => {
                                vec.push(v.as_i64().unwrap().to_string())
                            }
                            rusqlite::types::Type::Real => {
                                vec.push(v.as_f64().unwrap().to_string())
                            }
                            rusqlite::types::Type::Text => {
                                vec.push(v.as_str().unwrap().parse().unwrap())
                            }
                            rusqlite::types::Type::Blob => {
                                vec.push(hex::encode(v.as_blob().unwrap()))
                            }
                        }
                    }
                    res.push(vec)
                }
                None => break,
            },
            Err(err) => {
                return Ok(
                    QueryResult::Err(Box::new(SQLiteError::CanisterError(Box::new(
                        SQLiteCanisterError {
                            message: Box::new(format!("{:?}", err)),
                        },
                    ))))
                    .try_into_vm_value(context)
                    .unwrap(),
                );
            }
        }
    }

    Ok(QueryResult::Ok(Box::new(res))
        .try_into_vm_value(context)
        .unwrap())
}
