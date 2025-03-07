# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 1_106_073_412 | 843_019_364 | $0.0011209376 | $1_120.93         | <font color="green">-12_602</font> |
| 1   | ethGetBalance       | 28_570_614    | 12_018_245  | $0.0000159803 | $15.98            | <font color="green">-3_169</font>  |
| 2   | ethGetBalance       | 28_500_238    | 11_990_095  | $0.0000159429 | $15.94            | <font color="green">-1_888</font>  |
| 3   | ethGetBalance       | 28_512_898    | 11_995_159  | $0.0000159496 | $15.94            | <font color="green">-1_874</font>  |
| 4   | ethGetBlockByNumber | 27_303_964    | 11_511_585  | $0.0000153066 | $15.30            | <font color="green">-1_833</font>  |
| 5   | ethGetBlockByNumber | 27_294_174    | 11_507_669  | $0.0000153014 | $15.30            | <font color="green">-1_728</font>  |
| 6   | ethGetBlockByNumber | 27_294_963    | 11_507_985  | $0.0000153018 | $15.30            | <font color="green">-1_798</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_106_086_014 | 843_024_405 | $0.0011209443 | $1_120.94         |
| 1   | ethGetBalance       | 28_573_783    | 12_019_513  | $0.0000159820 | $15.98            |
| 2   | ethGetBalance       | 28_502_126    | 11_990_850  | $0.0000159439 | $15.94            |
| 3   | ethGetBalance       | 28_514_772    | 11_995_908  | $0.0000159506 | $15.95            |
| 4   | ethGetBlockByNumber | 27_305_797    | 11_512_318  | $0.0000153076 | $15.30            |
| 5   | ethGetBlockByNumber | 27_295_902    | 11_508_360  | $0.0000153023 | $15.30            |
| 6   | ethGetBlockByNumber | 27_296_761    | 11_508_704  | $0.0000153028 | $15.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
