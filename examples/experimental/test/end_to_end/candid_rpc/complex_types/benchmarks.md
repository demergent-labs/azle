# Benchmarks for complex_types

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser     | 80_410_541   | 32_754_216 | $0.0000435523 | $43.55            | <font color="green">-28_008</font> |
| 1   | createThread   | 163_805_634  | 66_112_253 | $0.0000879075 | $87.90            | <font color="red">+183_236</font>  |
| 2   | createPost     | 86_528_391   | 35_201_356 | $0.0000468062 | $46.80            | <font color="red">+121_827</font>  |
| 3   | createReaction | 172_489_588  | 69_585_835 | $0.0000925262 | $92.52            | <font color="red">+102_606</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_438_549   | 32_765_419 | $0.0000435672 | $43.56            |
| 1   | createThread   | 163_622_398  | 66_038_959 | $0.0000878100 | $87.81            |
| 2   | createPost     | 86_406_564   | 35_152_625 | $0.0000467414 | $46.74            |
| 3   | createReaction | 172_386_982  | 69_544_792 | $0.0000924716 | $92.47            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
