# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                    |
| --- | ----------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | 1           | 1_094_488_341  | 1_099_488_341  | $0.0015062990 | $1_506.29         | <font color="green">-8_302_680_196</font> |
| 1   | 1           | 6_610_359_618  | 6_615_359_618  | $0.0090630427 | $9_063.04         | <font color="red">+5_509_613_040</font>   |
| 2   | 1           | 18_589_574_764 | 18_594_574_764 | $0.0254745674 | $25_474.56        | <font color="red">+7_156_475_133</font>   |
| 3   | 1           | 17_363_092_186 | 17_368_092_186 | $0.0237942863 | $23_794.28        | <font color="red">+5_739_548_549</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 9_397_168_537  | 9_402_168_537  | $0.0128809709 | $12_880.97        |
| 1   | http_request_update | 1_100_746_578  | 1_105_746_578  | $0.0015148728 | $1_514.87         |
| 2   | http_request_update | 11_433_099_631 | 11_438_099_631 | $0.0156701965 | $15_670.19        |
| 3   | http_request_update | 11_623_543_637 | 11_628_543_637 | $0.0159311048 | $15_931.10        |
| 4   | http_request_update | 17_187_080_665 | 17_192_080_665 | $0.0235531505 | $23_553.15        |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
