# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | count       | 1_146_108    | 1_048_443 | $0.0000013941 | $1.39             | <font color="green">-10_073</font> |
| 1   | count       | 1_118_361    | 1_037_344 | $0.0000013793 | $1.37             | <font color="red">+1_629</font>    |
| 2   | reset       | 1_116_207    | 1_036_482 | $0.0000013782 | $1.37             | <font color="red">+1_814</font>    |
| 3   | count       | 1_123_274    | 1_039_309 | $0.0000013819 | $1.38             | <font color="green">-2_747</font>  |

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
