# Benchmarks for complex_types

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser     | 80_375_426   | 32_740_170 | $0.0000435336 | $43.53            | <font color="green">-74_411</font>  |
| 1   | createThread   | 163_783_918  | 66_103_567 | $0.0000878959 | $87.89            | <font color="red">+90_651</font>    |
| 2   | createPost     | 86_386_496   | 35_144_598 | $0.0000467307 | $46.73            | <font color="green">-151_498</font> |
| 3   | createReaction | 172_443_402  | 69_567_360 | $0.0000925016 | $92.50            | <font color="green">-88_105</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_449_837   | 32_769_934 | $0.0000435732 | $43.57            |
| 1   | createThread   | 163_693_267  | 66_067_306 | $0.0000878477 | $87.84            |
| 2   | createPost     | 86_537_994   | 35_205_197 | $0.0000468113 | $46.81            |
| 3   | createReaction | 172_531_507  | 69_602_602 | $0.0000925485 | $92.54            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
