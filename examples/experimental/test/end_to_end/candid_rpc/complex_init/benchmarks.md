# Benchmarks for complex_init

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init        | 5_477_737_778 | 4_191_685_111 | $0.0055735579 | $5_573.55         | <font color="red">+123_094_463</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 5_354_643_315 | 4_142_447_326 | $0.0055080879 | $5_508.08         |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init        | 5_477_640_287 | 4_191_646_114 | $0.0055735061 | $5_573.50         | <font color="red">+119_789_476</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 5_357_850_811 | 4_143_730_324 | $0.0055097939 | $5_509.79         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
