# Benchmarks for complex_init

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init        | 1_345_806_541 | 938_912_616 | $0.0012484439 | $1_248.44         | <font color="red">+8_282_797</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_337_523_744 | 935_599_497 | $0.0012440386 | $1_244.03         |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init        | 1_345_705_937 | 938_872_374 | $0.0012483904 | $1_248.39         | <font color="red">+8_296_117</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_337_409_820 | 935_553_928 | $0.0012439780 | $1_243.97         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
