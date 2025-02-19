# Benchmarks for complex_init

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init        | 4_826_156_185 | 3_531_052_474 | $0.0046951345 | $4_695.13         | <font color="green">-641_203_410</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 5_467_359_595 | 4_187_533_838 | $0.0055680381 | $5_568.03         |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init        | 4_824_289_748 | 3_530_305_899 | $0.0046941418 | $4_694.14         | <font color="green">-643_417_851</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 5_467_707_599 | 4_187_673_039 | $0.0055682232 | $5_568.22         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
