# The Azle Architecture

Azle is a Canister Development Kit (CDK) for the Internet Computer Protocol (ICP).

Another way to think about Azle is that it's a WebAssembly runtime for TypeScript and JavaScript on ICP. Instead of compiling TypeScript/JavaScript to Wasm directly, Azle compiles a JavaScript engine (QuickJS) to Wasm and embeds developer JavaScript into that Wasm. Azle then provides bindings to the ICP system API and a developer-friendly decorator API.

This document describes Azle's architecture for security researchers and new core developers. It focuses on the stable implementation under `src/stable`.

## High-level design

- QuickJS interpreter compiled to Wasm executes developer JavaScript.
- Rust glue code (using `rquickjs` and the Rust CDK) exposes ICP system APIs to JavaScript and orchestrates execution.
- A Node.js build step bundles developer code with esbuild, derives the Candid interface, and prepares method metadata by executing the canister module once in a local Wasm context.
- A Binaryen pass manipulates a static canister template Wasm to inject JavaScript and runtime data into passive data segments and to export ICP entry points for each canister method.
- At runtime on the replica, exported Wasm functions dispatch by index into JavaScript callbacks maintained in global state, performing Candid serde around method calls.

The source of truth for the stable implementation lives in `src/stable`:

- `build/` — CLI, build pipeline, Wasm manipulation, and the Rust static canister template compiled for deployment.
- `lib/` — JavaScript runtime surface: decorators, ICP APIs, globals, state, Candid helpers, and stable structures.
- `test/` — Internal test helpers and invariants (benchmarks, fuzz/property tests, memory/state monitors).

The sections below detail each part.

## Build pipeline (src/stable/build)

The build pipeline is invoked by `npx azle build <canister>`, routed by `src/stable/build/index.ts`.

### 1) Context discovery

`build/commands/build/get_context.ts`

- Reads `dfx.json` canister config and the canister name to find:
    - `main` (entrypoint `.ts/.js`)
    - `.azle/<canister>/` working directory
    - Destination paths for `.wasm` and `.did`
    - `CANISTER_CANDID_PATH` from the environment (set by the dfx extension)
- Prepares `wasmData` (env vars to embed plus the future path to `main.js`).

### 2) TypeScript → JavaScript bundle

`build/commands/build/javascript.ts`

- Uses esbuild to bundle the canister entrypoint.
- Injects a prelude that:
    - Imports Azle globals (`azle/_internal/globals`), Candid helpers, and the canister module.
    - Calls `createGetCandidAndMethodMetaFunction` which:
        - Instantiates the default-exported canister class(es).
        - Collects all decorator metadata into a single `CanisterClassMeta` object.
        - Builds Candid by walking IDL types collected from decorators (excluding hidden methods).
        - Exposes `globalThis._azleGetCandidAndMethodMeta()` returning `{ candid, methodMeta }` as a string.
    - Optionally records benchmark labels when `AZLE_RECORD_BENCHMARKS=true`.
- The plugin forbids certain Node/builtin imports unless experimental mode is enabled. In stable mode, attempting to import `fs`, `http`, etc. throws a helpful error.

Developer code is never executed here to perform business logic. The prelude only instantiates classes to harvest metadata.

### 3) Candid + method metadata derivation

`build/commands/build/candid_and_method_meta/index.ts`

- Produces a temporary Wasm by manipulating the static template, embedding the JavaScript bundle (no method exports yet).
- Executes that Wasm in a Node.js Wasm environment (`candid_and_method_meta/execute.ts`):
    - Instantiates the Wasm with a stubbed `ic0` import surface (traps/logging only), sufficient to run QuickJS and the prelude.
    - Calls the exported Rust function `get_candid_and_method_meta_pointer()` which:
        - Initializes an `rquickjs` runtime/context (Node.js mode), registers `_azleIc`, sets up globals.
        - Evaluates the JavaScript bundle, which created `_azleGetCandidAndMethodMeta`.
        - Calls `_azleGetCandidAndMethodMeta()` and returns a pointer to its string result (`{ candid, methodMeta }`).
    - Reads and parses that string back in Node to obtain Candid and `MethodMeta`.
- If `candid_gen` is set to `custom` in `dfx.json`, Azle keeps the developer-provided Candid instead.

### 4) Final Wasm manipulation and export wiring

