# Benchmarks for timers

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setTimers   | 10_043_724   | 4_607_489 | $0.0000061264 | $6.12             | <font color="green">-96_626</font> |
| 1   | clearTimer  | 1_208_365    | 1_073_346 | $0.0000014272 | $1.42             | <font color="red">+28_160</font>   |
| 2   | clearTimer  | 1_204_436    | 1_071_774 | $0.0000014251 | $1.42             | <font color="red">+24_690</font>   |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setTimers   | 10_140_350   | 4_646_140 | $0.0000061778 | $6.17             |
| 1   | clearTimer  | 1_180_205    | 1_062_082 | $0.0000014122 | $1.41             |
| 2   | clearTimer  | 1_179_746    | 1_061_898 | $0.0000014120 | $1.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
