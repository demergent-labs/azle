# Benchmarks for fs

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                    |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | 1           | 47_786_605   | 52_786_605 | $0.0000723176 | $72.31            | <font color="green">-7_478_819_376</font> |
| 1   | 1           | 41_623_385   | 46_623_385 | $0.0000638740 | $63.87            | <font color="green">-12_766_207</font>    |
| 2   | 1           | 40_930_266   | 45_930_266 | $0.0000629245 | $62.92            | <font color="green">-7_404_524</font>     |
| 3   | 1           | 39_701_743   | 44_701_743 | $0.0000612414 | $61.24            | <font color="green">-7_497_167</font>     |
| 4   | 1           | 40_188_434   | 45_188_434 | $0.0000619082 | $61.90            | <font color="green">-6_092_351</font>     |
| 5   | 1           | 39_673_030   | 44_673_030 | $0.0000612021 | $61.20            | <font color="green">-7_109_071</font>     |
| 6   | 1           | 39_756_708   | 44_756_708 | $0.0000613167 | $61.31            | <font color="green">-6_571_544</font>     |
| 7   | 1           | 39_074_934   | 44_074_934 | $0.0000603827 | $60.38            | <font color="green">-7_262_863</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_526_605_981 | 7_531_605_981 | $0.0103183002 | $10_318.30        |
| 1   | http_request_update | 54_389_592    | 59_389_592    | $0.0000813637 | $81.36            |
| 2   | http_request_update | 48_334_790    | 53_334_790    | $0.0000730687 | $73.06            |
| 3   | http_request_update | 47_198_910    | 52_198_910    | $0.0000715125 | $71.51            |
| 4   | http_request_update | 46_280_785    | 51_280_785    | $0.0000702547 | $70.25            |
| 5   | http_request_update | 46_782_101    | 51_782_101    | $0.0000709415 | $70.94            |
| 6   | http_request_update | 46_328_252    | 51_328_252    | $0.0000703197 | $70.31            |
| 7   | http_request_update | 46_337_797    | 51_337_797    | $0.0000703328 | $70.33            |
| 8   | http_request_update | 45_735_584    | 50_735_584    | $0.0000695078 | $69.50            |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
