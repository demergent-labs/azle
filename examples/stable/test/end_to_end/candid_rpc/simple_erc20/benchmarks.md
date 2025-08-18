⚠️ **WARNING: Benchmark process failed for version 0.33.0**

# Benchmarks for simple_erc20

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | initializeSupply | 2_233_336    | 1_483_334 | $0.0000019723 | $1.97             | <font color="green">-7_115</font> |
| 1   | transfer         | 1_834_186    | 1_323_674 | $0.0000017600 | $1.76             | <font color="red">+3_185</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | initializeSupply | 2_240_451    | 1_486_180 | $0.0000019761 | $1.97             |
| 1   | transfer         | 1_831_001    | 1_322_400 | $0.0000017584 | $1.75             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
