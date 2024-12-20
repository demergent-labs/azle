# Benchmarks for complex_init

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init        | 1_337_523_744 | 935_599_497 | $0.0012440386 | $1_244.03         | <font color="red">+316_923_521</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_020_600_223 | 808_830_089 | $0.0010754771 | $1_075.47         |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init        | 1_337_409_820 | 935_553_928 | $0.0012439780 | $1_243.97         | <font color="red">+316_848_728</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_020_561_092 | 808_814_436 | $0.0010754563 | $1_075.45         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
