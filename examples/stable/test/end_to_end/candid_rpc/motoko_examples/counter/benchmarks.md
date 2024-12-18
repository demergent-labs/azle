# Benchmarks for counter

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- | ---------------------------------- |
| 0   | set         | 1_005_290    | 992_116 | $0.0000013192 | $1.31             | <font color="green">-17_199</font> |
| 1   | inc         | 889_905      | 945_962 | $0.0000012578 | $1.25             | <font color="green">-9_181</font>  |
| 2   | inc         | 889_868      | 945_947 | $0.0000012578 | $1.25             | <font color="green">-4_054</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ------- | ------------- | ----------------- |
| 0   | set         | 1_022_489    | 998_995 | $0.0000013283 | $1.32             |
| 1   | inc         | 899_086      | 949_634 | $0.0000012627 | $1.26             |
| 2   | inc         | 893_922      | 947_568 | $0.0000012600 | $1.25             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
