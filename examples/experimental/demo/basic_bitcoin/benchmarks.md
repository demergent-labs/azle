# Benchmarks for basic_bitcoin

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_989_048_801 | 5_996_209_520 | $0.0079729799 | $7_972.97         | <font color="red">+54_864</font>    |
| 1   | http_request_update | 172_942_649   | 69_767_059    | $0.0000927672 | $92.76            | <font color="red">+32_809</font>    |
| 2   | http_request_update | 173_001_111   | 69_790_444    | $0.0000927983 | $92.79            | <font color="red">+89_032</font>    |
| 3   | http_request_update | 173_218_432   | 69_877_372    | $0.0000929138 | $92.91            | <font color="green">-186_007</font> |
| 4   | http_request_update | 173_005_672   | 69_792_268    | $0.0000928007 | $92.80            | <font color="green">-13_553</font>  |
| 5   | http_request_update | 173_031_453   | 69_802_581    | $0.0000928144 | $92.81            | <font color="red">+171_403</font>   |
| 6   | http_request_update | 173_438_944   | 69_965_577    | $0.0000930311 | $93.03            | <font color="green">-65_448</font>  |
| 7   | http_request_update | 173_021_544   | 69_798_617    | $0.0000928091 | $92.80            | <font color="green">-6_317</font>   |
| 8   | http_request_update | 175_361_565   | 70_734_626    | $0.0000940537 | $94.05            | <font color="red">+105_405</font>   |
| 9   | http_request_update | 171_649_119   | 69_249_647    | $0.0000920792 | $92.07            | <font color="green">-45_627</font>  |
| 10  | http_request_update | 173_395_288   | 69_948_115    | $0.0000930079 | $93.00            | <font color="green">-109_230</font> |
| 11  | http_request_update | 180_065_323   | 72_616_129    | $0.0000965555 | $96.55            | <font color="green">-74_290</font>  |
| 12  | http_request_update | 173_503_888   | 69_991_555    | $0.0000930657 | $93.06            | <font color="red">+202_006</font>   |
| 13  | http_request_update | 173_000_119   | 69_790_047    | $0.0000927977 | $92.79            | <font color="green">-3_779</font>   |
| 14  | http_request_update | 173_457_215   | 69_972_886    | $0.0000930408 | $93.04            | <font color="red">+90_870</font>    |
| 15  | http_request_update | 171_623_803   | 69_239_521    | $0.0000920657 | $92.06            | <font color="red">+57_231</font>    |
| 16  | http_request_update | 173_980_158   | 70_182_063    | $0.0000933190 | $93.31            | <font color="green">-11_328</font>  |
| 17  | http_request_update | 173_432_699   | 69_963_079    | $0.0000930278 | $93.02            | <font color="green">-129_698</font> |
| 18  | http_request_update | 173_126_045   | 69_840_418    | $0.0000928647 | $92.86            | <font color="red">+62_892</font>    |
| 19  | http_request_update | 173_411_839   | 69_954_735    | $0.0000930167 | $93.01            | <font color="green">-294_598</font> |
| 20  | http_request_update | 171_761_620   | 69_294_648    | $0.0000921390 | $92.13            | <font color="green">-131_207</font> |
| 21  | http_request_update | 171_719_546   | 69_277_818    | $0.0000921166 | $92.11            | <font color="green">-44_772</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_988_993_937 | 5_996_187_574 | $0.0079729507 | $7_972.95         |
| 1   | http_request_update | 172_909_840   | 69_753_936    | $0.0000927497 | $92.74            |
| 2   | http_request_update | 172_912_079   | 69_754_831    | $0.0000927509 | $92.75            |
| 3   | http_request_update | 173_404_439   | 69_951_775    | $0.0000930128 | $93.01            |
| 4   | http_request_update | 173_019_225   | 69_797_690    | $0.0000928079 | $92.80            |
| 5   | http_request_update | 172_860_050   | 69_734_020    | $0.0000927232 | $92.72            |
| 6   | http_request_update | 173_504_392   | 69_991_756    | $0.0000930659 | $93.06            |
| 7   | http_request_update | 173_027_861   | 69_801_144    | $0.0000928125 | $92.81            |
| 8   | http_request_update | 175_256_160   | 70_692_464    | $0.0000939976 | $93.99            |
| 9   | http_request_update | 171_694_746   | 69_267_898    | $0.0000921034 | $92.10            |
| 10  | http_request_update | 173_504_518   | 69_991_807    | $0.0000930660 | $93.06            |
| 11  | http_request_update | 180_139_613   | 72_645_845    | $0.0000965950 | $96.59            |
| 12  | http_request_update | 173_301_882   | 69_910_752    | $0.0000929582 | $92.95            |
| 13  | http_request_update | 173_003_898   | 69_791_559    | $0.0000927997 | $92.79            |
| 14  | http_request_update | 173_366_345   | 69_936_538    | $0.0000929925 | $92.99            |
| 15  | http_request_update | 171_566_572   | 69_216_628    | $0.0000920353 | $92.03            |
| 16  | http_request_update | 173_991_486   | 70_186_594    | $0.0000933250 | $93.32            |
| 17  | http_request_update | 173_562_397   | 70_014_958    | $0.0000930968 | $93.09            |
| 18  | http_request_update | 173_063_153   | 69_815_261    | $0.0000928313 | $92.83            |
| 19  | http_request_update | 173_706_437   | 70_072_574    | $0.0000931734 | $93.17            |
| 20  | http_request_update | 171_892_827   | 69_347_130    | $0.0000922088 | $92.20            |
| 21  | http_request_update | 171_764_318   | 69_295_727    | $0.0000921404 | $92.14            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
