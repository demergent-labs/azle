⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for complex_init

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init        | 988_736_444  | 396_084_577 | $0.0005266618 | $526.66           | <font color="red">+1_876_709</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | init        | 986_859_735  | 395_333_894 | $0.0005256636 | $525.66           |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init        | 989_241_692  | 396_286_676 | $0.0005269305 | $526.93           | <font color="red">+2_708_232</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | init        | 986_533_460  | 395_203_384 | $0.0005254901 | $525.49           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
