Here is a simple flow chart:

```mermaid
graph TD;
    build.build-->stable.index.build;
    stable.index.build-->handleExtensionCommand;
    handleExtensionCommand-->handleExtensionInstallCommand-->runExtensionInstallCommand
    stable.index.build-->handleDevCommand;
    handleDevCommand-->runDevAuditCommand;
    handleDevCommand-->handleDevSetupCommand-->runDevSetupCommand;
    handleDevCommand-->handleDevTemplateCommand-->runDevTemplateCommand;
    stable.index.build-->handleBuildCommand-->runBuildCommand-->getContext-->compileJavascript-->getCandidAndMethodMeta-->getWasmBinary;
    stable.index.build-->runVersionCommand;
    stable.index.build-->runCleanCommand;
    stable.index.build-->handleNewCommand-->runNewCommand;
    stable.index.build-->handleGenerateCommand-->runGenerateCommand;
```
