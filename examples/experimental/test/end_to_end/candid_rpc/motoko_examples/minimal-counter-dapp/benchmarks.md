# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | count       | 1_128_040    | 1_041_216 | $0.0000013845 | $1.38             | <font color="green">-4_188</font> |
| 1   | count       | 1_098_960    | 1_029_584 | $0.0000013690 | $1.36             | <font color="green">-2_645</font> |
| 2   | reset       | 1_098_736    | 1_029_494 | $0.0000013689 | $1.36             | <font color="green">-1_272</font> |
| 3   | count       | 1_105_520    | 1_032_208 | $0.0000013725 | $1.37             | <font color="green">-1_812</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_132_228    | 1_042_891 | $0.0000013867 | $1.38             |
| 1   | count       | 1_101_605    | 1_030_642 | $0.0000013704 | $1.37             |
| 2   | reset       | 1_100_008    | 1_030_003 | $0.0000013696 | $1.36             |
| 3   | count       | 1_107_332    | 1_032_932 | $0.0000013735 | $1.37             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
