# Wasm Binary Manipulation Sequence Diagram

```mermaid
sequenceDiagram
    participant Build as Build Process
    participant GWBI as getWasmBinary()
    participant Template as Template Compiler
    participant MWB as manipulateWasmBinary()
    participant Binaryen as Binaryen Module
    participant Runtime as Runtime (Deployed Canister)

    Note over Build,Runtime: Build-Time Manipulation

    Build->>GWBI: getWasmBinary(ioType, js, wasmData, methodMeta)

    alt Template doesn't exist or dev mode
        GWBI->>Template: compile Rust canister template
        Note over Template: cargo build --target wasm32-wasip1
        Template->>Template: wasi2ic conversion
        Template-->>GWBI: static canister template Wasm
    end

    GWBI->>MWB: manipulateWasmBinary(js, canisterTemplatePath, wasmData, validate, methodMeta)

    MWB->>Binaryen: readBinary(originalWasm)
    Note over Binaryen: Load static template binary
    Binaryen-->>MWB: module

    MWB->>MWB: addCanisterMethodProxies(module, methodMeta)
    Note over MWB: Create proxy functions for:<br/>- queries/composite queries<br/>- updates<br/>- init/post_upgrade<br/>- pre_upgrade/inspect_message<br/>- heartbeat/on_low_wasm_memory

    MWB->>MWB: getMemoryInformation(module)
    Note over MWB: Extract existing memory segments

    MWB->>MWB: encode(js) → encodedJs
    MWB->>MWB: encode(JSON.stringify(wasmData)) → encodedWasmData

    MWB->>MWB: addPassiveDataSegmentsToMemory()
    Note over MWB: Add 2 passive segments:<br/>1. Compiled JavaScript code<br/>2. WasmData JSON

    MWB->>MWB: addPassiveSizeFunction('js_passive_data_size', encodedJs)
    Note over MWB: Replace stub function<br/>return encodedJs.byteLength

    MWB->>MWB: addPassiveSizeFunction('wasm_data_passive_data_size', encodedWasmData)
    Note over MWB: Replace stub function<br/>return encodedWasmData.byteLength

    MWB->>MWB: addInitPassiveDataFunction('init_js_passive_data', segmentIndex, encodedJs)
    Note over MWB: Replace stub function:<br/>memory.init + data.drop

    MWB->>MWB: addInitPassiveDataFunction('init_wasm_data_passive_data', segmentIndex, encodedWasmData)
    Note over MWB: Replace stub function:<br/>memory.init + data.drop

    alt validate === true
        MWB->>Binaryen: module.validate()
    end

    MWB->>Binaryen: module.emitBinary()
    Binaryen-->>MWB: manipulated Wasm binary

    MWB-->>GWBI: Uint8Array
    GWBI-->>Build: final Wasm binary

    Build->>Build: writeFile(wasmBinaryPath, wasmBinary)

    Note over Build,Runtime: Runtime Execution

    Runtime->>Runtime: canister_init() or canister_post_upgrade()

    Runtime->>Runtime: get_js_code()
    Runtime->>Runtime: size = js_passive_data_size()
    Note over Runtime: Returns actual size<br/>from manipulated function
    Runtime->>Runtime: init_js_passive_data(vec_location)
    Note over Runtime: memory.init loads passive segment<br/>into allocated Vec<u8>
    Runtime-->>Runtime: JavaScript code bytes

    Runtime->>Runtime: get_wasm_data()
    Runtime->>Runtime: size = wasm_data_passive_data_size()
    Note over Runtime: Returns actual size<br/>from manipulated function
    Runtime->>Runtime: init_wasm_data_passive_data(vec_location)
    Note over Runtime: memory.init loads passive segment<br/>into allocated Vec<u8>
    Runtime->>Runtime: serde_json::from_str()
    Runtime-->>Runtime: WasmData struct

    Note over Runtime: JS engine initialized with injected code<br/>and environment configuration
```

## Key Points

### Build-Time Manipulation

1. **Template Generation**: Rust canister template is compiled to Wasm with stub functions containing static dummy values
2. **Binary Loading**: Binaryen loads the template as a mutable module
3. **Method Proxies**: Canister method proxies are added for IC system API functions
4. **Data Encoding**: JavaScript code and WasmData are encoded as UTF-8 byte arrays
5. **Passive Segments**: Two passive data segments are added to the Wasm memory:
    - Segment N: Compiled JavaScript code
    - Segment N+1: Serialized WasmData JSON
6. **Function Replacement**: Stub functions are replaced with actual implementations:
    - `js_passive_data_size()`: Returns the actual byte length of the JavaScript code
    - `wasm_data_passive_data_size()`: Returns the actual byte length of the WasmData JSON
    - `init_js_passive_data()`: Uses `memory.init` to copy the passive segment into the provided memory location, then `data.drop` to free the segment
    - `init_wasm_data_passive_data()`: Same process for WasmData segment

### Runtime Execution

1. **Data Retrieval**: At runtime, `get_js_code()` and `get_wasm_data()` functions:
    - Call size functions to allocate correctly-sized vectors
    - Call init functions to load passive segments into memory
    - Return the populated byte arrays
2. **Deserialization**: WasmData is deserialized from JSON into a Rust struct
3. **JS Engine Initialization**: The JavaScript engine is initialized with the injected code and configuration

### Why This Approach?

- **Single Binary**: Avoids needing separate data files or build artifacts
- **Efficient**: Passive segments are only loaded when needed and can be dropped after initialization
- **Type-Safe**: Rust structs provide compile-time guarantees at runtime
- **Flexible**: Each canister deployment gets custom JavaScript and configuration baked in
