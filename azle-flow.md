### Azle build flow overview

```mermaid
flowchart TD
  A["CLI: azle [command] [args]"] --> B["src/build.ts: set error handlers"]
  B --> C{"isExperimental()?"}

  C -->|"true"| D["Warn about experimental deps; set _azleExperimental=true"]
  C -->|"false"| F["Stable Router: src/stable/build/index.ts build()"]
  D --> E["Experimental Router: src/experimental/build/index.ts build()"]

  subgraph EXP ["Experimental Router (src/experimental/build/index.ts)"]
    direction TB
    E --> G{"command?"}
    G -->|"post-install"| H["handlePostInstallCommand -> runUploadAssetsCommand()"]
    G -->|"upload-assets"| I["handleUploadAssetsCommand -> runUploadAssetsCommand()"]
    G -->|"build"| J["handleBuildCommand -> getCanisterConfig -> runBuildCommand(canisterName, config, ioType)"]
    G -->|"other"| F
  end

  subgraph STABLE ["Stable Router (src/stable/build/index.ts)"]
    direction TB
    F --> K{"command?"}

    K -->|"--version"| L["runVersionCommand()"]
    K -->|"clean"| M["runCleanCommand()"]
    K -->|"generate"| N["handleGenerateCommand -> runGenerateCommand(candidPath)"]
    K -->|"new"| O["handleNewCommand -> validate flags (--experimental, --http-server) -> select template -> runNewCommand(...)"]
    K -->|"build"| P["handleBuildCommand -> getCanisterConfig -> checkForExperimentalDfxJsonFields -> runBuildCommand(canisterName, config, ioType)"]
    K -->|"dev"| Q["handleDevCommand"]
    K -->|"extension"| R["handleExtensionCommand"]
    K -->|"post-install"| S["no-op (reserved)"]
    K -->|"upload-assets"| T["Error: experimentalMessageDfxJson('the upload-assets command')"]
    K -->|"invalid"| U["throwIfInvalidCommand(command)"]

    subgraph DEV ["Dev subcommands"]
      direction TB
      Q --> Q1{"dev subcommand?"}
      Q1 -->|"audit"| Q2["runDevAuditCommand(ioType)"]
      Q1 -->|"setup"| Q3["handleDevSetupCommand -> parse flags [dfx,node,rust,cargo-*,wasi2ic] -> runDevSetupCommand(flags)"]
      Q1 -->|"template"| Q4["handleDevTemplateCommand -> runDevTemplateCommand('inherit') and/or runExperimentalDevTemplateCommand('inherit') -> generateLicenses(ioType)"]
      Q1 -->|"invalid"| U
    end

    subgraph EXT ["Extension subcommands"]
      direction TB
      R --> R1{"extension subcommand?"}
      R1 -->|"install"| R2["runExtensionInstallCommand(ioType)"]
      R1 -->|"invalid"| U
    end
  end

  subgraph EXPLOGIC ["isExperimental() logic (src/build.ts)"]
    direction TB
    X1["If command in {dev, extension, generate, new, --version} -> false"]
    X2["Else if env AZLE_EXPERIMENTAL === 'true' -> true"]
    X3["Else if command in {build, post-install, upload-assets} and dfx.json custom.experimental === true -> true"]
    X4["Else -> false"]
  end
  C -. "references" .-> EXPLOGIC
  %% Navigation links
  click E "azle-flow-experimental.md" "Open experimental flow"
  click F "azle-flow-stable.md" "Open stable flow"
```
