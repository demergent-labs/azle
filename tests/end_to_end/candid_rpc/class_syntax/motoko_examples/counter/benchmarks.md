# Benchmarks for counter

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- | -------------------------------- |
| 0   | set         | 1_007_778    | 993_111 | $0.0000013205 | $1.32             | <font color="red">+4_686</font>  |
| 1   | inc         | 892_727      | 947_090 | $0.0000012593 | $1.25             | <font color="red">+21_779</font> |
| 2   | inc         | 892_603      | 947_041 | $0.0000012593 | $1.25             | <font color="red">+21_721</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- |
| 0   | set         | 1_003_092    | 991_236 | $0.0000013180 | $1.31             |
| 1   | inc         | 870_948      | 938_379 | $0.0000012477 | $1.24             |
| 2   | inc         | 870_882      | 938_352 | $0.0000012477 | $1.24             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
