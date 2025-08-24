# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                                 |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------------- |
| 0   | updatePerformanceCounter0 | 1_764_958    | 6_764_958 | $0.0000092680 | $9.26             | <font color="green">-31_098</font>     |
| 1   | updatePerformanceCounter0 | 1_745_275    | 6_745_275 | $0.0000092410 | $9.24             | <font color="green">-94_643_869</font> |
| 2   | updatePerformanceCounter0 | 1_747_356    | 6_747_356 | $0.0000092439 | $9.24             | <font color="green">-94_640_089</font> |
| 3   | updatePerformanceCounter0 | 3_603_702    | 8_603_702 | $0.0000117871 | $11.78            | <font color="green">-94_634_842</font> |
| 4   | updatePerformanceCounter0 | 3_601_701    | 8_601_701 | $0.0000117843 | $11.78            | <font color="green">-94_636_074</font> |
| 5   | updatePerformanceCounter1 | 1_716_156    | 6_716_156 | $0.0000092011 | $9.20             | <font color="green">-34_921</font>     |
| 6   | updatePerformanceCounter1 | 779_865      | 5_779_865 | $0.0000079184 | $7.91             | <font color="green">-42_622</font>     |
| 7   | updatePerformanceCounter1 | 765_132      | 5_765_132 | $0.0000078982 | $7.89             | <font color="green">-34_485</font>     |
| 8   | updatePerformanceCounter1 | 765_742      | 5_765_742 | $0.0000078991 | $7.89             | <font color="green">-35_808</font>     |
| 9   | updatePerformanceCounter1 | 763_403      | 5_763_403 | $0.0000078959 | $7.89             | <font color="green">-40_626</font>     |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name               | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | updatePerformanceCounter0 | 1_796_056    | 6_796_056   | $0.0000093106 | $9.31             |
| 1   | updatePerformanceCounter0 | 96_389_144   | 101_389_144 | $0.0001389031 | $138.90           |
| 2   | updatePerformanceCounter0 | 96_387_445   | 101_387_445 | $0.0001389008 | $138.90           |
| 3   | updatePerformanceCounter0 | 98_238_544   | 103_238_544 | $0.0001414368 | $141.43           |
| 4   | updatePerformanceCounter0 | 98_237_775   | 103_237_775 | $0.0001414358 | $141.43           |
| 5   | updatePerformanceCounter1 | 1_751_077    | 6_751_077   | $0.0000092490 | $9.24             |
| 6   | updatePerformanceCounter1 | 822_487      | 5_822_487   | $0.0000079768 | $7.97             |
| 7   | updatePerformanceCounter1 | 799_617      | 5_799_617   | $0.0000079455 | $7.94             |
| 8   | updatePerformanceCounter1 | 801_550      | 5_801_550   | $0.0000079481 | $7.94             |
| 9   | updatePerformanceCounter1 | 804_029      | 5_804_029   | $0.0000079515 | $7.95             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
