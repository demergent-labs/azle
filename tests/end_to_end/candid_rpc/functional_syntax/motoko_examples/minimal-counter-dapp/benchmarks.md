# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.24.2-rc.87

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_132_836    | 1_043_134 | $0.0000013870 | $1.38             |
| 1   | count       | 1_104_747    | 1_031_898 | $0.0000013721 | $1.37             |
| 2   | reset       | 1_103_302    | 1_031_320 | $0.0000013713 | $1.37             |
| 3   | count       | 1_109_029    | 1_033_611 | $0.0000013744 | $1.37             |

## Baseline benchmarks Azle version: 0.24.2-rc.87

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
