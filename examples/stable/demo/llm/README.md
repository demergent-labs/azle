Inspired by this repo: https://github.com/dfinity/llm/tree/main/examples/quickstart-agent-rust

The tests are currently designed to run only locally (not on GitHub Actions). You must install `ollama` to run these tests locally.

```bash
# Install ollama
# See more info here: https://ollama.com/download
curl -fsSL https://ollama.com/install.sh | sh

ollama serve

# Run the model used in the example
ollama run llama3.1:8b
```
