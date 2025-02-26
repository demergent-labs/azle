# Benchmarks for complex_init

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init        | 4_824_159_809 | 3_530_253_923 | $0.0046940727 | $4_694.07         | <font color="green">-1_996_376</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 4_826_156_185 | 3_531_052_474 | $0.0046951345 | $4_695.13         |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init        | 4_822_700_382 | 3_529_670_152 | $0.0046932965 | $4_693.29         | <font color="green">-1_589_366</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 4_824_289_748 | 3_530_305_899 | $0.0046941418 | $4_694.14         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
