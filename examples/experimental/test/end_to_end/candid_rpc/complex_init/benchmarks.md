# Benchmarks for complex_init

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | -------------------------------- |
| 0   | init        | 4_824_200_965 | 3_530_270_386 | $0.0046940946 | $4_694.09         | <font color="red">+41_156</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 4_824_159_809 | 3_530_253_923 | $0.0046940727 | $4_694.07         |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | init        | 4_822_880_923 | 3_529_742_369 | $0.0046933925 | $4_693.39         | <font color="red">+180_541</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 4_822_700_382 | 3_529_670_152 | $0.0046932965 | $4_693.29         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
