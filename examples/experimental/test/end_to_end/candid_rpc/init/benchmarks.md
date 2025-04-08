# Benchmarks for init

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init        | 4_864_829_442 | 3_546_521_776 | $0.0047157036 | $4_715.70         | <font color="red">+38_332_666</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 4_826_496_776 | 3_531_188_710 | $0.0046953157 | $4_695.31         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
