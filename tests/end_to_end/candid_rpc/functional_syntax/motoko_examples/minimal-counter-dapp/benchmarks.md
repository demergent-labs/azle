# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | count       | 1_117_122    | 1_036_848 | $0.0000013787 | $1.37             | <font color="green">-4_926</font> |
| 1   | count       | 1_095_293    | 1_028_117 | $0.0000013671 | $1.36             | <font color="red">+3_985</font>   |
| 2   | reset       | 1_093_164    | 1_027_265 | $0.0000013659 | $1.36             | <font color="red">+1_518</font>   |
| 3   | count       | 1_102_576    | 1_031_030 | $0.0000013709 | $1.37             | <font color="red">+4_329</font>   |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_122_048    | 1_038_819 | $0.0000013813 | $1.38             |
| 1   | count       | 1_091_308    | 1_026_523 | $0.0000013649 | $1.36             |
| 2   | reset       | 1_091_646    | 1_026_658 | $0.0000013651 | $1.36             |
| 3   | count       | 1_098_247    | 1_029_298 | $0.0000013686 | $1.36             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
