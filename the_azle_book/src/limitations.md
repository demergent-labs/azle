# Limitations TL;DR

There are a number of limitations that you are likely to run into while you develop with Azle on ICP. These are generally the most limiting:

-   5 billion instruction limit for query calls (HTTP GET requests) (~1 second of computation)
-   20 billion instruction limit for update calls (HTTP POST/etc requests) (~5 seconds of computation)
-   2 MiB request size limit
-   3 MiB response size limit
-   4 GiB heap limit
-   High request latency relative to traditional web applications (think seconds not milliseconds)
-   High costs relative to traditional web applications (think ~10x traditional web costs)

Read more [here](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits) for in-depth information on current ICP limitations.

<!-- # Limitations

Keep in mind that this is not an exhaustive collection of the limitations of Azle or [ICP](https://internetcomputer.org/).

Let's discuss some important limitations of Azle and ICP that you are likely to run into. This is chapter is currently a work-in-progress:

-   `/api` can't be used locally
-   instruction limit (5 billion)
-   Message size limit (2 MiB request, 3 MiB response)
-   heap limit (4 GiB)
-   http outcalls request and response size, latency, and expense
-   1_000 update calls per sec
-   30_000 query calls per sec
-   stable memory limit (96 GiB)
-   no chunked http responses
-   Wasm binary limits (~10 MiB code section, ~90 MiB data section) -->
