# Benchmarks for complex_init

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls | Change                                 |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init        | 992_153_737  | 397_451_494 | $0.0005284793 | $528.47           | <font color="green">-14_115_003</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_006_268_740 | 803_097_496 | $0.0010678546 | $1_067.85         |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls | Change                                 |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init        | 991_849_564  | 397_329_825 | $0.0005283175 | $528.31           | <font color="green">-14_338_284</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_006_187_848 | 803_065_139 | $0.0010678116 | $1_067.81         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