`build/commands/build/wasm_binary/manipulate.ts`

- Reads the prebuilt static canister template Wasm.
- Adds passive data segments for:
    - Encoded JavaScript bundle.
    - Encoded `wasmData` JSON (env vars, paths).
- Emits helper functions:
    - `*_passive_data_size` and `init_*_passive_data` to copy passive segments into linear memory at runtime.
- Adds ICP entry points (exports) per `MethodMeta`:
    - Queries: `canister_query <name>` or `canister_composite_query <name>` → call `execute_method_js(index)`.
    - Updates: `canister_update <name>` → call `execute_method_js(index)`.
    - System methods:
        - `canister_init` → `init` (Rust init handler) at the collected index.
        - `canister_post_upgrade` → `post_upgrade` at its index.
        - Optional: `canister_pre_upgrade`, `canister_inspect_message`, `canister_heartbeat`, `canister_on_low_wasm_memory` routed through `execute_method_js(index)` if present.
- Optionally toggles Binaryen debug info via `AZLE_CANISTER_BACKTRACES=true` to retain name sections for easier backtraces.

The final `.wasm` is written to `.azle/<canister>/<canister>.wasm` and the `.did` to the corresponding `.did` path. The dfx extension then configures deployment using those files.

## Runtime model (on ICP)

When the replica invokes an exported function, control flows into Rust, then into JavaScript:

1. The export calls into Rust:
    - `execute_method_js.rs` looks up `globalThis._azleCanisterClassMeta.callbacks[<index>]` and invokes the JavaScript callback.
    - It drains QuickJS microtasks after the JavaScript "macrotask" run and then drains queued inter-canister call futures in the IC executor context.
    - If benchmarking is enabled, it records instruction counts via `performance_counter`.
2. The JavaScript callback was registered by the decorator layer and wraps developer code in `execute_and_reply_with_candid_serde.ts`:
    - Decodes args from Candid (`IDL.decode`) for `init`, `postUpgrade`, `query`, `update`, and for `inspectMessage` by looking up the target method’s IDL from `canisterMethodIdlParamTypes`.
    - Supports `manual` mode: developer handles decoding and replies using `msgArgData`, `IDL.decode`, `msgReply`/`msgReject`, and `IDL.encode`.
    - Executes the method, drains microtasks, and encodes the result with `IDL.encode` for `query`/`update` unless `manual`.
3. ICP system API access is exposed through `globalThis._azleIc` registered in Rust (`src/.../ic/mod.rs`). Each function bridges to the appropriate `ic_cdk` call or `ic0` syscall.

### Event loop and task semantics

- The call into a canister method is treated as a "macrotask"; after it returns, Azle explicitly drains QuickJS microtasks to completion, then drains inter-canister futures scheduled during that run.
- This ordering ensures microtasks spawned by method logic are completed before sending the final reply (`msgReply`).

## JavaScript runtime surface (src/stable/lib)

### Decorator layer and metadata aggregation

`lib/canister_methods/*`

- Each decorator (`@query`, `@update`, `@init`, `@postUpgrade`, `@preUpgrade`, `@inspectMessage`, `@heartbeat`, `@onLowWasmMemory`) funnels through a common implementation in `lib/canister_methods/index.ts`.
- On class initialization (triggered by the prelude), decorators:
    - Assign a stable index to each method.
    - Record IDL parameter/return types.
    - Update `methodMeta` (including flags like `composite` and `hidden`).
    - Validate `@init` and `@postUpgrade` parameter parity.
    - Register a callback in `CanisterClassMeta.callbacks[index]` that invokes `execute_and_reply_with_candid_serde` with the proper serde types and options.
- The decorator overloads support both `@query` and `@query([...], T, options)` styles.

`lib/index.ts` re-exports decorators, Candid helpers, ICP APIs, and stable structures for app use.

### Candid helpers

`lib/did_file/*`

- Utilities for converting IDL to Candid strings (`idl_to_string`), building services, and escaping/visiting IDL types used during Candid generation in the build prelude.

### ICP APIs (JavaScript side)

`lib/ic_apis/*`

