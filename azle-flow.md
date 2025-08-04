Here is a simple flow chart:

```mermaid
graph TD;
    build.build-->stable.index.build;
    stable.index.build-->handleExtensionCommand;
    handleExtensionCommand-->handleExtensionInstallCommand;
    handleExtensionInstallCommand-->runExtensionInstallCommand;
    runExtensionInstallCommand-->execSync.azle.src.stable.build.dfx_extension.install.sh;
    stable.index.build-->handleDevCommand;
    stable.index.build-->handleBuildCommand;
    stable.index.build-->runVersionCommand;
    stable.index.build-->runCleanCommand;
    stable.index.build-->handleNewCommand;
    stable.index.build-->handleGenerateCommand;
```
