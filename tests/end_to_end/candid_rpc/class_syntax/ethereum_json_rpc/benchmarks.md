# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_122_845_533 | 849_728_213 | $0.0011298581 | $1_129.85         |
| 1   | ethGetBalance       | 27_928_260    | 11_761_304  | $0.0000156387 | $15.63            |
| 2   | ethGetBalance       | 27_834_428    | 11_723_771  | $0.0000155887 | $15.58            |
| 3   | ethGetBalance       | 27_864_878    | 11_735_951  | $0.0000156049 | $15.60            |
| 4   | ethGetBlockByNumber | 26_793_052    | 11_307_220  | $0.0000150349 | $15.03            |
| 5   | ethGetBlockByNumber | 26_795_253    | 11_308_101  | $0.0000150360 | $15.03            |
| 6   | ethGetBlockByNumber | 26_831_388    | 11_322_555  | $0.0000150553 | $15.05            |

## Baseline benchmarks Azle version: 0.24.2-rc.60

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
