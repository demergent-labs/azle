# Benchmarks for counter

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- | --------------------------------- |
| 0   | set         | 986_163      | 984_465 | $0.0000013090 | $1.30             | <font color="green">-7_730</font> |
| 1   | inc         | 852_836      | 931_134 | $0.0000012381 | $1.23             | <font color="red">+944</font>     |
| 2   | inc         | 850_364      | 930_145 | $0.0000012368 | $1.23             | <font color="green">-1_541</font> |

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
