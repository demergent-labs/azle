# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 105_784_679  | 42_903_871 | $0.0000570480 | $57.04            | <font color="green">-98_162</font>  |
| 1   | getTransferFee    | 102_696_409  | 41_668_563 | $0.0000554054 | $55.40            | <font color="green">-4_800</font>   |
| 2   | executeTransfer   | 113_965_947  | 46_176_378 | $0.0000613993 | $61.39            | <font color="red">+5_124</font>     |
| 3   | executeTransfer   | 114_018_076  | 46_197_230 | $0.0000614271 | $61.42            | <font color="red">+70_616</font>    |
| 4   | getBlocks         | 106_897_681  | 43_349_072 | $0.0000576400 | $57.63            | <font color="green">-63_229</font>  |
| 5   | getSymbol         | 101_578_966  | 41_221_586 | $0.0000548111 | $54.81            | <font color="red">+23_897</font>    |
| 6   | getName           | 101_318_139  | 41_117_255 | $0.0000546724 | $54.67            | <font color="green">-97_075</font>  |
| 7   | getDecimals       | 101_740_243  | 41_286_097 | $0.0000548969 | $54.89            | <font color="green">-45_379</font>  |
| 8   | getArchives       | 101_721_525  | 41_278_610 | $0.0000548869 | $54.88            | <font color="green">-7_794</font>   |
| 9   | executeTransfer   | 114_098_556  | 46_229_422 | $0.0000614699 | $61.46            | <font color="red">+133_588</font>   |
| 10  | getAccountBalance | 105_818_984  | 42_917_593 | $0.0000570662 | $57.06            | <font color="red">+9_325</font>     |
| 11  | executeTransfer   | 114_058_305  | 46_213_322 | $0.0000614485 | $61.44            | <font color="red">+106_042</font>   |
| 12  | executeTransfer   | 114_003_210  | 46_191_284 | $0.0000614192 | $61.41            | <font color="green">-31_350</font>  |
| 13  | executeTransfer   | 114_725_118  | 46_480_047 | $0.0000618031 | $61.80            | <font color="green">-173_115</font> |
| 14  | executeTransfer   | 114_764_498  | 46_495_799 | $0.0000618241 | $61.82            | <font color="green">-116_912</font> |

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
