⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                                  |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------------- |
| 0   | updatePerformanceCounter0 | 1_796_056    | 1_308_422  | $0.0000017398 | $1.73             | <font color="green">-1_625</font>       |
| 1   | updatePerformanceCounter0 | 96_389_144   | 39_145_657 | $0.0000520508 | $52.05            | <font color="green">-493_663_671</font> |
| 2   | updatePerformanceCounter0 | 96_387_445   | 39_144_978 | $0.0000520499 | $52.04            | <font color="green">-493_667_323</font> |
| 3   | updatePerformanceCounter0 | 98_238_544   | 39_885_417 | $0.0000530344 | $53.03            | <font color="green">-491_816_341</font> |
| 4   | updatePerformanceCounter0 | 98_237_775   | 39_885_110 | $0.0000530340 | $53.03            | <font color="green">-491_816_751</font> |
| 5   | updatePerformanceCounter1 | 1_751_077    | 1_290_430  | $0.0000017158 | $1.71             | <font color="red">+847</font>           |
| 6   | updatePerformanceCounter1 | 822_487      | 918_994    | $0.0000012220 | $1.22             | <font color="green">-59_624</font>      |
| 7   | updatePerformanceCounter1 | 799_617      | 909_846    | $0.0000012098 | $1.20             | <font color="green">-65_858</font>      |
| 8   | updatePerformanceCounter1 | 801_550      | 910_620    | $0.0000012108 | $1.21             | <font color="green">-65_762</font>      |
| 9   | updatePerformanceCounter1 | 804_029      | 911_611    | $0.0000012121 | $1.21             | <font color="green">-65_186</font>      |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | updatePerformanceCounter0 | 1_797_681    | 1_309_072   | $0.0000017406 | $1.74             |
| 1   | updatePerformanceCounter0 | 590_052_815  | 236_611_126 | $0.0003146147 | $314.61           |
| 2   | updatePerformanceCounter0 | 590_054_768  | 236_611_907 | $0.0003146158 | $314.61           |
| 3   | updatePerformanceCounter0 | 590_054_885  | 236_611_954 | $0.0003146158 | $314.61           |
| 4   | updatePerformanceCounter0 | 590_054_526  | 236_611_810 | $0.0003146156 | $314.61           |
| 5   | updatePerformanceCounter1 | 1_750_230    | 1_290_092   | $0.0000017154 | $1.71             |
| 6   | updatePerformanceCounter1 | 882_111      | 942_844     | $0.0000012537 | $1.25             |
| 7   | updatePerformanceCounter1 | 865_475      | 936_190     | $0.0000012448 | $1.24             |
| 8   | updatePerformanceCounter1 | 867_312      | 936_924     | $0.0000012458 | $1.24             |
| 9   | updatePerformanceCounter1 | 869_215      | 937_686     | $0.0000012468 | $1.24             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
