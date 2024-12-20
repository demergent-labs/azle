# Benchmarks for timers

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setTimers   | 16_634_892   | 7_243_956 | $0.0000096321 | $9.63             | <font color="green">-27_798</font> |
| 1   | clearTimer  | 1_181_083    | 1_062_433 | $0.0000014127 | $1.41             | <font color="green">-1_988</font>  |
| 2   | clearTimer  | 1_180_442    | 1_062_176 | $0.0000014123 | $1.41             | <font color="green">-2_784</font>  |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setTimers   | 16_662_690   | 7_255_076 | $0.0000096469 | $9.64             |
| 1   | clearTimer  | 1_183_071    | 1_063_228 | $0.0000014137 | $1.41             |
| 2   | clearTimer  | 1_183_226    | 1_063_290 | $0.0000014138 | $1.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
