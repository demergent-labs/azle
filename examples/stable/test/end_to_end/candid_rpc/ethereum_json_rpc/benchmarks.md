# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 1_106_459_989 | 843_173_995 | $0.0011211432 | $1_121.14         | <font color="red">+926_762</font>  |
| 1   | ethGetBalance       | 28_591_992    | 12_026_796  | $0.0000159917 | $15.99            | <font color="red">+6_750</font>    |
| 2   | ethGetBalance       | 28_504_957    | 11_991_982  | $0.0000159454 | $15.94            | <font color="red">+11_943</font>   |
| 3   | ethGetBalance       | 28_501_316    | 11_990_526  | $0.0000159434 | $15.94            | <font color="green">-29_791</font> |
| 4   | ethGetBlockByNumber | 27_318_113    | 11_517_245  | $0.0000153141 | $15.31            | <font color="red">+8_089</font>    |
| 5   | ethGetBlockByNumber | 27_343_910    | 11_527_564  | $0.0000153279 | $15.32            | <font color="red">+57_604</font>   |
| 6   | ethGetBlockByNumber | 27_320_065    | 11_518_026  | $0.0000153152 | $15.31            | <font color="red">+19_761</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_105_533_227 | 842_803_290 | $0.0011206503 | $1_120.65         |
| 1   | ethGetBalance       | 28_585_242    | 12_024_096  | $0.0000159881 | $15.98            |
| 2   | ethGetBalance       | 28_493_014    | 11_987_205  | $0.0000159390 | $15.93            |
| 3   | ethGetBalance       | 28_531_107    | 12_002_442  | $0.0000159593 | $15.95            |
| 4   | ethGetBlockByNumber | 27_310_024    | 11_514_009  | $0.0000153098 | $15.30            |
| 5   | ethGetBlockByNumber | 27_286_306    | 11_504_522  | $0.0000152972 | $15.29            |
| 6   | ethGetBlockByNumber | 27_300_304    | 11_510_121  | $0.0000153047 | $15.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
