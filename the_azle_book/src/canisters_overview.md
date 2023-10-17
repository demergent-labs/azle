# Canisters Overview

Canisters are [Internet Computer](https://internetcomputer.org/) (IC) applications. They are the encapsulation of your code and state, and are essentially Wasm modules.

State can be stored on the 4 GiB heap or in a larger 96 GiB location called stable memory. You can store state on the heap using your language's native global variables. You can store state in stable memory using low-level APIs or special stable data structures that behave similarly to native language data structures.

State changes must go through a process called consensus. The consensus process ensures that state changes are [Byzantine Fault Tolerant](https://en.wikipedia.org/wiki/Byzantine_fault). This process takes a few seconds to complete.

Operations on canister state are exposed to users through canister methods. These methods can be invoked through HTTP requests. Query methods allow state to be read and are low-latency. Update methods allow state to be changed and are higher-latency. Update methods take a few seconds to complete because of the consensus process.
