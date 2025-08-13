### Experimental build flow

```mermaid
flowchart TD
  A["CLI: azle [command] [args]"] --> B{"isExperimental()?"}
  B -->|"true"| C["Experimental Router: src/experimental/build/index.ts build()"]

  subgraph EXP ["Experimental Router (src/experimental/build/index.ts)"]
    direction TB
    C --> D{"command?"}
    D -->|"post-install"| E1["handlePostInstallCommand"]
    E1 --> E2["runUploadAssetsCommand()"]
    D -->|"upload-assets"| F1["handleUploadAssetsCommand"]
    F1 --> F2["runUploadAssetsCommand()"]
    D -->|"build"| G1["handleBuildCommand"]
    G1 --> G2["getCanisterConfig"]
    G2 --> G3["runBuildCommand(canisterName, config, ioType)"]
    D -->|"other"| H["Defer to stable router"]
  end

  subgraph EXPLOGIC ["isExperimental() reference (src/build.ts)"]
    direction TB
    X1["AZLE_EXPERIMENTAL === 'true' -> true"]
    X2["Or command in {build, post-install, upload-assets} and dfx.json custom.experimental === true -> true"]
  end

  %% Navigation links
  click H "azle-flow-stable.md" "Open stable flow"
```
