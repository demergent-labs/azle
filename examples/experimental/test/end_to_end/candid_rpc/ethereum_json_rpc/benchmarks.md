# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 5_576_841_912 | 4_231_326_764 | $0.0056262683 | $5_626.26         | <font color="red">+103_253_188</font> |
| 1   | ethGetBalance       | 181_785_271   | 73_304_108    | $0.0000974703 | $97.47            | <font color="red">+11_121_647</font>  |
| 2   | ethGetBalance       | 181_616_663   | 73_236_665    | $0.0000973806 | $97.38            | <font color="red">+11_042_201</font>  |
| 3   | ethGetBalance       | 181_514_436   | 73_195_774    | $0.0000973262 | $97.32            | <font color="red">+10_981_365</font>  |
| 4   | ethGetBlockByNumber | 180_579_158   | 72_821_663    | $0.0000968288 | $96.82            | <font color="red">+11_051_661</font>  |
| 5   | ethGetBlockByNumber | 180_642_429   | 72_846_971    | $0.0000968624 | $96.86            | <font color="red">+11_147_959</font>  |
| 6   | ethGetBlockByNumber | 180_703_613   | 72_871_445    | $0.0000968950 | $96.89            | <font color="red">+11_190_093</font>  |

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
