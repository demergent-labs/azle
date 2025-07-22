# Benchmarks for canister1

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | simpleUpdate | 1_336_395    | 1_124_558 | $0.0000014953 | $1.49             | <font color="green">-65_161</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | simpleUpdate | 1_401_556    | 1_150_622 | $0.0000015299 | $1.52             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.32.0

No benchmarks reported

## Baseline benchmarks Azle version: 0.30.0

No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.32.0

No benchmarks reported

## Baseline benchmarks Azle version: 0.30.0

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
