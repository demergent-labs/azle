# Benchmarks for proxy

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | icrc1_transfer      | 96_095_628   | 39_028_251 | $0.0000518947 | $51.89            | <font color="green">-5_504_977_646</font> |
| 1   | icrc2_approve       | 103_648_043  | 42_049_217 | $0.0000559116 | $55.91            | <font color="red">+7_636_678</font>       |
| 2   | icrc2_transfer_from | 101_339_648  | 41_125_859 | $0.0000546838 | $54.68            | <font color="green">-2_410_031</font>     |
| 3   | icrc2_allowance     | 87_620_757   | 35_638_302 | $0.0000473872 | $47.38            | <font color="green">-13_683_156</font>    |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_601_073_274 | 4_241_019_309 | $0.0056391561 | $5_639.15         |
| 1   | icrc1_transfer      | 96_011_365    | 38_994_546    | $0.0000518499 | $51.84            |
| 2   | icrc2_approve       | 103_749_679   | 42_089_871    | $0.0000559656 | $55.96            |
| 3   | icrc2_transfer_from | 101_303_913   | 41_111_565    | $0.0000546648 | $54.66            |
| 4   | icrc2_allowance     | 87_604_404    | 35_631_761    | $0.0000473785 | $47.37            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
