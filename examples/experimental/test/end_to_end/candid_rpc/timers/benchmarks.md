# Benchmarks for timers

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setTimers   | 16_661_654   | 7_254_661 | $0.0000096463 | $9.64             | <font color="green">-28_351</font> |
| 1   | clearTimer  | 1_190_668    | 1_066_267 | $0.0000014178 | $1.41             | <font color="green">-300</font>    |
| 2   | clearTimer  | 1_189_372    | 1_065_748 | $0.0000014171 | $1.41             | <font color="green">-745</font>    |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setTimers   | 16_690_005   | 7_266_002 | $0.0000096614 | $9.66             |
| 1   | clearTimer  | 1_190_968    | 1_066_387 | $0.0000014179 | $1.41             |
| 2   | clearTimer  | 1_190_117    | 1_066_046 | $0.0000014175 | $1.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