- Small wrappers that call into `globalThis._azleIc` (typed by `lib/ic_apis/azle_ic_stable.ts`). The Rust side (`ic/mod.rs`) registers functions such as:
    - Call management: `callRaw`, `notifyRaw`, `acceptMessage`.
    - Messaging: `msgArgData`, `msgReply`, `msgReject`, `msgMethodName`, `msgRejectCode`, `msgRejectMsg`.
    - Cycles: `cyclesBurn`, `canisterCycleBalance`, `msgCycles*`.
    - Identity/metadata: `canisterSelf`, `canisterVersion`, `isController`, `inReplicatedExecution`.
    - Time/perf: `time`, `performanceCounter`.
    - Timers: `setTimer`, `setTimerInterval`, `clearTimer`.
    - Certified variables: `certifiedDataSet`, `dataCertificate`.
    - Randomness: `randBytes`, `randSeed`.
    - Stable structures: `stableBTreeMap*` operations.
    - `trap`, `debugPrint`, `uuid`.

### Globals and state management

`lib/globals.ts`

- Runs early to set up `TextDecoder`/`TextEncoder`, `console.*` routing to `debugPrint`, and a hardened `crypto.getRandomValues` backed by IC randomness with quota checks (≤ 65,536 bytes).
- Enforces stable mode by defining getters on certain globals (`fetch`, `Buffer`, `window`, etc.) that throw unless experimental mode is enabled.
- Wires `globalThis._azleDispatch` actions to set globals and internal tables.

`lib/state.ts`

- Implements an action reducer behind `globalThis._azleDispatch` used across the runtime to:
    - Track resolve/reject/timer callbacks.
    - Store `CanisterClassMeta` and a map of method names by index (for benchmarking labels).
    - Control polyfills and experimental guards.
- Controlled by env vars:
    - `AZLE_LOG_ACTIONS` logs actions via `debugPrint`.
    - `AZLE_RECORD_ACTIONS` stores actions in `globalThis._azleActions` for debugging.

### Stable structures

`lib/stable_structures/*`

- Exposes typed interfaces over stable memory (e.g., `StableBTreeMap`) implemented in Rust with `ic-stable-structures` and bridged to JS via `_azleIc.stableBTreeMap*`.
- `stable_json` provides deterministic JSON helpers used by logging and serialization.

## Rust static canister template (runtime core)

Located under `build/commands/build/wasm_binary/rust/stable_canister_template/`.

Key modules:

- `initialize_context.rs` — Builds an `rquickjs::Runtime`/`Context`, sets up `globalThis` with Azle globals (including `_azleIc` via `ic::register`), evaluates the JS bundle, handles promise errors, and drains microtasks. Supports two modes:
    - `WasmEnvironment::Nodejs` for build-time Candid/method meta generation.
    - `WasmEnvironment::IcpReplica` for actual canister execution.
- `execute_method_js.rs` — Called by all exported query/update/system proxies (except `init`/`post_upgrade` which use dedicated functions). Invokes the JS callback by index, drains microtasks and inter-canister futures, and records benchmarks.
- `candid_and_method_meta.rs` — Build-time entry point exporting `get_candid_and_method_meta_pointer`, which runs the bundle and returns Candid + method meta as a string pointer.
- `ic/mod.rs` — Registers `globalThis._azleIc` and implements each API in terms of `ic_cdk`/`ic0`. Also exposes helpers like `drain_microtasks` and `drain_inter_canister_call_futures`.
- `internal_canister_methods.rs` — Internal admin/test queries guarded to controllers only: lengths of internal tables, QuickJS job queue status, heap allocation, and benchmark retrieval.
- `state.rs`, `stable_b_tree_map.rs`, `rquickjs_utils.rs`, `guards.rs`, etc. — Internal utilities for memory, error bridging, and guard enforcement.

## Files produced by the build

Given a canister named `my_canister`:

- `.azle/my_canister/main.js` — Bundled JavaScript.
- `.azle/my_canister/my_canister.did` — Generated Candid (unless `candid_gen="custom"`).
- `.azle/my_canister/my_canister.wasm` — Final manipulated Wasm ready for deployment.
- The dfx extension configures the canister to deploy using the above `.wasm` and `.did`.

## CLI commands (stable)

Handled by `src/stable/build/index.ts`:

