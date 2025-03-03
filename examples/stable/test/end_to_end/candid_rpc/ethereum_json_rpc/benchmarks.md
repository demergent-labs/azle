# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 1_106_086_014 | 843_024_405 | $0.0011209443 | $1_120.94         | <font color="red">+552_787</font>  |
| 1   | ethGetBalance       | 28_573_783    | 12_019_513  | $0.0000159820 | $15.98            | <font color="green">-11_459</font> |
| 2   | ethGetBalance       | 28_502_126    | 11_990_850  | $0.0000159439 | $15.94            | <font color="red">+9_112</font>    |
| 3   | ethGetBalance       | 28_514_772    | 11_995_908  | $0.0000159506 | $15.95            | <font color="green">-16_335</font> |
| 4   | ethGetBlockByNumber | 27_305_797    | 11_512_318  | $0.0000153076 | $15.30            | <font color="green">-4_227</font>  |
| 5   | ethGetBlockByNumber | 27_295_902    | 11_508_360  | $0.0000153023 | $15.30            | <font color="red">+9_596</font>    |
| 6   | ethGetBlockByNumber | 27_296_761    | 11_508_704  | $0.0000153028 | $15.30            | <font color="green">-3_543</font>  |

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
