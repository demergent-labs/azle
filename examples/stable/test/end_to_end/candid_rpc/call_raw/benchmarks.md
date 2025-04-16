# Benchmarks for call_raw

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | executeCallRaw | 1_657_131    | 1_252_852 | $0.0000016659 | $1.66             | <font color="green">-4_770</font> |
| 1   | executeCallRaw | 2_118_128    | 1_437_251 | $0.0000019111 | $1.91             | <font color="red">+3_976</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | executeCallRaw | 1_661_901    | 1_254_760 | $0.0000016684 | $1.66             |
| 1   | executeCallRaw | 2_114_152    | 1_435_660 | $0.0000019090 | $1.90             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
