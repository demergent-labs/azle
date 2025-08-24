# Benchmarks for cert-var

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | set         | 2_007_646    | 7_007_646 | $0.0000096005 | $9.60             | <font color="green">-73_690</font>  |
| 1   | inc         | 2_230_520    | 7_230_520 | $0.0000099058 | $9.90             | <font color="green">-83_502</font>  |
| 2   | set         | 1_976_097    | 6_976_097 | $0.0000095573 | $9.55             | <font color="green">-79_748</font>  |
| 3   | inc         | 2_224_285    | 7_224_285 | $0.0000098973 | $9.89             | <font color="green">-91_404</font>  |
| 4   | set         | 1_975_575    | 6_975_575 | $0.0000095565 | $9.55             | <font color="green">-76_622</font>  |
| 5   | inc         | 2_228_782    | 7_228_782 | $0.0000099034 | $9.90             | <font color="green">-85_952</font>  |
| 6   | set         | 1_978_170    | 6_978_170 | $0.0000095601 | $9.56             | <font color="green">-73_411</font>  |
| 7   | inc         | 2_225_679    | 7_225_679 | $0.0000098992 | $9.89             | <font color="green">-85_064</font>  |
| 8   | set         | 1_979_019    | 6_979_019 | $0.0000095613 | $9.56             | <font color="green">-75_020</font>  |
| 9   | inc         | 2_225_813    | 7_225_813 | $0.0000098994 | $9.89             | <font color="green">-88_770</font>  |
| 10  | set         | 1_976_243    | 6_976_243 | $0.0000095575 | $9.55             | <font color="green">-79_343</font>  |
| 11  | inc         | 2_229_044    | 7_229_044 | $0.0000099038 | $9.90             | <font color="green">-85_149</font>  |
| 12  | set         | 1_979_967    | 6_979_967 | $0.0000095626 | $9.56             | <font color="green">-109_388</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 2_081_336    | 7_081_336 | $0.0000097014 | $9.70             |
| 1   | inc         | 2_314_022    | 7_314_022 | $0.0000100202 | $10.02            |
| 2   | set         | 2_055_845    | 7_055_845 | $0.0000096665 | $9.66             |
| 3   | inc         | 2_315_689    | 7_315_689 | $0.0000100225 | $10.02            |
| 4   | set         | 2_052_197    | 7_052_197 | $0.0000096615 | $9.66             |
| 5   | inc         | 2_314_734    | 7_314_734 | $0.0000100212 | $10.02            |
| 6   | set         | 2_051_581    | 7_051_581 | $0.0000096607 | $9.66             |
| 7   | inc         | 2_310_743    | 7_310_743 | $0.0000100157 | $10.01            |
| 8   | set         | 2_054_039    | 7_054_039 | $0.0000096640 | $9.66             |
| 9   | inc         | 2_314_583    | 7_314_583 | $0.0000100210 | $10.02            |
| 10  | set         | 2_055_586    | 7_055_586 | $0.0000096662 | $9.66             |
| 11  | inc         | 2_314_193    | 7_314_193 | $0.0000100204 | $10.02            |
| 12  | set         | 2_089_355    | 7_089_355 | $0.0000097124 | $9.71             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
