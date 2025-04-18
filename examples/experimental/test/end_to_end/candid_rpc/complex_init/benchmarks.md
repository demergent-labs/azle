⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for complex_init

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init        | 4_829_178_798 | 3_532_261_519 | $0.0046967422 | $4_696.74         | <font color="red">+4_686_780</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 4_824_492_018 | 3_530_386_807 | $0.0046942494 | $4_694.24         |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init        | 4_827_652_047 | 3_531_650_818 | $0.0046959301 | $4_695.93         | <font color="red">+4_777_442</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 4_822_874_605 | 3_529_739_842 | $0.0046933892 | $4_693.38         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
