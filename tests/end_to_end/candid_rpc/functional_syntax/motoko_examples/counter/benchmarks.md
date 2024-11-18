# Benchmarks for counter

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- | --------------------------------- |
| 0   | set         | 993_363      | 987_345 | $0.0000013128 | $1.31             | <font color="green">-530</font>   |
| 1   | inc         | 850_725      | 930_290 | $0.0000012370 | $1.23             | <font color="green">-1_167</font> |
| 2   | inc         | 849_065      | 929_626 | $0.0000012361 | $1.23             | <font color="green">-2_840</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- |
| 0   | set         | 993_893      | 987_557 | $0.0000013131 | $1.31             |
| 1   | inc         | 851_892      | 930_756 | $0.0000012376 | $1.23             |
| 2   | inc         | 851_905      | 930_762 | $0.0000012376 | $1.23             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