- `build <canister>` — Full pipeline: bundle, derive Candid/method meta, manipulate template, write `.wasm` and `.did`.
- `clean` — Remove build artifacts.
- `new` — Scaffold a project (`hello_world` or `--http-server` experimental template).
- `generate <path.did>` — Generate TypeScript bindings from Candid.
- `dev setup|template|audit` — Developer tooling (install deps, refresh templates, run audits).
- `extension install` — Install the dfx extension used during `dfx build/deploy`.
- `--version` — Print Azle version.

## Security model and considerations

- Sandboxing:
    - JavaScript runs inside QuickJS, which itself runs inside Wasm. Access to host capabilities is only via `_azleIc` and selected polyfills set by Azle.
    - In stable mode, access to Node-like globals (`Buffer`, `fetch`, `window`, etc.) throws unless experimental mode is enabled. `crypto.getRandomValues` is provided with strict input validation and size quota.
- Determinism:
    - No filesystem or network APIs in stable mode. Inter-canister calls use the IC APIs. Composite queries are opt-in via `@query({ composite: true })` and map to `canister_composite_query` exports.
- Global state hygiene:
    - Internal callback tables live under `globalThis` (`_azleResolveCallbacks`, `_azleRejectCallbacks`, `_azleTimerCallbacks`). Controller-guarded internal queries expose their sizes for leak detection in tests.
    - `AZLE_RECORD_ACTIONS` can capture reducer actions to aid debugging repros.
- Error handling and backtraces:
    - Build-time Wasm execution stubs `ic0` and strips Wasm backtraces by default; set `AZLE_CANISTER_BACKTRACES=true` to retain name sections and see deeper backtraces (intended for core development).
    - Runtime unhandled errors are funneled through `handleUncaughtError` and reported via `debugPrint`, then trapped with clear Azle error types.
- Benchmarks and telemetry:
    - `AZLE_RECORD_BENCHMARKS=true` records instruction counts per method using `performance_counter`. Results are exposed via a controller-guarded admin query.

## Environment variables recognized (stable)

- `AZLE_VERBOSE` — Increase CLI/build verbosity.
- `AZLE_DEV_TEMPLATE` — Force regeneration of static canister template artifacts if missing.
- `AZLE_CANISTER_BACKTRACES` — Retain Wasm name sections for backtraces in manipulated binaries and rethrow full errors during build-time execution.
- `AZLE_LOG_ACTIONS`, `AZLE_RECORD_ACTIONS` — Log/record reducer actions.
- `AZLE_RECORD_BENCHMARKS` — Enable instruction benchmarking.
- `CANISTER_CANDID_PATH` — Provided by the dfx extension; required for the build pipeline.

## Typical build flow (step-by-step)

1. Resolve context from `dfx.json` and environment.
2. Bundle TypeScript to ESM JavaScript with metadata prelude; write `.azle/<canister>/main.js`.
3. Produce a temporary Wasm, execute in Node Wasm to obtain `{ candid, methodMeta }`; write `.did`.
4. Manipulate the static was m template:
    - Inject JavaScript and `wasmData` as passive segments.
    - Create export stubs per method and system entry points that delegate to Rust (`execute_method_js` or `init`/`post_upgrade`).
5. Write the final `.wasm`.
6. dfx uses the generated `.wasm` and `.did` for deployment.

## Reading the codebase effectively

- Start at `src/stable/build/commands/build/index.ts` to see the full build orchestration.
- Study `javascript.ts` to understand how Candid and method metadata are derived.
- Review `manipulate.ts` to see exactly how exports and passive data segments are constructed.
- Walk through `stable_canister_template/src/lib.rs` and its modules to see the runtime core on ICP.
- Inspect `lib/canister_methods/*` and `execute_and_reply_with_candid_serde.ts` to understand the decorator API and call path.
- Skim `lib/ic_apis/*` and `ic/mod.rs` side-by-side to map JS calls to Rust/CDK behavior.

## Limitations and future work (non-exhaustive)

- The build currently requires running the bundle once inside a Wasm context to compute Candid and method metadata. Eliminating this step would simplify builds; potential directions include protocol support for dynamic method registration or replica assistance.
- Stable mode’s hardened global surface intentionally restricts common Web/Node APIs; experimental mode relaxes this with different trade-offs.

---

With this overview and the pointers above, new contributors should be able to navigate the stable implementation and reason about its security properties. For changes that touch method registration, Wasm manipulation, or the `_azleIc` surface, always consider: determinism, capability exposure, memory safety, and clear error reporting.
