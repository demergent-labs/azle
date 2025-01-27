# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | count       | 1_237_865    | 1_085_146 | $0.0000014429 | $1.44             | <font color="red">+81_684</font> |
| 1   | count       | 1_199_407    | 1_069_762 | $0.0000014224 | $1.42             | <font color="red">+82_675</font> |
| 2   | reset       | 1_198_315    | 1_069_326 | $0.0000014219 | $1.42             | <font color="red">+83_922</font> |
| 3   | count       | 1_209_476    | 1_073_790 | $0.0000014278 | $1.42             | <font color="red">+83_455</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_156_181    | 1_052_472 | $0.0000013994 | $1.39             |
| 1   | count       | 1_116_732    | 1_036_692 | $0.0000013785 | $1.37             |
| 2   | reset       | 1_114_393    | 1_035_757 | $0.0000013772 | $1.37             |
| 3   | count       | 1_126_021    | 1_040_408 | $0.0000013834 | $1.38             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
