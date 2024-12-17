# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 5_575_626_958 | 4_230_840_783 | $0.0056256221 | $5_625.62         | <font color="red">+102_038_234</font> |
| 1   | ethGetBalance       | 170_834_811   | 68_923_924    | $0.0000916461 | $91.64            | <font color="red">+171_187</font>     |
| 2   | ethGetBalance       | 170_482_352   | 68_782_940    | $0.0000914586 | $91.45            | <font color="green">-92_110</font>    |
| 3   | ethGetBalance       | 170_552_949   | 68_811_179    | $0.0000914962 | $91.49            | <font color="red">+19_878</font>      |
| 4   | ethGetBlockByNumber | 169_416_539   | 68_356_615    | $0.0000908917 | $90.89            | <font color="green">-110_958</font>   |
| 5   | ethGetBlockByNumber | 169_499_527   | 68_389_810    | $0.0000909359 | $90.93            | <font color="red">+5_057</font>       |
| 6   | ethGetBlockByNumber | 169_485_625   | 68_384_250    | $0.0000909285 | $90.92            | <font color="green">-27_895</font>    |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_473_588_724 | 4_190_025_489 | $0.0055713512 | $5_571.35         |
| 1   | ethGetBalance       | 170_663_624   | 68_855_449    | $0.0000915550 | $91.55            |
| 2   | ethGetBalance       | 170_574_462   | 68_819_784    | $0.0000915076 | $91.50            |
| 3   | ethGetBalance       | 170_533_071   | 68_803_228    | $0.0000914856 | $91.48            |
| 4   | ethGetBlockByNumber | 169_527_497   | 68_400_998    | $0.0000909508 | $90.95            |
| 5   | ethGetBlockByNumber | 169_494_470   | 68_387_788    | $0.0000909332 | $90.93            |
| 6   | ethGetBlockByNumber | 169_513_520   | 68_395_408    | $0.0000909433 | $90.94            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
