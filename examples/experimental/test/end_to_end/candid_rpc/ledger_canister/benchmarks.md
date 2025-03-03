# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 105_974_758  | 42_979_903 | $0.0000571491 | $57.14            | <font color="red">+91_917</font>    |
| 1   | getTransferFee    | 102_900_649  | 41_750_259 | $0.0000555141 | $55.51            | <font color="red">+199_440</font>   |
| 2   | executeTransfer   | 113_964_035  | 46_175_614 | $0.0000613983 | $61.39            | <font color="red">+3_212</font>     |
| 3   | executeTransfer   | 113_964_942  | 46_175_976 | $0.0000613988 | $61.39            | <font color="red">+17_482</font>    |
| 4   | getBlocks         | 106_860_654  | 43_334_261 | $0.0000576203 | $57.62            | <font color="green">-100_256</font> |
| 5   | getSymbol         | 101_725_609  | 41_280_243 | $0.0000548891 | $54.88            | <font color="red">+170_540</font>   |
| 6   | getName           | 101_369_614  | 41_137_845 | $0.0000546998 | $54.69            | <font color="green">-45_600</font>  |
| 7   | getDecimals       | 101_783_807  | 41_303_522 | $0.0000549201 | $54.92            | <font color="green">-1_815</font>   |
| 8   | getArchives       | 101_781_394  | 41_302_557 | $0.0000549188 | $54.91            | <font color="red">+52_075</font>    |
| 9   | executeTransfer   | 114_016_408  | 46_196_563 | $0.0000614262 | $61.42            | <font color="red">+51_440</font>    |
| 10  | getAccountBalance | 105_935_353  | 42_964_141 | $0.0000571281 | $57.12            | <font color="red">+125_694</font>   |
| 11  | executeTransfer   | 114_003_438  | 46_191_375 | $0.0000614193 | $61.41            | <font color="red">+51_175</font>    |
| 12  | executeTransfer   | 113_997_498  | 46_188_999 | $0.0000614161 | $61.41            | <font color="green">-37_062</font>  |
| 13  | executeTransfer   | 114_914_407  | 46_555_762 | $0.0000619038 | $61.90            | <font color="red">+16_174</font>    |
| 14  | executeTransfer   | 114_767_299  | 46_496_919 | $0.0000618256 | $61.82            | <font color="green">-114_111</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getAccountBalance | 105_882_841  | 42_943_136 | $0.0000571002 | $57.10            |
| 1   | getTransferFee    | 102_701_209  | 41_670_483 | $0.0000554080 | $55.40            |
| 2   | executeTransfer   | 113_960_823  | 46_174_329 | $0.0000613966 | $61.39            |
| 3   | executeTransfer   | 113_947_460  | 46_168_984 | $0.0000613895 | $61.38            |
| 4   | getBlocks         | 106_960_910  | 43_374_364 | $0.0000576736 | $57.67            |
| 5   | getSymbol         | 101_555_069  | 41_212_027 | $0.0000547984 | $54.79            |
| 6   | getName           | 101_415_214  | 41_156_085 | $0.0000547240 | $54.72            |
| 7   | getDecimals       | 101_785_622  | 41_304_248 | $0.0000549210 | $54.92            |
| 8   | getArchives       | 101_729_319  | 41_281_727 | $0.0000548911 | $54.89            |
| 9   | executeTransfer   | 113_964_968  | 46_175_987 | $0.0000613988 | $61.39            |
| 10  | getAccountBalance | 105_809_659  | 42_913_863 | $0.0000570613 | $57.06            |
| 11  | executeTransfer   | 113_952_263  | 46_170_905 | $0.0000613921 | $61.39            |
| 12  | executeTransfer   | 114_034_560  | 46_203_824 | $0.0000614358 | $61.43            |
| 13  | executeTransfer   | 114_898_233  | 46_549_293 | $0.0000618952 | $61.89            |
| 14  | executeTransfer   | 114_881_410  | 46_542_564 | $0.0000618863 | $61.88            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
