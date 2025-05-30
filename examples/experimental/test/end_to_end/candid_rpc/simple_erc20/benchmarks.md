⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for simple_erc20

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | initializeSupply | 2_184_290    | 1_463_716 | $0.0000019463 | $1.94             | <font color="green">-101</font> |
| 1   | transfer         | 1_800_950    | 1_310_380 | $0.0000017424 | $1.74             | <font color="red">+3_422</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | initializeSupply | 2_184_391    | 1_463_756 | $0.0000019463 | $1.94             |
| 1   | transfer         | 1_797_528    | 1_309_011 | $0.0000017406 | $1.74             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
