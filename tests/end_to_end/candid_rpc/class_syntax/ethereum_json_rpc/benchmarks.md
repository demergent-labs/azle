# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 1_448_793_957 | 980_107_582 | $0.0013032196 | $1_303.21         | <font color="red">+325_863_398</font> |
| 1   | ethGetBalance       | 26_636_510    | 11_244_604  | $0.0000149516 | $14.95            | <font color="green">-1_298_254</font> |
| 2   | ethGetBalance       | 26_598_484    | 11_229_393  | $0.0000149314 | $14.93            | <font color="green">-1_293_753</font> |
| 3   | ethGetBalance       | 26_594_128    | 11_227_651  | $0.0000149291 | $14.92            | <font color="green">-1_297_452</font> |
| 4   | ethGetBlockByNumber | 25_421_067    | 10_758_426  | $0.0000143052 | $14.30            | <font color="green">-1_435_858</font> |
| 5   | ethGetBlockByNumber | 25_431_865    | 10_762_746  | $0.0000143109 | $14.31            | <font color="green">-1_391_614</font> |
| 6   | ethGetBlockByNumber | 25_427_371    | 10_760_948  | $0.0000143085 | $14.30            | <font color="green">-1_401_711</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_122_930_559 | 849_762_223 | $0.0011299033 | $1_129.90         |
| 1   | ethGetBalance       | 27_934_764    | 11_763_905  | $0.0000156421 | $15.64            |
| 2   | ethGetBalance       | 27_892_237    | 11_746_894  | $0.0000156195 | $15.61            |
| 3   | ethGetBalance       | 27_891_580    | 11_746_632  | $0.0000156191 | $15.61            |
| 4   | ethGetBlockByNumber | 26_856_925    | 11_332_770  | $0.0000150688 | $15.06            |
| 5   | ethGetBlockByNumber | 26_823_479    | 11_319_391  | $0.0000150511 | $15.05            |
| 6   | ethGetBlockByNumber | 26_829_082    | 11_321_632  | $0.0000150540 | $15.05            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
