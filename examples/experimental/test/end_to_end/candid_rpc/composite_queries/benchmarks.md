⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for canister1

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls | Change                                |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- | ------------------------------------- |
| 0   | simpleUpdate | 1_393_339    | 1_147_335 | $0.0000015256 | $1.52             | <font color="green">-9_726_482</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | simpleUpdate | 11_119_821   | 5_037_928 | $0.0000066988 | $6.69             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.30.0

No benchmarks reported

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.30.0

No benchmarks reported

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
