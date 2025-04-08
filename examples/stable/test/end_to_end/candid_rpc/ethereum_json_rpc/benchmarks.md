# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 1_113_061_100 | 845_814_440 | $0.0011246541 | $1_124.65         | <font color="red">+6_987_688</font> |
| 1   | ethGetBalance       | 28_810_156    | 12_114_062  | $0.0000161077 | $16.10            | <font color="red">+239_542</font>   |
| 2   | ethGetBalance       | 28_741_544    | 12_086_617  | $0.0000160712 | $16.07            | <font color="red">+241_306</font>   |
| 3   | ethGetBalance       | 28_741_887    | 12_086_754  | $0.0000160714 | $16.07            | <font color="red">+228_989</font>   |
| 4   | ethGetBlockByNumber | 27_526_406    | 11_600_562  | $0.0000154249 | $15.42            | <font color="red">+222_442</font>   |
| 5   | ethGetBlockByNumber | 27_545_994    | 11_608_397  | $0.0000154353 | $15.43            | <font color="red">+251_820</font>   |
| 6   | ethGetBlockByNumber | 27_559_578    | 11_613_831  | $0.0000154426 | $15.44            | <font color="red">+264_615</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_106_073_412 | 843_019_364 | $0.0011209376 | $1_120.93         |
| 1   | ethGetBalance       | 28_570_614    | 12_018_245  | $0.0000159803 | $15.98            |
| 2   | ethGetBalance       | 28_500_238    | 11_990_095  | $0.0000159429 | $15.94            |
| 3   | ethGetBalance       | 28_512_898    | 11_995_159  | $0.0000159496 | $15.94            |
| 4   | ethGetBlockByNumber | 27_303_964    | 11_511_585  | $0.0000153066 | $15.30            |
| 5   | ethGetBlockByNumber | 27_294_174    | 11_507_669  | $0.0000153014 | $15.30            |
| 6   | ethGetBlockByNumber | 27_294_963    | 11_507_985  | $0.0000153018 | $15.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
