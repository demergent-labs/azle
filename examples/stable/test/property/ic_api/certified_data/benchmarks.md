# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name                        | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ---------------------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade                        | 1_016_832_934 | 1_021_832_934 | $0.0013999111 | $1_399.91         | <font color="red">+12_351_766</font> |
| 1   | getDataCertificateInUpdate         | 1_648_081     | 6_648_081     | $0.0000091079 | $9.10             | <font color="green">-66_163</font>   |
| 2   | setData                            | 1_211_692     | 6_211_692     | $0.0000085100 | $8.51             | <font color="green">-22_795</font>   |
| 3   | getDataCertificateInUpdate         | 1_624_825     | 6_624_825     | $0.0000090760 | $9.07             | <font color="green">-70_719</font>   |
| 4   | setData                            | 1_209_732     | 6_209_732     | $0.0000085073 | $8.50             | <font color="green">-28_459</font>   |
| 5   | assertDataCertificateTypesInUpdate | 1_091_104     | 6_091_104     | $0.0000083448 | $8.34             | <font color="green">-30_406</font>   |
| 6   | assertSetCertifiedDataTypes        | 1_382_613     | 6_382_613     | $0.0000087442 | $8.74             | <font color="green">-30_483</font>   |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name                        | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade                        | 1_004_481_168 | 1_009_481_168 | $0.0013829892 | $1_382.98         |
| 1   | getDataCertificateInUpdate         | 1_714_244     | 6_714_244     | $0.0000091985 | $9.19             |
| 2   | setData                            | 1_234_487     | 6_234_487     | $0.0000085412 | $8.54             |
| 3   | getDataCertificateInUpdate         | 1_695_544     | 6_695_544     | $0.0000091729 | $9.17             |
| 4   | setData                            | 1_238_191     | 6_238_191     | $0.0000085463 | $8.54             |
| 5   | assertDataCertificateTypesInUpdate | 1_121_510     | 6_121_510     | $0.0000083865 | $8.38             |
| 6   | assertSetCertifiedDataTypes        | 1_413_096     | 6_413_096     | $0.0000087859 | $8.78             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
