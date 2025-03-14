⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for simple_erc20

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | initializeSupply | 2_240_451    | 1_486_180 | $0.0000019761 | $1.97             | <font color="green">-1_960</font> |
| 1   | transfer         | 1_831_001    | 1_322_400 | $0.0000017584 | $1.75             | <font color="red">+1_370</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | initializeSupply | 2_242_411    | 1_486_964 | $0.0000019772 | $1.97             |
| 1   | transfer         | 1_829_631    | 1_321_852 | $0.0000017576 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
